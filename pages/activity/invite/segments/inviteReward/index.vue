<script setup lang="ts">
import GetReward from './modules/getReward/index.vue'
import RewardData from './modules/rewardData/index.vue'
import InviteReward from './modules/inviteReward/index.vue'

const agentStore = useAgentStore() // 代理store

const commissionSwitch = computed(() => agentStore.agencyConfig.inviteConfig?.commissionSwitch)
const rewardSwitch = computed(() => agentStore.agencyConfig.inviteConfig?.rewardSwitch)
</script>

<template>
	<div class="invite-reward-page">
		<!-- 奖励数据 -->
		<RewardData />
		<!-- 邀请奖励 -->
		<InviteReward v-if="commissionSwitch" />
		<!-- 领取奖励 -->
		<GetReward v-if="rewardSwitch" />
	</div>
</template>

<style scoped lang="less">
.invite-reward-page {
	padding: 1rem;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
	overflow: hidden auto;
	gap: 1rem;
}
</style>
