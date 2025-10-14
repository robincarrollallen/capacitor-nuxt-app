// eslint-disable-next-line ts/consistent-type-definitions
export type EventConfig = {
  /** 用户注册 */
  "user/register": [
    {
      userId: number
      tenantId: number
      channelId: number
    },
  ]

  /** 用户注册点击 */
  "user/registerClick": [object]

  /** 用户登录 */
  "user/login": [
    {
      userId: number
      tenantId: number
      channelId: number
    },
  ]

  /** 用户关闭注册弹窗 */
  "user/registerModalClose": [object]

  /** 用户权限 */
  "user/permissionMT": [object]

  /** pwa更新进度条 */
  "pwa/updateAPKProgress": [object]

  /** 用户登出 */
  "user/logout": [
    {
      userId: number
      tenantId: number
    },
  ]

  /** 用户游戏 */
  "user/play-game": [
    {
      userId: number
      tenantId: number
      gameId: string
    },
  ]

  /** 用户加入购物车 */
  "user/start-pay": [
    {
      userId: number
      tenantId: number
      amount: number
      currency: string
    },
  ]

  /** 用户支付成功 */
  "user/pay-success": [
    {
      userId: number
      tenantId: number
      amount: number
      changeTwoType: string
      currency: string
      isFirstRecharge: boolean
      orderNo: string
    },
  ]

  /** 用户充值广告回传 */
  "user/recharge-ad-report": [
    {
      userId: number
      tenantId: number
      amount: number
      changeTwoType: string
      currency: string
      isFirstRecharge: boolean
      orderNo: string
    },
  ]

  /** 游戏下注 */
  "betBy/refresh": [
    {
      userId: number

      balance: number

    },
  ]

  /** 用户提现成功 */
  "user/withdraw-success": [
    {
      userId: number
      tenantId: number
      amount: number
      changeTwoType: string
      currency: string
    },
  ]

  /** 用户优惠 */
  "user/reward-success": [
    {
      userId: number
      tenantId: number
      amount: number
      changeTwoType: string
      currency: string
    },
  ]

  /** 充值奖励 */
  "activity/recharge-activity": [
    {
      userId: number
      awardType: number
      activityId: number
      awardCount: number
      currency: string
    },
  ]

  /** 用户下载 */
  "user/download": [
    {
      userId: number
    },
  ]

  /** 用户安装PWA */
  "user/installPWA": [object]

  /** 用户打开PWA */
  "user/openPWA": [object]

  /** 系统-初始化完成  */
  "system/init-finish": [
    {
      channelId: string
      tenantId: number
    },
  ]

  /** 系统-退出 */
  "system/exit": []

  /** 红包活动领取成功 */
  "redpacket/receive-success": []

  /** 批量优惠 */
  "reward/manual-user-reward": [
    {
      orderNo: string
      userId: number
      batchNo: string
      amount: number
      appRemark: string
      rewardType: string
      operationType: string
    },
  ]

  /**
   * 新人任务奖励推送
   */
  "task/newbie_task": [
    {
      id: number
      claimableTime: Date
      expireTime: Date
      rewardAmount: number
    },
  ]

  /** 注册奖励 */
  "registerReward/receive-success": [
    object,
  ]

  /** 强制弹出关闭时触发 */
  "forcedModal/dismiss": [
    {
      type: string | null | undefined // 强制弹出类型
      forceModalCloseType?: number | null | undefined // 强制弹出类型
      isHideModal?: boolean | undefined // 是否隐藏弹窗
    },
  ]
}
