export default defineEventHandler(async () => {
	// 模拟 API 调用
	const fetchUserDetails = async () => {
		// 模拟网络请求
		await new Promise(resolve => setTimeout(resolve, 100))

		// 模拟随机成功/失败
		if (Math.random() > 0.1) {
			return {
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
		} else {
			throw new Error('API request failed')
		}
	}

	try {
		const result = await fetchUserDetails()
		return result
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch tenant info'
		})
	}
})
