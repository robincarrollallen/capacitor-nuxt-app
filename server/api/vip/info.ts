export default defineEventHandler(async () => {
	// 模拟 API 调用
	const fetchVipInfo = async () => {
		// 模拟网络请求
		await new Promise(resolve => setTimeout(resolve, 100))

		// 模拟随机成功/失败
		if (Math.random() > 0.1) {
			return {
				"status": true,
				"data": {
					"userId": 933259591,
					"userVipLevelId": 270,
					"currentVipLevel": {
						"id": 270,
						"vipId": 142,
						"level": 0,
						"promotionBet": 0,
						"promotionRecharge": 0,
						"promotionReward": 0,
						"dailyBet": 0,
						"dailyReward": 0,
						"weeklyBet": 0,
						"weeklyReward": 0,
						"monthlyBet": 0,
						"monthlyReward": 0,
						"retentionBet": 0,
						"retentionRecharge": 0,
						"createTime": "2024-03-29T10:24:27.426Z",
						"updateTime": "2024-03-29T10:24:27.426Z",
						"lastOperator": null
					},
					"nextVipLevel": {
						"id": 275,
						"vipId": 142,
						"level": 1,
						"promotionBet": 5000,
						"promotionRecharge": 0,
						"promotionReward": 300,
						"dailyBet": 1000,
						"dailyReward": 100,
						"weeklyBet": 3000,
						"weeklyReward": 300,
						"monthlyBet": 5000,
						"monthlyReward": 500,
						"retentionBet": 10000,
						"retentionRecharge": 0,
						"createTime": "2024-03-29T11:27:09.121Z",
						"updateTime": "2024-09-27T16:40:16.668Z",
						"lastOperator": "tim1"
					},
					"totalValidBetAmount": 650,
					"totalRechargeAmount": 10000,
					"vipLevelCount": 8
				}
			}
		} else {
			throw new Error('API request failed')
		}
	}

	try {
		const result = await fetchVipInfo()
		console.log('result >>>>>>>>>>>>>>', result)
		return result
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch tenant info'
		})
	}
})
