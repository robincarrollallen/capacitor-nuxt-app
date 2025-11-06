<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter() // 路由实例
const agentStore = useAgentStore() // 代理store
const tenantStore = useTenantStore() // 商户store

const inviteConfig = computed(() => agentStore.agencyConfig.inviteConfig) // 邀请配置
const inviteInfo = computed(() => agentStore.inviteInfo) // 邀请信息
</script>

<template>
  <div class="invite-wrap">
    <Icon class="invite-tip" src="@/assets/svg/hint.svg" @click="router.push('/mlmAgent/inviteRule/commission')" />
    <div class="title-img" />
    <div class="invite-title-warp">
      <div class="invite-title">
        {{ $t('splice.inviteFriends') }}
      </div>
      <div class="invite-reward">
        {{ tenantStore.merchantCy }} {{ formatMoneyToLocal(inviteConfig?.inviterAmount) }}
      </div>
      <div class="invited-reward">
        <span>{{ $t('splice.invitedFriends') }}</span>
        <span class="invited-reward-amount">{{ tenantStore.merchantCy }} {{ formatMoneyToLocal(inviteConfig?.inviteeAmount) }}</span>
      </div>
      <Button class="invite-btn" shiny @click="router.push({ path: '/activity/share' })">
        {{ $t('activity.inviteFriendsReward') }}
      </Button>
      <div class="invite-limit">
        <span class="invite-limit-text">{{ `${$t('agent.dailyInviteLimit')}：` }}</span>
        <span>{{ inviteInfo?.todayRewardCount || 0 }}/{{ inviteConfig?.dailyLimit || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.invite-wrap {
	gap: 1rem;
	padding:  3.75rem 1rem 1rem;
	display: flex;
	position: relative;
	text-align: center;
	align-items: center;
	margin-top: 1.25rem;
	border-radius: .5rem;
	flex-direction: column;
	background: var(--ep-color-background-fill-surface-raised-L1);

	.title-img {
		position: absolute;
		top: -1.75rem;
		height: 5rem;
		width: 8.125rem;
		background: url('@/assets/images/activity/invite/title-reward.png') no-repeat center center;
		background-size: 100% 100%;
	}

	.invite-tip {
		top: 1.3125rem;
		right: 1rem;
		font-size: .875rem;
		position: absolute;
	}

	.invite-title-warp {
		width: 100%;

		.invite-reward {
			font-size: 1.5rem;
			font-weight: 600;
			margin-top: 2rem;
			color: var(--ep-color-text-highlight);
		}

		.invited-reward {
			font-size: .75rem;
			color: var(--ep-color-text-weaker);

			.invited-reward-amount {
				color: var(--ep-color-text-warning, var(--color-currency));
			}
		}

		.invite-btn{
			margin: 2rem 0 1rem;
		}

		.invite-limit {
			font-size: .75rem;

			.invite-limit-text {
				color: var(--ep-color-text-weaker);
			}
		}
	}
}
</style>
