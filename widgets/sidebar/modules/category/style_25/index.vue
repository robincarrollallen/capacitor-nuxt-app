<script setup lang="ts">
import { useCategoryLogic } from '../logic'

const props = defineProps({
	getCategoryIconStyle: {
		type: Function,
		default: () => (() => {}),
	},
	getPlatformIconStyle: {
		type: Function,
		default: () => (() => {}),
	},
})

const { gameCategoryList, platformCategoryList, isGameCategory } = useCategoryLogic(props)
</script>

<template>
	<abbr>Category</abbr>
	<section v-if="isGameCategory" v-bind="$attrs">
		<div v-for="category in gameCategoryList" :key="category.name" class="game-category-item">
			<i :style="category.iconStyle" />
			<label>{{ category.name }}</label>
		</div>
	</section>
	<section v-else v-bind="$attrs">
		<div v-for="category in platformCategoryList" :key="category.name" class="platform-category-item">
			<i :style="category.iconStyle" />
			<label>{{ category.name }}</label>
		</div>
	</section>
</template>

<style scoped lang="less">
@import './index.less';
</style>
