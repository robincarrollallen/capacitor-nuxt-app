import type { LanguageType } from "@/enums"

export interface ActivityVariables {
	[key: string]: string | number
}

export interface ActivityRulesMap {
	[key: string]: {
		[subKey: string]: string
	}
}

/**
 * Activity condition type
 */
export const CONDITION_TYPE = {
	/** All */
	ALL: 'ALL',
	/** One */
	ONE: 'ONE'
} as const

// 代理规则第一二三条
const agencyTemplates_Threes: ActivityRulesMap = {
	'zh-CN': {
		1: `邀请好友领彩金，邀请人数越多，彩金越多;\n`,
		2: `彩金需要手动领取，过期后彩金将自动派发，可与其他代理的彩金和佣金同时享有;\n`,
		3: `彩金（不含本金）需{multiplier}倍有效投注才能提现;\n`,
	},
	'en-US': {
		1: `Invite friends to claim bonuses. The more people you invite, the more bonuses you will get;\n`,
		2: `Bonuses need to be claimed manually. After expiration, the bonuses will be automatically distributed and can be enjoyed together with bonuses and commissions from other agents;\n`,
		3: `Bonuses (excluding principal) require {multiplier} times of valid bets to be withdrawn;\n`,
	},
	'pt-BR': {
		1: `Convide amigos para reivindicar bônus. Quanto mais pessoas você convidar, mais bônus você receberá;\n`,
		2: `Os bônus precisam ser reivindicados manualmente. Após a expiração, os bônus serão distribuídos automaticamente e podem ser aproveitados junto com bônus e comissões de outros agentes;\n`,
		3: `Os bônus (excluindo o principal) exigem {multiplier} vezes de apostas válidas para serem sacados;\n`,
	},
	'id-ID': {
		1: `Undang teman untuk mengklaim bonus. Semakin banyak orang yang Anda undang, semakin banyak bonus yang akan Anda dapatkan;\n`,
		2: `Bonus perlu diklaim secara manual. Setelah kedaluwarsa, bonus akan didistribusikan secara otomatis dan dapat dinikmati bersama dengan bonus dan komisi dari agen lain;\n`,
		3: `Bonus (tidak termasuk pokok) memerlukan {multiplier} kali taruhan yang valid untuk ditarik;\n`,
	},
	'hi-IN': {
		1: `बोनस का दावा करने के लिए दोस्तों को आमंत्रित करें। आप जितने ज़्यादा लोगों को आमंत्रित करेंगे, आपको उतने ज़्यादा बोनस मिलेंगे।;\n`,
		2: `बोनस का दावा मैन्युअल रूप से किया जाना चाहिए। समाप्ति के बाद, बोनस स्वचालित रूप से वितरित किए जाएँगे और अन्य एजेंटों से बोनस और कमीशन के साथ उनका आनंद लिया जा सकता है।;\n`,
		3: `बोनस (मूलधन को छोड़कर) के लिए {multiplier} बार वैध दांव वापस लेने की आवश्यकता होती है।;\n`,
	},
	'vi-VN': {
		1: `Mời bạn bè của bạn cùng nhận tiền thưởng. Bạn mời càng nhiều người, bạn sẽ nhận được càng nhiều tiền thưởng;\n`,
		2: `Tiền thưởng cần phải được thu thập thủ công. Sau khi hết hạn, tiền thưởng sẽ được tự động phân phối và có thể được hưởng cùng với tiền thưởng và hoa hồng từ các đại lý khác;\n`,
		3: `Tiền thưởng (không bao gồm tiền gốc) yêu cầu phải cược hợp lệ {multiplier} lần trước khi rút tiền;\n`,
	},
}

// 公用的规则模板
const addFiveSixRules: ActivityRulesMap = {
	'zh-CN': {
		5: `仅限账号本人进行正常的人为操作，否则将取消或扣除奖励、冻结、甚至拉入黑名单;\n`,
		6: `为避免文字理解差异，平台将保留本活动最终解释权。\n`,
	},
	'en-US': {
		5: `Only the account owner can perform normal manual operations, otherwise the bonus will be cancelled or deducted, frozen, or even blacklisted;\n`,
		6: `In order to avoid differences in text understanding, the platform will reserve the final right of interpretation of this activity.\n`,
	},
	'pt-BR': {
		5: `Somente o proprietário da conta pode realizar operações manuais normais, caso contrário, o bônus será cancelado ou deduzido, congelado ou até mesmo colocado na lista negra;\n`,
		6: `Para evitar diferenças na compreensão do texto, a plataforma se reserva o direito final de interpretação desta atividade.\n`,
	},
	'id-ID': {
		5: `Hanya pemilik akun yang dapat melakukan operasi manual normal, jika tidak, bonus akan dibatalkan atau dikurangi, dibekukan, atau bahkan masuk daftar hitam;\n`,
		6: `Untuk menghindari perbedaan pemahaman teks, platform akan memiliki hak akhir untuk menafsirkan aktivitas ini.\n`,
	},
	'hi-IN': {
		5: `केवल खाता स्वामी ही सामान्य मैन्युअल संचालन कर सकता है, अन्यथा बोनस रद्द या काट लिया जाएगा, फ्रीज कर दिया जाएगा, या यहां तक ​​कि ब्लैकलिस्ट भी कर दिया जाएगा।;\n`,
		6: `पाठ समझ में अंतर से बचने के लिए, प्लेटफ़ॉर्म इस गतिविधि की व्याख्या का अंतिम अधिकार सुरक्षित रखेगा।\n`,
	},
	'vi-VN': {
		5: `Chỉ chủ tài khoản mới có thể thực hiện các thao tác thủ công thông thường, nếu không phần thưởng sẽ bị hủy hoặc khấu trừ, đóng băng hoặc thậm chí bị đưa vào danh sách đen;\n`,
		6: `Để tránh sự khác biệt trong việc hiểu văn bản, nền tảng sẽ giữ quyền giải thích cuối cùng cho hoạt động này.\n`,
	},
}

// 代理
export function generateAgencyRule(language: LanguageType, variables: ActivityVariables): string {
	const agencyTemplate = agencyTemplates_Threes[language]
	if (!agencyTemplate) {
		return 'Unsupported language'
	}
	let result = ''
	result = Object.entries(agencyTemplate).map(([key, value]) => {
		return `${key}. ${value.replace('{multiplier}', `${variables.multiplier}`)}`
	}).join('\n')

	// 添加规则4和5
	const rulesFiveSix = addFiveSixRules[language]
	if (rulesFiveSix) {
		result += `\n4. ${rulesFiveSix[5]}\n5. ${rulesFiveSix[6]}`
	}

	return result
}

export const ZRewardType = {
	enum: {
		FIXED: 'FIXED',
		RANDOM: 'RANDOM'
	}
} as const

export const ZDisplayMode = {
	enum: {
		RED_PACKET: 'RED_PACKET',
		BOX: 'BOX',
		RECEIVE: 'RECEIVE'
	}
} as const
