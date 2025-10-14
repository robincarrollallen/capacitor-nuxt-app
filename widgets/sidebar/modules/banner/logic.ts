export const useSideBannerLogic = () => {
	const tenantStore = useTenantStore()

	const autoplay = { delay: 2500, disableOnInteraction: false } as any
	const pagination = { clickable: false } as any

	const bannerList = computed(() => tenantStore.bannerList)

	return {
		autoplay,
		pagination,
		bannerList,
	}
}
