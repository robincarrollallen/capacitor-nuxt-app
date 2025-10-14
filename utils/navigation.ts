export type TargetValueType = {
  type: string;
  info?: {
    activityId: number | string;
    activityName: string;
  } | string
}

/**
 * @description 跳转到指定的路由页面
 * @param targetValueType 跳转路由类型和活动id
 */
export function handleInlineNavigation({ type, info }: TargetValueType): string | number | undefined {
	const routes: Record<string, string> = {
		recharge: '/main/entrar', // 充值
		withdraw: '/main/withdraw', // 提现
		activity_list: '/main/promo', // 活动页面
		promotion: '/spread', // 推广中心
		vip: '/activity/vip', // vip
		home: '/', // 首页
		redeem_code: '/Redeem', // 兑换码
	}
	return routes[type] || (type === 'activity' ? (info as any)?.activityId : undefined)
}

/**
 * @description 轮播图-转换跳转类型
 * @param targetType 跳转类型
 */
export function handleCarouselJumpType(targetType: string): string {
	const jumpTypes: Record<string, string> = {
		internal: 'activity', // 内跳
		external: 'url', // 外跳
		none: 'none', // 不跳
	}
	return jumpTypes[targetType] || 'none'
}

export const useOpenSwiperLink = async (linkType: string, linkValue: string) => {
	const router = useRouter()
	const activityStore = useActivityStore()
	// 外部链接跳转
	if (linkType === 'url') {
		redirectUrl(httpCompletion(linkValue))
		return
	}
	// 项目路由跳转
	if (linkType === 'activity') {
		// linkValue是数字, 则跳转到活动详情页
		if (checkNumByStr(linkValue)) {
			const activityList = await activityStore.getActivityList()
			// 根据id查找linkValue对应活动
			const activity: any = activityList.find(it => it?.id === Number(linkValue))
			if (!activity) {
				showToast('activity.notMet')
				return
			}
			if (activity?.type === 'Rebate') {
				activityStore.pageType = 2
				router.push(`/main/promo`)
			} else {
				const activityPath = jumpActivityId(activity)
				router.push(`/activity/${activity?.type}/${activityPath}`)
			}
			return
		}
		if (linkValue === '/Redeem') {
			activityStore.pageType = 4
			router.push(`/main/promo`)
		} else if (linkValue == '/') {
			router.replace('/launch').then(() => {
				location.reload()
			})
		} else {
			if (linkValue == '/main/entrar' || linkValue == '/recharge/apply') {
				const bool = await useHandleRecharge()
				if (bool) return
			} else if (linkValue == '/main/withdraw' || linkValue == '/withdraw/apply') {
				const bool = await useHandleWithdraw()
				if (bool) return
			}
			if (linkValue == '/activity/vip') {
				// 如果是vip页面, 则检测是否有权限
				const vipStore = useVipStore()
				await vipStore.getActivityVipType()
				if (!vipStore.activityVipType) return
			}
			router.push(linkValue)
		}
		return
	}
}

/**
 * @description 首页侧边栏-转换跳转类型
 * @param targetType 跳转类型
 */
export function handleSidebarJumpType(targetType: string): string {
	const sidebarTypes: Record<string, string> = {
		internal: 'InternalLink', // 自定义
		external: 'Custom', // 外跳
	}
	return sidebarTypes[targetType] || 'Custom'
}

/**
 * @description 首页侧边栏-valueType类型
 * @param targetValueType 跳转类型
 */
export function handleSideValueType({ info }: TargetValueType): string {
	return (info as any)?.activityId ? 'ACTIVITY' : 'CODE'
}
