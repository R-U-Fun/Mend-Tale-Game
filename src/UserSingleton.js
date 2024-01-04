class UserSingleton {
	constructor() {
		if (!UserSingleton.instance) {
			this.CurrentUserName = null;
			UserSingleton.instance = this;
		}

		return UserSingleton.instance;
	}

	setUserName(CurrentUserName) {
		this.CurrentUserName = CurrentUserName;
	}

	getUserName() {
		return this.CurrentUserName;
	}
}

const CurrentUserNameSingleton = new UserSingleton();
export default CurrentUserNameSingleton;
