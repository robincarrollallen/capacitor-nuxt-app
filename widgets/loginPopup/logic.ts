import { loginApi } from "@/api/user"

export function useLoginPopupLogic() {
  const { t } = useI18n()
  const userStore = useUserStore()
  const statusStore = useStatusStore()

  const tabs = [{ text: t("label.account"), value: "account" }, { text: t("label.phone"), value: "phone" }]

  const confirmPassword = ref("")
  const accountType = ref(0) // 0: account, 1: phone
  const username = ref("")
  const password = ref("")

  const isRegister = computed(() => statusStore.loginPopupType === 1)
  const isLogin = computed(() => statusStore.loginPopupType === 0)
  const isAccount = computed(() => accountType.value === 0)
  const isPhone = computed(() => accountType.value === 1)

  /** Login handler */
  const loginHandler = async () => {
    const style = getComputedStyle(document.documentElement)
    const safeArea = style.getPropertyValue("--sat")
    alert(safeArea)
    try {
      const res = await loginApi({
        username: "11999990000",
        password: "123456",
      })
      console.log(res)

      // 登录成功后的处理逻辑
      if (res.success) {
        // 设置 token
        const { setToken } = useAuth()
        setToken(res.data.token)

        // 更新用户信息
        await userStore.setUser()
      }
    }
    catch (error) {
      console.error("Login failed:", error)
      // 添加错误处理
    }
  }

  /** Register handler */
  const registerHandler = async () => {
    console.log("registerHandler")
  }

  /** Close login popup */
  const handleClose = () => {
    statusStore.resetLoginPopupType()
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
    confirmPassword,
    registerHandler,
    loginHandler,
    handleClose,
  }
}
