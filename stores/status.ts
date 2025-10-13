export const useStatusStore = defineStore('status', () => {
	const mainLeftDrawerVisible = ref(false)
	const loginPopupVisible = ref(false)
	const loginPopupType = ref(0) // 0: login, 1: register

	/** Show main left drawer */
	const showMainLeftDrawer = () => {
		mainLeftDrawerVisible.value = true
	}

	/** Hide main left drawer */
	const hideMainLeftDrawer = () => {
		mainLeftDrawerVisible.value = false
	}

	/** Show login popup */
	const showLoginPopup = () => {
		loginPopupVisible.value = true
	}

	/** Show register popup */
	const showRegisterPopup = () => {
		loginPopupVisible.value = true
		loginPopupType.value = 1
	}

	/** Hide login popup */
	const hideLoginPopup = () => {
		loginPopupVisible.value = false
	}

	/** Set login popup type */
	const resetLoginPopupType = () => {
		loginPopupType.value = 0
	}

	/** IndexedDB configuration excluding automatic persistence  */
	const $indexedDB = {
		exclude: ['mainLeftDrawerVisible', 'loginPopupVisible']
	}

	return {
		$indexedDB,
		loginPopupType,
		loginPopupVisible,
		mainLeftDrawerVisible,
		resetLoginPopupType,
		showMainLeftDrawer,
		hideMainLeftDrawer,
		showRegisterPopup,
		showLoginPopup,
		hideLoginPopup,
	}
})
