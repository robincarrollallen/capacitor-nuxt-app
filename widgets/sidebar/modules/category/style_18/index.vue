<script setup lang="ts">
import { sortIconPosition } from '../../../data'
const gameStore = useGameStore()
</script>

<template>
	<section class="game-category-wrap">
		<div class="game-category-icon" />
		<div v-for="{ gameType, labelKey } in gameStore.homeCategories" :key="gameType" class="game-category-item">
			<span class="game-category-item-icon" :style="sortIconPosition[labelKey]" />
			<span class="game-category-item-title">{{ $t(`sort.${labelKey}`) }}</span>
		</div>
	</section>
</template>

<style scoped lang="less">
section {
	gap: 0.5rem;
	display: flex;
	flex-direction: column;

	.game-category-icon {
		width: 3rem;
		height: 3rem;
		background: url('@/assets/images/category.png') no-repeat center center;
		background-size: 100% 100%;
	}

	.game-category-item {
		gap: 0.5rem;
		display: flex;
		align-items: center;

		.game-category-item-icon {
			width: 1.25rem;
			height: 1.25rem;
			background-size: auto 100%;
			background-image: url('@/assets/images/sort.png');
		}

		.game-category-item-title {
			font-size: 0.625rem;
			font-weight: 700;
			color: var(--ep-color-text-weaker);
		}
	}
}
</style>
