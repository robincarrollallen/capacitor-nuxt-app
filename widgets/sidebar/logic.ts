export function useSidebarLogic() {
  const appStore = useAppStore() // Application store
  const gameStore = useGameStore() // Game store
  const systemStore = useSystemStore() // System store
  const statusStore = useStatusStore() // Status store
  const tenantStore = useTenantStore() // Tenant store
  const activityStore = useActivityStore() // Activity store

  const showLanguage = ref(false) // Whether to show language selection
  const dynamicAmount = ref(Number.parseInt(Date.now().toString().slice(-9)) / 100) // Dynamic amount

  const locale = computed(() => appStore.locale) // Current language Code
  const tenantInfo = computed(() => tenantStore.tenantInfo) // Tenant information
  const mainMediaList = computed(() => tenantStore.mainMediaList) // Main media list
  const langList = computed(() => tenantStore.tenantInfo.appLanguage) // Language list
  const activityList = computed(() => activityStore.sideBarActivityList.slice(0, 12)) // Activity list
  const gameCategoryList = computed(() => gameStore.homeList.map(item => item.gameType)) // Game category list
  const currentLanguage = computed(() => getLanguageName(locale.value, locale.value).split(" ")[0]) // Current language Name
  const merchantCy = computed(() => tenantStore.merchantCy) // Merchant currency
  const showLanguageDialog = computed(() => systemStore.screenWidth >= 540 || statusStore.showMainLeftDrawer) // Whether to show language dialog

  /**
   * Change language
   * @param lang Language code
   */
  const changeLanguage = (lang: any) => {
    appStore.setLocale(lang) // Set language
    showLanguage.value = false // Close language selection
  }

  return {
    locale,
    langList,
    tenantInfo,
    merchantCy,
    activityList,
    showLanguage,
    dynamicAmount,
    mainMediaList,
    currentLanguage,
    gameCategoryList,
    showLanguageDialog,
    changeLanguage,
  }
}
