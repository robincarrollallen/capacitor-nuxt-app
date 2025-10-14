export const useAuth = () => {
	const token = useCookie('token', {
		default: () => '',
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7 // 7天
	})

	const setToken = (newToken: string) => {
		token.value = newToken
	}

	const clearToken = () => {
		token.value = ''
	}

	const isAuthenticated = computed(() => !!token.value)

	return {
		token: readonly(token),
		setToken,
		clearToken,
		isAuthenticated
	}
}
