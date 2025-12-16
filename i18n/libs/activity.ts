import type { LanguageType, RechargeType, ResetType } from "@/enums"

/**
 * Get language code
 * @param language - Language
 */
export function getLanguageCode(language: LanguageType) {
  if (language === "en-PH") {
    return "en-US"
  }
  return language // Return original language
}

/**
 * Get recharge activity name
 * @param language - Language
 * @param resetType - Reset type
 * @param rechargeType - Recharge type
 */
export function getRechargeActivityName(language: LanguageType, resetType: ResetType, rechargeType: RechargeType): string {
  const names = {
    "zh-CN": {
      NONE: {
        FIRST: "首充额外奖励",
        SINGLE: "单笔充值加赠",
        SUM: "累计充值加赠",
      },
      DAILY: {
        FIRST: "每日首充加赠",
        SINGLE: "每日单笔充值加赠",
        SUM: "每日累计充值加赠",
      },
      WEEKLY: {
        FIRST: "每周首充加赠",
        SINGLE: "每周单笔充值加赠",
        SUM: "每周累计充值加赠",
      },
    },
    "en-US": {
      NONE: {
        FIRST: "First Deposit Extra Reward",
        SINGLE: "Additional bonus for every recharge",
        SUM: "Cumulative recharge additional reward",
      },
      DAILY: {
        FIRST: "Daily First Deposit Extra Reward",
        SINGLE: "Daily Additional bonus for every recharge",
        SUM: "Daily Cumulative recharge additional reward",
      },
      WEEKLY: {
        FIRST: "Weekly First Deposit Extra Reward",
        SINGLE: "Weekly Additional bonus for every recharge",
        SUM: "Weekly Cumulative recharge additional reward",
      },
    },
    "pt-BR": {
      NONE: {
        FIRST: "Recompensa Extra para Primeiro Depósito",
        SINGLE: "Bônus adicional para cada recarga",
        SUM: "Recompensa adicional de recarga acumulativa",
      },
      DAILY: {
        FIRST: "Recompensa Extra de Primeiro Depósito Diário",
        SINGLE: "Bônus adicional diário para cada recarga",
        SUM: "Recompensa adicional diária por recarga acumulada",
      },
      WEEKLY: {
        FIRST: "Recompensa Extra de Primeiro Depósito Semanal",
        SINGLE: "Bônus adicional semanal para cada recarga",
        SUM: "Bônus Semanal de Recarga Cumulativa",
      },
    },
    "id-ID": {
      NONE: {
        FIRST: "Bonus tambahan untuk isi ulang pertama",
        SINGLE: "Bonus tambahan untuk setiap isi ulang",
        SUM: "Bonus tambahan untuk akumulasi isi ulang",
      },
      DAILY: {
        FIRST: "Bonus tambahan untuk isi ulang pertama setiap hari",
        SINGLE: "Bonus tambahan untuk setiap isi ulang tunggal harian",
        SUM: "Bonus tambahan untuk akumulasi isi ulang harian",
      },
      WEEKLY: {
        FIRST: "Bonus tambahan untuk isi ulang pertama setiap minggu",
        SINGLE: "Bonus tambahan untuk setiap isi ulang tunggal mingguan",
        SUM: "Bonus tambahan untuk akumulasi isi ulang mingguan",
      },
    },
    "hi-IN": {
      NONE: {
        FIRST: "पहली जमा पर अतिरिक्त इनाम",
        SINGLE: "प्रत्येक रिचार्ज पर अतिरिक्त बोनस",
        SUM: "संचयी रिचार्ज अतिरिक्त इनाम",
      },
      DAILY: {
        FIRST: "दैनिक पहले जमा पर अतिरिक्त इनाम",
        SINGLE: "प्रत्येक रिचार्ज पर दैनिक अतिरिक्त बोनस",
        SUM: "दैनिक संचयी रिचार्ज अतिरिक्त इनाम",
      },
      WEEKLY: {
        FIRST: "साप्ताहिक पहले जमा पर अतिरिक्त इनाम",
        SINGLE: "प्रत्येक रिचार्ज पर साप्ताहिक अतिरिक्त बोनस",
        SUM: "साप्ताहिक संचयी रिचार्ज अतिरिक्त इनाम",
      },
    },
    "vi-VN": {
      NONE: {
        FIRST: "Tiền thưởng thêm khi gửi tiền lần đầu",
        SINGLE: "Tiền thưởng gửi tiền một lần",
        SUM: "Tiền thưởng tiền gửi tích lũy",
      },
      DAILY: {
        FIRST: "Tiền thưởng gửi tiền đầu tiên hàng ngày",
        SINGLE: "Tiền thưởng gửi tiền đơn hàng ngày",
        SUM: "Tiền thưởng gửi tiền tích lũy hàng ngày",
      },
      WEEKLY: {
        FIRST: "Tiền thưởng gửi tiền đầu tiên hàng tuần",
        SINGLE: "Tiền thưởng gửi tiền một lần hàng tuần",
        SUM: "Tiền thưởng gửi tiền tích lũy hàng tuần",
      },
    },
  }

  return names[language][resetType][rechargeType]
}

