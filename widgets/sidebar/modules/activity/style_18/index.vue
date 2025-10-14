<script setup lang="ts">
import { interval, setAmountInterval } from '../../../data'

const tenantStore = useTenantStore()
const activityStore = useActivityStore()

const dynamicAmount = ref(parseInt(Date.now().toString().slice(-9)) / 100) // Dynamic amount

const activityList = computed(() => activityStore.sideBarActivityList.slice(0, 12)) // Activity list

onMounted(() => {
	setAmountInterval(setInterval(() => {
		dynamicAmount.value = parseInt(Date.now().toString().slice(-9)) / 100
	}, 3000))
})

onUnmounted(() => {
	clearInterval(interval)
})
</script>

<template>
	<section class="activity-recommend-wrap">
		<div class="activity-recommend-title">
			<div class="activity-recommend-highly-icon" />
			<div class="activity-recommend-title-text">
				<div>{{ tenantStore.merchantCy }}<AnimatedNumber :value="dynamicAmount" :decimals="2" /></div>
				<p>JACKPOT</p>
			</div>
		</div>

		<div class="activity-recommend-list">
			<div v-for="activity in activityList" :key="activity.id" class="activity-recommend-item">
				<van-image class="activity-recommend-item-icon" :src="activity.defaultIconUrl || activity.customIconUrl" :show-loading="false" />
				<div class="activity-recommend-item-title">{{ activity.name }}</div>
			</div>
		</div>
	</section>
</template>

<style scoped lang="less">
section {
	.activity-recommend-title {
		gap: 0.375rem;
		display: flex;
		cursor: pointer;
		flex-wrap: wrap;
		align-items: center;
		text-shadow: rgb(0, 212, 255) 0px 0px 0.625rem;

		.activity-recommend-highly-icon {
			width: 3rem;
			height: 3rem;
			background: url('@/assets/images/highly.png') no-repeat center center;
			background-size: 100% 100%;
		}

		.activity-recommend-title-text {
			font-weight: 700;
			font-style: italic;

			div {
				display: flex;
				align-items: center;
				gap: 0.25rem;
				font-size: .75rem;
			}

			p {
				font-size: 0.5rem;
				-webkit-text-fill-color: transparent;
				background: linear-gradient(90deg, rgb(36, 208, 151), rgb(35, 155, 196)) text;
			}
		}
	}

	.activity-recommend-list {
		gap: 0.5rem;
		display: grid;
		margin-top: 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(6.5rem, 1fr));

		.activity-recommend-item {
			gap: 0.25rem;
			display: flex;
			cursor: pointer;
			padding: 0.5rem;
			border-radius: 0.25rem;
			align-items: center;
			background-color: var(--ep-color-background-fill-surface-raised-L2);

			.activity-recommend-item-icon {
				width: 1rem;
				height: 1rem;
			}

			.activity-recommend-item-title {
				flex: 1;
				font-size: 0.625rem;
				font-weight: 700;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}
		}
</style>
