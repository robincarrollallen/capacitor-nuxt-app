<!-- 奖励数据 -->
<script setup lang="ts">
import { useRouter } from "vue-router"

const router = useRouter()

const agentStore = useAgentStore() // 代理store
const tenantStore = useTenantStore() // 商户store

const totalReward = computed(() => {
  let amount = Number(agentStore.inviteInfo?.reward?.amount || 0)
  agentStore.inviteInfo?.commission.forEach((item: any) => {
    if (item.status === "RECEIVED") {
      amount += Number(item.amount)
    }
  })
  return `${tenantStore.merchantCy} ${formatMoneyToLocal(amount)}`
})
</script>

<template>
  <div class="reward-wrap">
    <div class="reward-item" @click="router.push('/mlmAgent/inviteCommission')">
      <div class="reward-content">
        <div class="Reward-amount">
          {{ totalReward }}
        </div>
      </div>
      <div class="reward-title">
        {{ $t('activity.commission05') }}
        <van-icon name="arrow" />
      </div>
    </div>
    <div class="reward-item" @click="router.push('/mlmAgent/subordinate')">
      <div class="reward-content">
        <div class="reward-amount">
          <Icon src="@/assets/svg/team.svg" />{{ agentStore.myAgentInfo?.histDirectCnt + agentStore.myAgentInfo?.histTeamCnt }}
        </div>
      </div>
      <div class="reward-title">
        {{ $t('agent.inviteNum') }}
        <van-icon name="arrow" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.reward-wrap {
	gap: .75rem;
	display: flex;
	justify-content: space-between;

	.reward-item {
		flex: 1;
		gap: 0.5rem;
		display: flex;
		cursor: pointer;
		align-items: center;
		border-radius: .375rem;
		flex-direction: column;
		justify-content: center;
		padding: .375rem .25rem;
		box-shadow: 0px 4px 12px -4px #00000026;
		background: var(--ep-color-background-fill-surface-raised-L1);
		border-top: 1px solid var(--ep-color-border-default, #1E2D67);

		.reward-content {
			width: 100%;
			display: flex;
			height: 4.25rem;
			font-weight: var(--ep-font-weight-medium, 600);
			font-size: var(--ep-font-size-xxl, 1.5rem);
			text-align: center;
			align-items: center;
			border-radius: .25rem;
			justify-content: center;
			background: var(--ep-color-background-fill-body-default);
		}

		.reward-title {
			width: 100%;
			display: flex;
			font-size: .75rem;
			padding: 0 .125rem;
			align-items: center;
			justify-content: space-between;
			color: var(--ep-color-text-weaker);
		}

		.reward-amount {
			display: flex;
			align-items: center;
			gap: 0.25rem;

			> span {
				width: 1rem;
				height: 1rem;
				color: var(--ep-color-text-success);
			}
		}
	}
}
</style>
