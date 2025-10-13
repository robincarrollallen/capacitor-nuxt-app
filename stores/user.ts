export const useUserStore = defineStore('user', () => {
	const user = ref<Record<string, any>>({}) // 用户信息
	const defaultAvatar = ref('') // 默认头像

	// 监听 token 变化
	const { token } = useAuth()

	watch(token, (newToken) => {
		if (!newToken) {
			user.value = {}
		}
	})

	/** Set user information */
	const setUser = async () => {
		try {
			const { data } = await useFetch('/api/user/details')
			user.value = data.value || {}
		} catch (error) {
			console.error('Failed to fetch user details:', error)
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

	return { user, defaultAvatar, setUser, getUser, setDefaultAvatar, getDefaultAvatar }
})
