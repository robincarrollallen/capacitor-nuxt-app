<script setup lang="ts">
import MyReward from "./segments/myReward/index.vue"
import InviteReward from "./segments/inviteReward/index.vue"

defineOptions({
  name: "InvitePage",
})
</script>

<template>
  <div class="invite-page page-safe-area">
    <ClientOnly>
      <NavigateBar :title="$t('agent.center')" left-arrow />
      <van-tabs>
        <van-tab :title="$t('tags.myReward')">
          <MyReward />
        </van-tab>
        <van-tab :title="$t('tags.inviteReward')">
          <InviteReward />
        </van-tab>
      </van-tabs>
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped>
.invite-page {
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
