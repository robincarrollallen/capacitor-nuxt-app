<script setup lang="ts">
import { useOpenBoxHandle } from '../../logic'

const props = defineProps<{
	rewardList: Record<string, any>
}>()

const { openBoxHandle } = useOpenBoxHandle()

const list = ref(props.rewardList)
</script>

<template>
	<div class="agent-reward-list-content">
		<div class="agent-reward-list-item" v-for="item in list" :key="item.uuid">
			<div class="agent-reward-list-condition">
				<div>
					<p>{{ `≥${item.userCount}` }}</p>
					{{ $t('agent.validInvites') }}
				</div>
			</div>
			<div class="agent-reward-list-amount">
				<p>{{ item.rewardAmount }}</p>
				{{ $t('activity.agent11') }}
			</div>
			<Button :loading="item.opening" :class="{ light: item.isMeet }" :disabled="item.isOpen || item.showOpenAni" @click="openBoxHandle(item, 'agency')">{{ $t('rechargeMultiple.receive') }}</Button>
		</div>
	</div>
</template>

<style lang="less" scoped>
.agent-reward-list-content {
	width: 100%;
	margin-top: -1rem;
	display: grid;
	padding: 0 .3125rem;
	grid-template-columns: repeat(1, 1fr);
	gap: .5rem 0;

	.agent-reward-list-item {
		border-radius: .375rem;
		width: 100%;
		text-align: center;
		aspect-ratio: 110/20;
		display: flex;
		align-items: center;
		color: var(--ep-color-text-weak);
		background-color: var(--ep-color-background-fill-glow-primary-opacity-40);
		background-image: url('@/assets/svg/bg-agent-reward-condition.svg');
		background-repeat: no-repeat;
		background-size: auto 100%;
		padding: 0 .75rem;

		.agent-reward-list-condition {

			p {
				color: #fff;
				font-size: 1.125rem;
				font-weight: 600;
			}
		}

		.agent-reward-list-amount {
			flex: 1;

			p {
				font-size: .875rem;
				font-weight: 600;
			}
		}

		button {
			width: auto;
			font-size: .75rem;
			border-radius: .25rem;
			padding: .25rem .75rem;
			opacity: 0;

			&.light {
				opacity: 1;
				color: #FFFFFF;
				background-color: #0A77DA;
			}

			&[disabled] {
				opacity: 1;
				cursor: default;
				background-color: #183B5F;
				color: #FFFFFF66;
			}
		}
	}
}
</style>
