class ThemeSingleton {
	constructor() {
		if (!ThemeSingleton.instance) {
			this.CurrentTheme = null;
			ThemeSingleton.instance = this;
		}

		return ThemeSingleton.instance;
	}

	setTheme(CurrentTheme) {
		this.CurrentTheme = CurrentTheme;
	}

	getTheme() {
		return this.CurrentTheme;
	}
}

const CurrentThemeSingleton = new ThemeSingleton();
export default CurrentThemeSingleton;
