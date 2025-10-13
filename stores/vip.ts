export const useVipStore = defineStore('vip', () => {
	const vipInfo = ref<Record<string, any>>({}) // VIP信息

	/** Set VIP information */
	const setVipInfo = async () => {
		try {
			const { data } = await useFetch('/api/vip/info')
			vipInfo.value = data.value || {}
		} catch (error) {
			console.error('Failed to fetch user details:', error)
			vipInfo.value = {}
		}

		return vipInfo.value
	}

	/** Get VIP information */
	const getVipInfo = async () => {
		if (!isEmpty(vipInfo.value)) {
			return vipInfo.value
		}

		await setVipInfo()
		return vipInfo.value
	}

	return { vipInfo, setVipInfo, getVipInfo}
})
