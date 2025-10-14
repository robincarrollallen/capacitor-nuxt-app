<script setup lang="ts">
const props = defineProps<{
	ruleContent: string
}>()
</script>

<template>
	<div class="agent-rule">
		<div class="agent-rule-title">
			<span class="agent-rule-title-line" />
			{{ $t('registerReward.000004') }}
			<span class="agent-rule-title-line" />
		</div>
		<div class="agent-rule-content">
			{{ props.ruleContent }}
		</div>
	</div>
</template>

<style lang="less" scoped>
.agent-rule {
	padding: 0 .5rem;
	display: flex;
	flex-direction: column;
	gap: 1rem;

	.agent-rule-title {
		gap: .5rem;
		display: flex;
		align-items: center;
		justify-content: center;

		.agent-rule-title-line {
			width: 1.875rem;
			height: .625rem;
			background-image: url('@/assets/icons/activity/agent/rule-title-line.png');
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position: 0 0;

			&:last-child {
				transform: scaleX(-1);
			}
		}
	}

	.agent-rule-content {
		white-space: pre-line;
		color: rgba(255, 255, 255, 0.6);
	}
}
</style>
