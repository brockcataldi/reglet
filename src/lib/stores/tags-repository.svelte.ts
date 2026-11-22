import { LOCAL_STORAGE_KEY_TAGS } from '#lib/constants.js';
import {
	isTagNameTaken,
	normalizeTagName
} from '#lib/domain/tags/normalize-tag-name.js';
import type { Tag, TagPlacement } from '#lib/types.js';
import { createId, read, write } from '#lib/utilities.js';

class TagsRepository {
	#tags = $state<Tag[]>([]);

	constructor() {
		const cached = read<Tag[]>(LOCAL_STORAGE_KEY_TAGS);

		if (cached) {
			this.tags = cached;
		}

		$effect.root(() => {
			$effect(() => {
				write(LOCAL_STORAGE_KEY_TAGS, this.tags);
			});
		});
	}

	get tags() {
		return this.#tags;
	}

	set tags(tags: Tag[]) {
		this.#tags = tags;
	}

	get(id: string) {
		return this.tags.find((tag) => tag.id === id);
	}

	isNameTaken(name: string, exceptId?: string) {
		return isTagNameTaken(this.tags, name, exceptId);
	}

	reset(tags: Tag[] = []) {
		this.tags = tags;
	}

	/** Returns the new tag, or undefined when the name is blank or taken. */
	create(name: string, startsAt: string): Tag | undefined {
		const trimmed = name.trim();

		if (normalizeTagName(trimmed) === '' || this.isNameTaken(trimmed)) {
			return undefined;
		}

		const tag: Tag = {
			id: createId(),
			name: trimmed,
			startsAt,
			placements: {}
		};

		this.tags.push(tag);

		return this.get(tag.id);
	}

	/** Returns false when the name is blank or taken by another tag. */
	rename(id: string, name: string) {
		const tag = this.get(id);
		const trimmed = name.trim();

		if (
			!tag ||
			normalizeTagName(trimmed) === '' ||
			this.isNameTaken(trimmed, id)
		) {
			return false;
		}

		tag.name = trimmed;
		return true;
	}

	setStartsAt(id: string, breakpointId: string) {
		const tag = this.get(id);

		if (tag) {
			tag.startsAt = breakpointId;
		}
	}

	place(id: string, breakpointId: string, placement: TagPlacement) {
		const tag = this.get(id);

		if (tag) {
			tag.placements[breakpointId] = { ...placement };
		}
	}

	unplace(id: string, breakpointId: string) {
		const tag = this.get(id);

		if (tag) {
			delete tag.placements[breakpointId];
		}
	}

	delete(id: string) {
		this.tags = this.tags.filter((tag) => tag.id !== id);
	}
}

export default TagsRepository;
