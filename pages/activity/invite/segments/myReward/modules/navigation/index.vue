<script setup lang="ts">
import { useNavigationData } from "./data"

const { agentNavigationList } = useNavigationData()
</script>

<template>
  <ClientOnly>
    <div class="navigation-list">
      <div v-for="item in agentNavigationList" :key="item.name" class="navigation-item">
        <div class="navigation-item-title">
          {{ item.name }}
        </div>
        <van-icon name="arrow" />
      </div>
    </div>
  </ClientOnly>
</template>

<style lang="less" scoped>
.navigation-list {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	padding: 0 1rem;

	.navigation-item {
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: .375rem;
		background-color: var(--ep-color-background-fill-surface-raised-L2);
		background-repeat: no-repeat;
		background-size: 16.375rem 100%;
		background-position: right center;

		&:nth-child(1) {
			background-image: url('@/assets/images/activity/invite/jump-bg1.png');
		}

		&:nth-child(2) {
			background-image: url('@/assets/images/activity/invite/jump-bg2.png');
		}

		&:nth-child(3) {
			background-image: url('@/assets/images/activity/invite/jump-bg6.png');
		}

		&:nth-child(4) {
			background-image: url('@/assets/images/activity/invite/jump-bg3.png');
		}

		&:nth-child(5) {
			background-image: url('@/assets/images/activity/invite/jump-bg4.png');
		}

		&:nth-child(6) {
			background-image: url('@/assets/images/activity/invite/jump-bg6.png');
		}

		.van-icon {
			color: var(--ep-color-icon-weaker);
		}
	}
}
</style>
