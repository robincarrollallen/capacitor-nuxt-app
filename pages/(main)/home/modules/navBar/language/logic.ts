export const useNavBarLanguageLogic = () => {
	const appStore = useAppStore()
	const tenantStore = useTenantStore()
	const systemStore = useSystemStore()

	const showPopover = ref(false)

	const langList = computed(() => tenantStore.tenantInfo.appLanguage)
	const fontSize = computed(() => systemStore.fontSize)
	const locale = computed(() => appStore.locale)

	const changeLanguage = (lang: any) => {
		appStore.setLocale(lang)
		showPopover.value = false
	}

	return {
		locale,
		langList,
		fontSize,
		showPopover,
		changeLanguage
	}
}
