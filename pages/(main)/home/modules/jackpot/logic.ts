export function useJackpotLogic() {
	const router = useRouter()
	const tenantStore = useTenantStore()
	const activityStore = useActivityStore()

	const moneyRef = ref()

	const tenantInfo = computed(() => tenantStore.tenantInfo)

	function bonusClick() {
		const { targetValue, type } = tenantInfo.value?.target || {}
		if (!targetValue) {
			activityStore.pageType = 4
			router.push(`/main/promo`)
			return
		}
		let linkValue = null
		if (type == 'internal') {
			linkValue = handleInlineNavigation(targetValue)
		} else {
			linkValue = targetValue
		}
		const linkType = handleCarouselJumpType(type)
		useOpenSwiperLink(linkType, linkValue)
	}

	return {
		tenantInfo,
		bonusClick,
	}
}
