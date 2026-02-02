import type { TextStyle } from '$lib/types';

class Styles {
	#host: TextStyle = {
		family: '',
		weight: 'normal',
		style: 'normal',
		stretch: 'normal',
		opticalSize: 'none',
		variationSettings: []
	};

	#guests: TextStyle[] = [];

	get host(): TextStyle {
		return this.#host;
	}

	set host(style: TextStyle) {
		this.#host = style;
	}

	get guests(): TextStyle[] {
		return this.#guests;
	}

	set guests(styles: TextStyle[]) {
		this.#guests = styles;
	}
}

const styles = new Styles();
export default styles;
