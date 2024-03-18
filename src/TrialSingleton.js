class TrialSingleton {
	constructor() {
		if (!TrialSingleton.instance) {
			this.CurrentTrial = null;
			TrialSingleton.instance = this;
		}

		return TrialSingleton.instance;
	}

	setTrial(CurrentTrial) {
		this.CurrentTrial = CurrentTrial;
	}

	getTrial() {
		return this.CurrentTrial;
	}
}

const CurrentTrialSingleton = new TrialSingleton();
export default CurrentTrialSingleton;
