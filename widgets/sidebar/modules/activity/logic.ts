export function useActivityLogic() {
	const activityStore = useActivityStore()

	const activityList = computed(() => activityStore.sideBarActivityList) // Activity list

	return {
		activityList,
	}
}
