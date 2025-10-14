<script setup lang="ts">
import { ZRewardType, ZDisplayMode } from '../../data'
import PacketView from './modules/packet/index.vue'
import ButtonView from './modules/button/index.vue'

const props = defineProps<{
	rewardList: Recordable[]
	rewardType: keyof typeof ZRewardType.enum
	rewardShowMode: keyof typeof ZDisplayMode.enum
}>()

</script>

<template>
	<div class="agent-reward-list">
		<div class="agent-reward-list-title">
			<span>{{ $t('activity.agent16') }}</span>
		</div>
		<ButtonView v-if="props.rewardShowMode === ZDisplayMode.enum.RECEIVE" :reward-list="props.rewardList" />
		<PacketView v-else :reward-list="props.rewardList" :reward-show-mode="props.rewardShowMode" :reward-type="props.rewardType" />
	</div>
</template>

<style lang="less" scoped>
.agent-reward-list {
	font-size: .625rem;
	position: relative;
	padding-top: 4.5rem;
	text-align: center;

	.agent-reward-list-title {
		background-image: url('@/assets/images/activity/agent/bar-title.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: 0 0;
		width: calc(100% + 2.875rem);
		aspect-ratio: 120/23;
		position: absolute;
		top: 0;
		left: -1.4375rem;
		font-weight: 700;
		text-shadow:
			-1px -1px 0 #E64021,
			1px -1px 0 #E64021,
			-1px  1px 0 #E64021,
			1px  1px 0 #E64021;

		span {
			height: 57%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