/**
 * Get rescue fund activity name
 * @param language - Language
 * @param resetType - Reset type
 */
export function getRescueFundActivityName(language: LanguageType, resetType: ResetType): string {
  const names = {
    "zh-CN": {
      NONE: "",
      DAILY: "每日救援金",
      WEEKLY: "每周救援金",
    },
    "en-US": {
      NONE: "",
      DAILY: "Daily loss rescue fund",
      WEEKLY: "Weekly loss rescue fund",
    },
    "pt-BR": {
      NONE: "",
      DAILY: "Fundo de Resgate de Perdas Diárias",
      WEEKLY: "Fundo de Resgate de Perdas Semanais",
    },
    "id-ID": {
      NONE: "",
      DAILY: "Uang bantuan harian",
      WEEKLY: "Uang bantuan mingguan",
    },
    "hi-IN": {
      NONE: "",
      DAILY: "दैनिक राहत कोष",
      WEEKLY: "साप्ताहिक राहत कोष",
    },
    "vi-VN": {
      NONE: "",
      DAILY: "Quỹ cứu trợ hàng ngày",
      WEEKLY: "Quỹ cứu trợ hàng tuần",
    },
  }

  return names[language][resetType]
}

/**
 * Get lucky wheel activity name
 * @param language - Language
 * @param resetType - Reset type
 */
export function getLuckyWheelActivityName(language: LanguageType, resetType: ResetType): string {
  const names = {
    "zh-CN": {
      NONE: "幸运转盘",
      DAILY: "每日幸运转盘",
      WEEKLY: "每周幸运转盘",
    },
    "en-US": {
      NONE: "Lucky Spin",
      DAILY: "Daily Lucky Spin",
      WEEKLY: "Weekly Lucky Spin",
    },
    "pt-BR": {
      NONE: "Giro da Sorte",
      DAILY: "Giro da Sorte Diário",
      WEEKLY: "Giro da Sorte Semanal",
    },
    "id-ID": {
      NONE: "Roda Keberuntungan",
      DAILY: "Roda Keberuntungan Harian",
      WEEKLY: "Roda Keberuntungan Mingguan",
    },
    "hi-IN": {
      NONE: "लकी रूले",
      DAILY: "दैनिक लकी रूले",
      WEEKLY: "साप्ताहिक लकी रूले",
    },
    "vi-VN": {
      NONE: "Vòng quay may mắn",
      DAILY: "Vòng quay may mắn hàng ngày",
      WEEKLY: "Vòng quay may mắn hàng tuần",
    },
  }

  return names[language][resetType]
}

/**
 * Get commission reward activity name
 * @param language - Language
 * @param resetType - Reset type
 */
export function getCommissionRewardActivityName(language: LanguageType, resetType: ResetType): string {
  const names = {
    "zh-CN": {
      NONE: "",
      DAILY: "每日佣金奖励",
      WEEKLY_DAY: "每周佣金奖励",
      MONTHLY_DAY: "每月佣金奖励",
    },
    "en-US": {
      NONE: "",
      DAILY: "Daily commission reward",
      WEEKLY_DAY: "Weekly commission reward",
      MONTHLY_DAY: "Monthly commission reward",
    },
    "pt-BR": {
      NONE: "",
      DAILY: "Recompensa de Comissão Diária",
      WEEKLY_DAY: "Recompensa de Comissão Semanal",
      MONTHLY_DAY: "Recompensa de Comissão Mensal",
    },
    "id-ID": {
      NONE: "",
      DAILY: "Hadiah Acara Komisi Harian",
      WEEKLY_DAY: "Hadiah Acara Komisi Mingguan",
      MONTHLY_DAY: "Hadiah Acara Komisi Bulanan",
    },
    "hi-IN": {
      NONE: "",
      DAILY: "दैनिक कमीशन इवेंट पुरस्कार",
      WEEKLY_DAY: "साप्ताहिक कमीशन इवेंट पुरस्कार",
      MONTHLY_DAY: "महीने का कमीशन इवेंट पुरस्कार",
    },
    "vi-VN": {
      NONE: "",
      DAILY: "Tiền thưởng hoa hồng hằng ngày",
      WEEKLY_DAY: "Tiền thưởng hoa hồng hàng tuần",
      MONTHLY_DAY: "Tiền thưởng hoa hồng hàng tháng",
    },
  }

  return names[language][resetType]
}
