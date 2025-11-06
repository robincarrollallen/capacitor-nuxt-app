<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter() // 路由实例
const agentStore = useAgentStore() // 代理store
const tenantStore = useTenantStore() // 商户store

const levelConfig = computed(() => agentStore.agencyConfig.inviteConfig?.commissionLevelConfig || []) // 奖励等级配置
const rewardCount = computed(() => agentStore.inviteInfo?.reward?.count || 0) // 已邀请奖励人数
const inviteComm = computed(() => agentStore.inviteInfo?.commission || []) // 邀请成就奖励列表
const totalReward = computed(() => { // 总奖励金额
  let total = 0
  agentStore.agencyConfig.inviteConfig?.commissionLevelConfig.forEach((item: any) => {
    total += item.rewardAmount
  })
  return formatMoneyToLocal(total)
})
const maxInviteCount = computed(() => { // 最大邀请人数
  return agentStore.agencyConfig.inviteConfig?.commissionLevelConfig[agentStore.agencyConfig.inviteConfig?.commissionLevelConfig.length - 1]?.requiredCount || 0
})
const progressWidth = computed(() => { // 邀请成就进度条宽度
  let width = 0
  agentStore.agencyConfig.inviteConfig?.commissionLevelConfig.forEach((item: any) => {
    if (rewardCount.value >= item.requiredCount) {
      width += 1 / agentStore.agencyConfig.inviteConfig?.commissionLevelConfig.length
    }
  })
  return width
})
const totalPendingReward = computed(() => { // 待领取奖励金额
  let amount = 0
  agentStore.inviteInfo?.commission.forEach((item: any) => {
    if (item.status === "DISTRIBUTED") {
      amount += Number(item.amount)
    }
  })
  return `${tenantStore.merchantCy} ${formatMoneyToLocal(amount)}`
})

/**
 * @description 点击步骤,领取奖励
 */
async function handleStepClick(amount: number) {
  if (inviteComm.value[amount]?.status === "DISTRIBUTED") {
    // showLoading()
    try {
      // await claimInviteRewardApi().then(() => {
      // showPopup({
      // 	type: PopupType.BONUS,
      // 	msg: $i18n.t('popup.tips05', { amount: totalPendingReward.value }),
      // 	leftBtnCallback: agentStore.setInviteInfo,
      // })
      // })
    }
    catch {
      // hideLoading()
    }
  }
}
</script>

