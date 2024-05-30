class BackgroundSingleton {
	constructor() {
		if (!BackgroundSingleton.instance) {
			this.CurrentBackground = null;
			BackgroundSingleton.instance = this;
		}

		return BackgroundSingleton.instance;
	}

	setBackground(CurrentBackground) {
		this.CurrentBackground = CurrentBackground;
	}

	getBackground() {
		return this.CurrentBackground;
	}
}

const CurrentBackgroundSingleton = new BackgroundSingleton();
export default CurrentBackgroundSingleton;
