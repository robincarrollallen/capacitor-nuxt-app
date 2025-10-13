export default defineEventHandler(async () => {
	// 模拟 API 调用
	const fetchAgencyInfo = async () => {
		// 模拟网络请求
		await new Promise(resolve => setTimeout(resolve, 100))

		// 模拟随机成功/失败
		if (Math.random() > 0.1) {
			return {
				"info": {
					"level": {},
					"agencyLevel": 0,
					"yesterdayComm": 0,
					"dayDirectAdd": 0,
					"dayDirectRechargeCnt": 0,
					"dayDirectRechargeAmt": 0,
					"dayDirectFirstRechargeCnt": 0,
					"dayTeamAdd": 0,
					"dayTeamRechargeCnt": 0,
					"dayTeamRechargeAmt": 0,
					"dayTeamFirstRechargeCnt": 0,
					"weekComm": 0,
					"histComm": 0,
					"histDirectCnt": 0,
					"histTeamCnt": 0,
					"histBet": 0,
					"histTeamBet": 0,
					"histDirectBet": 0
				}
			}
		} else {
			throw new Error('API request failed')
		}
	}

	try {
		const result = await fetchAgencyInfo()
		return result
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch tenant info'
		})
	}
})
