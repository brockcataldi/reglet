import { create } from 'zustand';
import { mutative } from 'zustand-mutative';

type State = {
	count: number;
};

type Actions = {
	increment: (qty: number) => void;
	decrement: (qty: number) => void;
};

export const useCountStore = create<State & Actions>()(
	mutative((set) => ({
		count: 0,
		increment: (qty: number) =>
			set((state: State) => {
				state.count += qty;
			}),
		decrement: (qty: number) =>
			set((state: State) => {
				state.count -= qty;
			}),
	}))
);
