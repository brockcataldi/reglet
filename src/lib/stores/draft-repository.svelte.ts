import {
	BREAKPOINT_DEFAULTS,
	DEFAULT_PROJECT_TYPE,
	LOCAL_STORAGE_KEY_DRAFT,
	TAG_TEMPLATES
} from '#lib/constants.js';
import {
	validateBreakpoints,
	validateTagNames
} from '#lib/domain/project/validate-draft.js';
import type {
	Breakpoint,
	FontSizeUnit,
	LetterSpacingUnit,
	ProjectType
} from '#lib/types.js';
import { createId, read, write } from '#lib/utilities.js';

export type TagDraft = {
	id: string;
	name: string;
	// root step on the starting lane; null leaves the tag unplaced
	step: number | null;
};

export type Draft = {
	type: ProjectType;
	fontSizeUnit: FontSizeUnit;
	letterSpacingUnit: LetterSpacingUnit;
	breakpoints: Breakpoint[];
	tags: TagDraft[];
};

/**
 * The structural choices made in /new. Nothing here touches the live project
 * until `project.create()` applies it, so leaving the wizard halfway is safe.
 */
class DraftRepository {
	#type = $state<ProjectType>(DEFAULT_PROJECT_TYPE);
	fontSizeUnit = $state<FontSizeUnit>('rem');
	letterSpacingUnit = $state<LetterSpacingUnit>('rem');
	#breakpoints = $state<Breakpoint[]>([]);
	#tags = $state<TagDraft[]>([]);

	#errors = $derived([
		...validateBreakpoints(this.#type, this.#breakpoints),
		...validateTagNames(this.#tags)
	]);

	constructor() {
		const cached = read<Draft>(LOCAL_STORAGE_KEY_DRAFT);

		if (cached) {
			this.#type = cached.type;
			// drafts saved before units moved into the draft have none
			this.fontSizeUnit = cached.fontSizeUnit ?? 'rem';
			this.letterSpacingUnit = cached.letterSpacingUnit ?? 'rem';
			this.#breakpoints = cached.breakpoints;
			this.#tags = cached.tags;
		} else {
			this.reset();
		}

		$effect.root(() => {
			$effect(() => {
				write<Draft>(LOCAL_STORAGE_KEY_DRAFT, {
					type: this.#type,
					fontSizeUnit: this.fontSizeUnit,
					letterSpacingUnit: this.letterSpacingUnit,
					breakpoints: this.#breakpoints,
					tags: this.#tags
				});
			});
		});
	}

	get type() {
		return this.#type;
	}

	/** Changing the type swaps in that type's default breakpoints. */
	set type(value: ProjectType) {
		if (value === this.#type) {
			return;
		}

		this.#type = value;
		this.#breakpoints = DraftRepository.defaultBreakpoints(value);
	}

	/**
	 * Replaces the tag list with a template's tags. The template itself isn't
	 * remembered: it's only a starting point for the list.
	 */
	loadTemplate(id: string) {
		if (!TAG_TEMPLATES.some((template) => template.id === id)) {
			return;
		}

		this.#tags = DraftRepository.templateTags(id);
	}

	/**
	 * Adds a template's tags to the end of the list, skipping names that are
	 * already there. Returns how many were added.
	 */
	appendTemplate(id: string) {
		const existing = this.#tags.map((tag) =>
			tag.name.trim().toLowerCase()
		);
		const added = DraftRepository.templateTags(id).filter(
			(tag) => !existing.includes(tag.name.toLowerCase())
		);

		this.#tags.push(...added);

		return added.length;
	}

	get breakpoints() {
		return this.#breakpoints;
	}

	get tags() {
		return this.#tags;
	}

	get errors() {
		return this.#errors;
	}

	get valid() {
		return this.#errors.length === 0;
	}

	/** Standard projects only; new breakpoints go above the widest one. */
	addBreakpoint() {
		if (this.#type !== 'standard') {
			return;
		}

		const widest = this.#breakpoints.at(-1)?.width ?? 0;

		this.#breakpoints.push({
			id: createId(),
			name: '',
			width: widest + 256
		});
	}

	/** The root can't be removed, and only standard projects can remove any. */
	removeBreakpoint(id: string) {
		if (this.#type !== 'standard' || this.#breakpoints[0]?.id === id) {
			return;
		}

		this.#breakpoints = this.#breakpoints.filter((bp) => bp.id !== id);
	}

	addTag() {
		this.#tags.push({ id: createId(), name: '', step: null });
	}

	removeTag(id: string) {
		this.#tags = this.#tags.filter((tag) => tag.id !== id);
	}

	reset() {
		this.#type = DEFAULT_PROJECT_TYPE;
		this.fontSizeUnit = 'rem';
		this.letterSpacingUnit = 'rem';
		this.#breakpoints = DraftRepository.defaultBreakpoints(this.#type);
		this.#tags = DraftRepository.templateTags(TAG_TEMPLATES[0].id);
	}

	static defaultBreakpoints(type: ProjectType): Breakpoint[] {
		return BREAKPOINT_DEFAULTS[type].map((bp) => ({
			...bp,
			id: createId()
		}));
	}

	static templateTags(id: string): TagDraft[] {
		const template = TAG_TEMPLATES.find((t) => t.id === id);

		return (template?.tags ?? []).map((tag) => ({
			...tag,
			id: createId()
		}));
	}
}

export default DraftRepository;
