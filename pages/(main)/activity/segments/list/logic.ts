export const useActivityListLogic = () => {
	const appStore = useAppStore()
	const { t } = useI18n()

	const ActivityStatus = {
		PENDING: t('viewsActivity.activityList03'),
		PROCESSING: t('viewsActivity.activityList02'),
		FINISHED: t('viewsActivity.activityList04'),
	} as const

	const activityList = ref([])

	const language = computed(() => appStore.locale)

	/**
	 * 跳转活动
	 * @param item 活动信息
	 */
	const toActivity = (item: Recordable) => {
		item.type = item.type === 'AgencyTwo' ? 'Agency' : item.type

		navigateTo(`/activity/${item.type}/${item.id}`)
	}

	return { activityList, ActivityStatus, language, toActivity }
}
