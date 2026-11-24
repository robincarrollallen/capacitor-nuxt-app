export const useCategoryLogic = (props: Recordable) => {
	const { t } = useI18n()
	const gameStore = useGameStore()
	const tenantStore = useTenantStore()

	const isGameCategory = computed(() => tenantStore.tenantInfo?.homeNavType === 'GameType')

	/** Game category list */
	const gameCategoryList = computed(() => gameStore.homeCategories.map(({ gameType, labelKey }) => ({
		gameType,
		name: t(`sort.${labelKey}`),
		iconStyle: props.getCategoryIconStyle(labelKey),
	})))

	/** Platform category list */
	const platformCategoryList = computed(() => {
		const popularItem = {
			id: 'POPULAR',
			code: 'POPULAR',
			gameType: 'POPULAR',
			name: t('sort.POPULAR'),
			iconStyle: props.getCategoryIconStyle('POPULAR')
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
