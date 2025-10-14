import ActivityList from './segments/list/index.vue'
import Unclaimed from './segments/unclaimed/index.vue'

export const useActivityLogic = () => {
	const { t } = useI18n()

	const isHasUnclaimed = ref(false)

	const PageType = {
		ActivityList: 1,
		Rebate: 2,
		Vip: 3,
		Redeem: 4,
		Claim: 5,
		Unclaimed: 6,
		TaskList: 7,
	}

	const tabList = computed(() => [
		{ type: 'activityList', component: ActivityList, value: PageType.ActivityList, name: `${t('activity.events')}`, isShow: true, isShowRedPoint: false },
		{ type: 'unclaimed', component: Unclaimed, value: PageType.Unclaimed, name: `${t('activity.unclaimed')}`, isShow: true, isShowRedPoint: isHasUnclaimed.value },
	])

	return {
		tabList
	}
}
