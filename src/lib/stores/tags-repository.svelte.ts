import { LOCAL_STORAGE_KEY_TAGS } from '#lib/constants.js';
import {
	isTagNameTaken,
	tagNameError
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

	/** Why a name can't be used, or undefined when it can. */
	nameError(name: string, exceptId?: string) {
		return tagNameError(this.tags, name, exceptId);
	}

	/** Blank names, names with the separator and taken names are refused. */
	canUseName(name: string, exceptId?: string) {
		return this.nameError(name, exceptId) === undefined;
	}

	reset(tags: Tag[] = []) {
		this.tags = tags;
	}

	/** Returns the new tag, or undefined when the name can't be used. */
	create(name: string, startsAt: string): Tag | undefined {
		const trimmed = name.trim();

		if (!this.canUseName(trimmed)) {
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

	/** Returns false when the name can't be used. */
	rename(id: string, name: string) {
		const tag = this.get(id);
		const trimmed = name.trim();

		if (!tag || !this.canUseName(trimmed, id)) {
			return false;
		}

		tag.name = trimmed;
		return true;
	}

	/**
	 * Pins a tag to a specimen at a breakpoint, replacing any placement it had
	 * there. `order` is every breakpoint id, smallest first.
	 */
	assign(
		id: string,
		breakpointId: string,
		placement: TagPlacement,
		order: string[]
	) {
		const tag = this.get(id);

		if (!tag) {
			return;
		}

		tag.placements[breakpointId] = { ...placement };
		TagsRepository.normalizeStart(tag, order);
	}

	/** Removes a tag's own placement at a breakpoint. */
	unassign(id: string, breakpointId: string, order: string[]) {
		const tag = this.get(id);

		if (!tag) {
			return;
		}

		delete tag.placements[breakpointId];
		TagsRepository.normalizeStart(tag, order);
	}

	/** Drops every placement on a lane, ex. after the lane is deleted. */
	forgetLane(laneId: string, order: string[]) {
		for (const tag of this.tags) {
			for (const [breakpointId, placement] of Object.entries(
				tag.placements
			)) {
				if (placement.laneId === laneId) {
					delete tag.placements[breakpointId];
				}
			}

			TagsRepository.normalizeStart(tag, order);
		}
	}

	/**
	 * Moves placements on a lane back inside its step range, ex. after the
	 * range shrinks, so none point at a step the lane no longer has.
	 */
	clampLane(laneId: string, minStep: number, maxStep: number) {
		for (const tag of this.tags) {
			for (const placement of Object.values(tag.placements)) {
				if (placement.laneId === laneId) {
					placement.step = Math.min(
						Math.max(placement.step, minStep),
						maxStep
					);
				}
			}
		}
	}

	/**
	 * Re-anchors every tag after the breakpoints change: placements on removed
	 * breakpoints go, and each tag starts at its lowest remaining placement.
	 */
	syncBreakpoints(order: string[]) {
		for (const tag of this.tags) {
			TagsRepository.normalizeStart(tag, order);
		}
	}

	delete(id: string) {
		this.tags = this.tags.filter((tag) => tag.id !== id);
	}

	/**
	 * A tag starts at the lowest breakpoint it's placed on, so placing it only
	 * at Desktop makes it desktop-only. Unplaced tags rest on the root.
	 */
	static normalizeStart(tag: Tag, order: string[]) {
		const lowest = order.find((id) => id in tag.placements);

		// placements on breakpoints that no longer exist can't be reached
		for (const id of Object.keys(tag.placements)) {
			if (!order.includes(id)) {
				delete tag.placements[id];
			}
		}

		tag.startsAt = lowest ?? order[0] ?? tag.startsAt;
	}
}

export default TagsRepository;
