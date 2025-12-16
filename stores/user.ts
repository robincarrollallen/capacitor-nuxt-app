import { defineStore } from "pinia"

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
    // TODO: 模拟网络请求
    try {
      await delay(1000);
      user.value = {
				"id": 487105446,
				"userName": "9999900100",
				"phoneNumber": "9999900100",
				"email": null,
				"remark": null,
				"type": "normal",
				"tenantName": "多级分销 - 充值",
				"realName": null,
				"regionName": "印度",
				"historicalPay": 20000,
				"appType": "iOSH5",
				"firstRechargeAmount": 20000,
				"firstRechargeTime": "2025-08-03T17:40:40.000Z",
				"withdrawCount": 0,
				"avatar": "https://upload-us.b83.xyz/avatar/male_1.jpg",
				"tgId": null,
				"firstSetPassword": null,
				"registerType": "phone:phone",
				"userId": 487105446,
				"trialPlayBalance": 0,
				"trialPlayWithdrawHint": "1",
				"isNewMail": true,
				"canApplyRegisterReward": false,
				"canUseRegisterRewardInfo": true
			}
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
