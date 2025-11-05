import { MAIN_PATH, MAIN_PATHS, type MainPathType } from "~/enums/path"

export const useStatusStore = defineStore("status", () => {
  const iosPwaGuideSheetVisible = ref(false)
  const mainLeftDrawerVisible = ref(false)
  const loginPopupVisible = ref(false)
  const loginPopupType = ref(0) // 0: login, 1: register

  /** Show main left drawer */
  const showMainLeftDrawer = () => {
    mainLeftDrawerVisible.value = true
  }

  /** Hide main left drawer */
  const hideMainLeftDrawer = () => {
    mainLeftDrawerVisible.value = false
  }

  /** Show login popup */
  const showLoginPopup = async (currentPath?: string) => {
    const path = currentPath ?? useRoute().path
    if (!MAIN_PATHS.includes(path as MainPathType)) {
      await navigateTo(MAIN_PATH.HOME)
    }
    loginPopupVisible.value = true
  }

  /** Show register popup */
  const showRegisterPopup = () => {
    loginPopupVisible.value = true
    loginPopupType.value = 1
  }

  /** Set login popup type */
  const resetLoginPopupType = () => {
    loginPopupType.value = 0
  }

  /** Hide login popup */
  const hideLoginPopup = () => {
    if (useRoute().path !== MAIN_PATH.HOME) {
      navigateTo(MAIN_PATH.HOME)
    }
    loginPopupVisible.value = false
    resetLoginPopupType()
  }

  /** IndexedDB configuration excluding automatic persistence  */
  const $indexedDB = {
    exclude: ["mainLeftDrawerVisible", "loginPopupVisible"],
  }

  /** Show ios pwa guide sheet */
  const showIosPwaGuideSheet = () => {
    iosPwaGuideSheetVisible.value = true
  }

  /** Hide ios pwa guide sheet */
  const hideIosPwaGuideSheet = () => {
    iosPwaGuideSheetVisible.value = false
  }

  return {
    $indexedDB,
    loginPopupType,
    loginPopupVisible,
    mainLeftDrawerVisible,
    iosPwaGuideSheetVisible,
    showIosPwaGuideSheet,
    hideIosPwaGuideSheet,
    resetLoginPopupType,
    showMainLeftDrawer,
    hideMainLeftDrawer,
    showRegisterPopup,
    showLoginPopup,
    hideLoginPopup,
  }
})
