export const useCategoryLogic = (props: Recordable) => {
	const { t } = useI18n()
	const gameStore = useGameStore()
	const tenantStore = useTenantStore()

	const isGameCategory = computed(() => tenantStore.tenantInfo?.homeNavType === 'GameType')

	/** Game category list */
	const gameCategoryList = computed(() => {
		const popularItem = {
			gameType: 'POPULAR' as const,
			name: t('sort.POPULAR'),
			iconStyle: props.getCategoryIconStyle('ONE_API_HOT')
		}

		const gameItems = gameStore.homeList.map(item => {
			const { gameType } = item
			return {
				...item,
				name: t(`sort.${gameType}`),
				iconStyle: props.getCategoryIconStyle(gameType),
			}
		})

		return [popularItem, ...gameItems]
	})

	/** Platform category list */
	const platformCategoryList = computed(() => {
		const popularItem = {
			id: 'POPULAR',
			code: "ONE_API_HOT",
			gameType: 'POPULAR',
			name: t('sort.POPULAR'),
			iconStyle: props.getCategoryIconStyle('ONE_API_HOT') + `;background-size: auto 100%`
		}

		const platformItems = gameStore.homePlatformList.map(item => {
			const { code } = item
			return {
				...item,
				iconStyle: props.getPlatformIconStyle(code)
			}
		})

		return [popularItem, ...platformItems]
	})

	return {
		isGameCategory,
		gameCategoryList,
		platformCategoryList,
	}
}
