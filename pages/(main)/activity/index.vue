<script setup>
import { useActivityLogic } from "./logic"

defineOptions({
  name: "ActivityPage",
})

// Use main layout
definePageMeta({
  layout: "main",
  ssr: false,
  auto: false,
})

const activeTabIndex = ref(0) // 活动列表索引

const { tabList } = useActivityLogic()
</script>

<template>
  <div class="activity-page page-safe-area">
    <ClientOnly>
      <van-tabs v-model:active="activeTabIndex" shrink>
        <van-tab v-for="item in tabList" :key="item.type" :title="item.name">
          <component :is="item.component" />
        </van-tab>
      </van-tabs>
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped>
.activity-page {
	height: 100%;
	display: flex;
	flex-direction: column;

	.van-tabs {
		flex: 1;
		height: 0;
		display: flex;
		flex-direction: column;
		--van-tabs-bottom-bar-height: 2px;
		--van-tab-active-text-color: var(--ep-agent-color-highlight-primary, var(--ep-color-text-selected));
		--van-tabs-nav-background: var(--ep-color-background-fill-surface-lowered);

		:deep(.van-tabs__content) {
			flex: 1;
			height: 0;
			overflow: hidden;

			.van-tab__panel {
				height: 100%;
			}
		}
	}
}
</style>