<template>
  <div class="get-reward-wrap">
    <Icon class="get-reward-tip" src="@/assets/svg/hint.svg" @click="router.push('/mlmAgent/inviteRule/reward')" />
    <div class="get-reward-explain-warp">
      <div class="get-reward-title">
        {{ $t('splice.inviteFriendsNum', { num: maxInviteCount }) }}
      </div>
      <div class="get-reward-amount">
        {{ tenantStore.merchantCy }} {{ totalReward }}
      </div>
      <div class="get-reward-steps">
        <div v-for="(step, index) of levelConfig" :key="step.level" class="get-reward-steps-item" :class="{ active: rewardCount >= step.requiredCount }" @click="handleStepClick(index)">
          <div class="get-reward-steps-icon" />
          <div class="get-reward-steps-amount">
            {{ `${tenantStore.merchantCy}${formatMoneyToLocal(step.rewardAmount)}` }}
          </div>
          <div class="get-reward-steps-circle" :class="{ start: index === 0, end: index === levelConfig.length - 1 }">
            <van-icon v-if="inviteComm[index]?.status === 'RECEIVED'" class="get-reward-steps-circle-icon" name="success" />
            <div v-else class="get-reward-steps-circle-inner" />
          </div>
          <div class="get-reward-steps-progress">
            <Icon src="@/assets/svg/team.svg" />
            <div>
              <span>{{ rewardCount >= step.requiredCount ? step.requiredCount : rewardCount }}</span>
              <span class="get-reward-steps-progress-total">{{ `/${step.requiredCount}` }}</span>
            </div>
          </div>
          <div class="get-reward-steps-light-claim" :class="{ pending: inviteComm[index]?.status === 'DISTRIBUTED' }" />
        </div>
        <div class="get-reward-steps-progress-warp">
          <div class="get-reward-steps-progress-bar">
            <div class="get-reward-steps-progress-bar-inner" :style="{ width: `${progressWidth * 100}%` }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.get-reward-wrap {
	gap: 1rem;
	display: flex;
	padding: 1rem;
	position: relative;
	text-align: center;
	align-items: center;
	border-radius: .5rem;
	flex-direction: column;
	background: var(--ep-color-background-fill-surface-raised-L1);

	.get-reward-tip {
		top: 1.3125rem;
		right: 1rem;
		font-size: .875rem;
		position: absolute;
	}

	.get-reward-explain-warp {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;

		.get-reward-title {
			width: 100%;
			text-align: start;
		}

		.get-reward-amount {
			width: 100%;
			font-weight: 600;
			font-size: 1.5rem;
			text-align: start;
			color: var(--ep-color-text-highlight);
		}

		.get-reward-steps {
			display: flex;
			margin: 1rem 0 0;
			position: relative;
			z-index: 1;
			width: fit-content;
			max-width: 100%;
			overflow-x: auto;
			-ms-overflow-style: none;
			scrollbar-width: none;
			&::-webkit-scrollbar {
				display: none;
			}

			.get-reward-steps-item {
				z-index: 3;
				gap: 0.5rem;
				width: 4.5rem;
				display: flex;
				position: relative;
				align-items: center;
				flex-direction: column;

				.get-reward-steps-icon {
					width: 3.375rem;
					height: 3.375rem;
					background-size: 100% 100%;
					background-repeat: no-repeat;
					background-position: center center;
					background-image: url('@/assets/images/activity/invite/money4.png');
				}

				.get-reward-steps-amount {
					font-size: .75rem;
					color: var(--ep-color-text-warning, var(--color-currency));
				}

				.get-reward-steps-circle {
					width: 100%;
					margin: auto;
					display: flex;
					height: .75rem;
					align-items: center;
					justify-content: center;

					.get-reward-steps-circle-inner {
						width: .25rem;
						height: .25rem;
						border-radius: 100rem;
						background: var(--ep-color-text-default);

						&.collected {
							background: var(--ep-color-text-success);
						}
					}
				}

				.get-reward-steps-progress {
					gap: 0.125rem;
					display: flex;
					font-size: .625rem;
					align-items: center;
					flex-direction: column;

					ion-icon {
						width: 1rem;
						height: 1rem;
						color: var(--ep-color-text-weaker);
					}

					.get-reward-steps-progress-total {
						color: var(--ep-color-text-weaker);
					}
				}

				.get-reward-steps-light-claim {
					display: none;

					&.pending {
						top: 0;
						width: 100%;
						z-index: -1;
						display: block;
						aspect-ratio: 1/1;
						position: absolute;
						animation: spin 5s linear infinite;
						background: url('@/assets/images/activity/invite/light-claim.png') no-repeat;
						background-size: 100% 100%;
					}
				}

				&.active {
					.get-reward-steps-progress {
						color: var(--ep-color-text-success);

						ion-icon {
							color: var(--ep-color-text-default);
						}

						.get-reward-steps-progress-total {
							color: var(--ep-color-text-success);
						}
					}
				}
			}

			.get-reward-steps-progress-warp {
				position: absolute;
				bottom: 2.75rem;
				z-index: -1;
				width: 100%;
				height: .625rem;

				.get-reward-steps-progress-bar {
					height: 100%;
					border-radius: 100rem;
					background: var(--ep-color-background-fill-body-default);

					.get-reward-steps-progress-bar-inner {
						width: 0%;
						height: 100%;
						border-radius: 100rem;
						background: var(--ep-color-text-success);
					}
				}
			}
		}

		.get-reward-btn-warp {
			width: 100%;
			padding: 0 1rem;

			.get-reward-btn{
				margin: 2rem 0 1rem;
			}
		}
	}
}
</style>
