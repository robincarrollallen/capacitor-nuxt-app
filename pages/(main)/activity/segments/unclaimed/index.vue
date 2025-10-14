<script setup lang="ts">
import { useDays } from '@/hooks/options'
import VipBackground from '@/widgets/svg/vipBackground.vue'

const dayList = useDays()

const list = ref([])
const date = ref(null)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const onLoad = (isRefresh = false) => {
	loading.value = true

	setTimeout(() => {
		if (isRefresh) {
			refreshing.value = false
			list.value = []
		}

		for (let i = 0; i < 30; i++) {
			list.value.push(list.value.length + 1)
		}

		if (list.value.length >= 60) {
			finished.value = true
		} else {
			finished.value = false
		}

		loading.value = false
	}, 1000)
}

const onRefresh = () => {
	onLoad(true)
	refreshing.value = true // 设置下拉刷新状态, 确保空列表状态下不会显示空数据图标
	finished.value = true // 设置加载完成状态, 确保不会同时出现两个加载中图标(下拉加载和加载更多)
}

/** 点击选项框事件 */
const onChange = (value) => {
	console.log(value)
}

/** 日期选择确认事件 */
const onSelect = (value) => {
	date.value = value
}
</script>

<template>
	<div class="unclaimed-page">
		<div class="option-bar">
			<Select ref="selectRef" :options="dayList" @select="onSelect" @change="onChange" :label="$t('activity.selectDate')" />
			<div class="bonus-wrap">
				<span class="bonus-text">{{ `${$t('viewsAssets.bonus')}: ` }}</span>
				<span class="bonus-value">{{ `0.00` }}</span>
			</div>
		</div>
		<RollList bottom-space :list="list" :loading="loading" :finished="finished" :refreshing="refreshing" :onLoad="onLoad" :onRefresh="onRefresh" />
	</div>
</template>

<style lang="less" scoped>
.unclaimed-page {
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;

	.option-bar {
		font-size: var(--ep-font-size-s, 0.75rem);
		gap: 0.75rem;
		display: flex;
		padding: 0.75rem;

		.bonus-wrap {
			flex: 1;
			gap: 0.125rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: var(--ep-font-size-l, 1rem);

			.bonus-value {
				color: var(--ep-color-text-warning);
				font-weight: var(--ep-font-weight-bold, 700);
			}
		}
	}
}
</style>
