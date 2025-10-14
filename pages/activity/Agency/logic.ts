import type { ZDisplayMode } from "./data"
import { ZRewardType, generateAgencyRule } from "./data"

export function useActivityAgentLogic() {
  const route = useRoute()
  const appStore = useAppStore()
  const agentStore = useAgentStore()
  const activityStore = useActivityStore()

  const rewardShowMode = computed(() => activityStore.agentActivityDetail.displayMode as keyof typeof ZDisplayMode.enum) // 奖励展示模式
  const rewardType = computed(() => activityStore.agentActivityDetail.rewardType as keyof typeof ZRewardType.enum) // 奖励类型
  const conditionType = computed(() => activityStore.agentActivityDetail.validUsers.type || "ONE") // 条件类型
  const agentMediaList = computed(() => agentStore.shareConfig.software || []) // 分享列表
  const locale = computed(() => appStore.locale) // 当前语言
  const activityId = computed(() => route.params.id) // 活动id
  // 所有获取奖励条件
  const allConditions = computed(() => Object.keys(activityStore.agentActivityDetail.validUsers).map(key => ({
    key,
    amount: activityStore.agentActivityDetail.validUsers[key].amount || safeNumber(activityStore.agentActivityDetail.validUsers[key].days),
    status: activityStore.agentActivityDetail.validUsers[key].status === "ON",
  })))
  // 奖励规则
  const ruleContent = computed(() => {
    let variablesValue = { multiplier: 1 }
    try {
      const rules = JSON.parse(activityStore.agentActivityDetail.rule)
      variablesValue = rules.variablesValue
    }
    catch {
      console.error("Failed to parse activity rule")
    }
    return generateAgencyRule(locale.value, variablesValue)
  })
  // 奖励列表
  const rewardList = computed(() => activityStore.agentActivityDetail.rewardConfig.map((item: Recordable, index: number) => {
    const receivedItem = activityStore.agentActivityDetail.rewardList.find((v: Recordable) => v.levelId === item.uuid)
    let isTrue = false // 4 和 4的倍数 不显示箭头, 最后一位也不显示
    if ((index + 1 === 4) || (index + 1) % 4 === 0 || (index + 1) === activityStore.agentActivityDetail.rewardConfig.length) {
      isTrue = true
    }

    return {
      uuid: item.uuid,
      userCount: item.userCount,
      min: formatMoneyToLocal(item.min),
      max: formatMoneyToLocal(item.max),
      rewardAmount: receivedItem ? formatMoneyToLocal(receivedItem?.awardCount) : rewardType.value === ZRewardType.enum.FIXED ? formatMoneyToLocal(item.max) : `${formatMoneyToLocal(item.min)}~${formatMoneyToLocal(item.max)}`,
      isOpen: !!receivedItem,
      isMeet: activityStore.agentActivityDetail.validCount >= item.userCount && !receivedItem,
      showOpenAni: false,
      isTrue,
    }
  }))

  return {
    agentMediaList,
    rewardShowMode,
    conditionType,
    allConditions,
    ruleContent,
    rewardType,
    rewardList,
    activityId,
  }
}
