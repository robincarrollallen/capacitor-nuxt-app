export const useUserStore = defineStore("user", () => {
  const user = ref<Record<string, any>>({}) // 用户信息
  const defaultAvatar = ref("") // 默认头像
  const token: Ref = useCookie("token", {
    default: () => "",
    secure: false, // 不使用 secure 属性，因为 cookie 在本地存储，不需要 HTTPS 保护
    sameSite: "lax", // 使用 lax 策略，允许第三方网站访问(Get请求) cookie
    maxAge: 60 * 60 * 24 * 7, // 7天
  })

  /** Set user information */
  const setUser = async () => {
    try {
      const { data } = await useFetch("/api/user/details")
      user.value = data.value || {}
    }
    catch (error) {
      console.error("Failed to fetch user details:", error)
      user.value = {}
    }

    return user.value
  }

  /** Get user information */
  const getUser = async () => {
    if (!token.value) {
      return {}
    }

    if (!isEmpty(user.value)) {
      return user.value
    }

    await setUser()
    return user.value
  }

  // 设置头像缓存
  const setDefaultAvatar = (avatar: string) => {
    defaultAvatar.value = avatar
  }
  // 获取头像缓存
  const getDefaultAvatar = () => {
    return defaultAvatar.value
  }

  /** Set token */
  const setToken = (newToken: string) => {
    token.value = newToken
  }

  /** Clear token */
  const clearToken = () => {
    token.value = ""
    user.value = {}
  }

  return { token, user, defaultAvatar, setUser, getUser, setDefaultAvatar, getDefaultAvatar, setToken, clearToken }
})
