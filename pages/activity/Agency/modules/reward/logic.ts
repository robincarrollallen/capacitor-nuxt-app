export function useOpenBoxHandle() {
  const { t } = useI18n()

  /**
   * 打开宝箱
   * @param rewardInfo 奖励信息
   * @param activityName 活动名称
   */
  const openBoxHandle = throttle(async (rewardInfo: Record<string, any>, _activityName: string) => {
    if (rewardInfo.isOpen || !rewardInfo.isMeet || rewardInfo.opening)
      return
    console.log(`🚀 开始获取用户 ${rewardInfo.uuid} 的数据...`)

    rewardInfo.opening = true

    let data: any = null
    try {
      data = await new Promise(resolve => setTimeout(resolve, 800)) // 模拟网络延迟
      // 模拟随机失败
      if (Math.random() < 0.5) {
        return showToast({ message: t("popup.activityLimitMsg07"), wordBreak: "break-word" })
      }
      else {
        rewardInfo.rewardAmount = data = 333
      }
    }
    finally {
      rewardInfo.opening = false
    }

    if (data) {
      console.log(`✅ 数据获取成功:`, data)
      rewardInfo.showOpenAni = true
    }
  }, 1000)

  return {
    openBoxHandle,
  }
}
