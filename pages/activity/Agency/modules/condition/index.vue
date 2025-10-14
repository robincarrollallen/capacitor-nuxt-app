<script setup lang="ts">
import { CONDITION_TYPE } from '../../data'

const props = defineProps<{
	conditionType: string
	allConditions: Record<string, any>
}>()

const { t } = useI18n()

/** Activity condition type */
const CONDITION_NAME = {
	firstRechargeAmount: t('activity.agent16'),
	recharge: t('activity.agent17'),
	bet: t('activity.agent18'),
	rechargeDays: t('activity.agent19'),
	rechargeCount: t('activity.agent20'),
} as const
</script>

<template>
	<div class="agent-condition">
		<div class="agent-condition-title">
			<p>{{ $t('activity.agent13') }}
				<span v-if="props.conditionType === CONDITION_TYPE.ALL">{{ $t('activity.agent14') }}</span>
				<span v-if="props.conditionType === CONDITION_TYPE.ONE">{{ $t('activity.agent15') }}</span>
			</p>
		</div>
		<div class="agent-condition-item" v-for="item in props.allConditions" :key="item.key" v-show="item.status">
			<div class="agent-condition-item-title">
				{{ CONDITION_NAME[item.key] }}
			</div>
			<div class="agent-condition-item-amount">
				{{ `≥${(['rechargeDays', 'rechargeCount'].includes(item.key) ? item.amount : fixedNumber(item.amount))}` }}
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.agent-condition {
	padding: .625rem;
	background-color: var(--color-background-fill-glow-primary-opacity-40, #0A77DA66);

	.agent-condition-title {
		padding-bottom: .625rem;

		p {
			font-size: .75rem;
		}
	}

	.agent-condition-item {
		display: flex;
		align-items: center;
		padding: .625rem 0;
		border-top: 1px solid #FFFFFF1A;
		justify-content: space-between;

		.agent-condition-item-title {
			color: rgba(255, 255, 255, 0.6);
		}

		.agent-condition-item-amount {
			text-align: right;
			color: #FC974C;
			width: 5rem;
		}
	}
}
</style>
