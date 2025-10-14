export const useSidebarLogoLogic = () => {
	const statusStore = useStatusStore()

	const closeMainLeftDrawer = () => {
		statusStore.hideMainLeftDrawer()
	}

	return {
		closeMainLeftDrawer
	}
}
