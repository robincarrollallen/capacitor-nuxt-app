<script setup lang="ts">
import TeamLevel from './modules/teamLevel/index.vue'
import Navigation from './modules/navigation/index.vue'
</script>

<template>
	<div class="my-reward-page">
		<TeamLevel />
		<Navigation />
	</div>
</template>

<style scoped lang="less">
.my-reward-page {
	gap: 1rem;
	height: 100%;
	display: grid;
	padding: 1rem 0;
	overflow: hidden auto;
	grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
}
</style>
