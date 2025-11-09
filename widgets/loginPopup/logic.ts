import loginInfo from "@/public/data/loginInfo.json"

export function useLoginPopupLogic() {
  const { t } = useI18n()
  const userStore = useUserStore()
  const statusStore = useStatusStore()

  const tabs = [{ text: t("label.account"), value: "account" }, { text: t("label.phone"), value: "phone" }]

  const usernameVerified = ref(false) // Username verified state
  const passwordVerified = ref(false) // Password verified state
  const confirmPassword = ref("") // Confirm password
  const loginLoading = ref(false) // Login loading state
  const accountType = ref(0) // Account type: 0: account, 1: phone
  const username = ref("")
  const password = ref("")

  const loginVerified = computed(() => usernameVerified.value && passwordVerified.value) // Login verified state
  const isRegister = computed(() => statusStore.loginPopupType === 1) // Register state
  const isLogin = computed(() => statusStore.loginPopupType === 0) // Login state
  const isAccount = computed(() => accountType.value === 0) // Account state
  const isPhone = computed(() => accountType.value === 1) // Phone state

  /** Login handler */
  const loginHandler = async () => {
    loginLoading.value = true
    try {
      await delay(1000)
      const res = loginInfo

      // 登录成功后的处理逻辑
      if (res.token) {
        // 设置 token
        userStore.setToken(res.token)

        // 更新用户信息
        await userStore.setUser()
        statusStore.hideLoginPopup()
      }
    }
    catch (error) {
      console.error("Login failed:", error)
      // 添加错误处理
    }
    finally {
      loginLoading.value = false
    }
  }

  /** Handle username success */
  const handleUsernameVerified = (success: boolean) => {
    usernameVerified.value = success
  }

  /** Handle password success */
  const handlePasswordVerified = (success: boolean) => {
    passwordVerified.value = success
  }

  /** Register handler */
  const registerHandler = async () => {
    console.log("registerHandler")
  }

  /** Close login popup */
  const handleClose = () => {
    statusStore.hideLoginPopup()
    username.value = ""
    password.value = ""
  }

  return {
    tabs,
    isLogin,
    isPhone,
    username,
    password,
    isAccount,
    isRegister,
    accountType,
    loginLoading,
    loginVerified,
    confirmPassword,
    handleUsernameVerified,
    handlePasswordVerified,
    registerHandler,
    loginHandler,
    handleClose,
  }
}
