<script setup lang="ts">
import { useActivityLogic } from '../logic'

const { activityList } = useActivityLogic()

</script>

<template>
	<div class="activity-title">
		Top Picks
	</div>
	<section class="activity-list" v-bind="$attrs">
		<div v-for="activity in activityList" :key="activity.id" class="activity-box" @click="menuActivityHandle(activity)">
			<div class="activity-content">
				<van-image class="activity-img" :src="activity.logoSrc" :show-loading="false" />
				<label class="label ellipsis">
					{{ activity.shortName }}
				</label>
			</div>
			<div class="activity-button">
				<button>Go !</button>
			</div>
		</div>
	</section>
</template>

<style scoped lang="less">
@import '../index.less';
</style>
