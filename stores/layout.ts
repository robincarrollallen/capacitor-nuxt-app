export const useLayoutStore = defineStore('layout', () => {
	const tabBarHeight = ref(0)

	/** Set tab bar height */
	const setTabBarHeight = (height = 0) => {
		tabBarHeight.value = height
	}

	return { tabBarHeight, setTabBarHeight }
})
