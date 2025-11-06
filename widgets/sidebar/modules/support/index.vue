<script setup lang="ts">
const tenantStore = useTenantStore()
</script>

<template>
  <section>
    <div class="support-item">
      <Icon class="support-icon" src="@/assets/svg/support.svg" />
      <span class="support-text">{{ $t('main.suporte') }}</span>
    </div>
    <div class="media-list">
      <div v-for="media in tenantStore.mainMediaList" :key="media.id" class="media-item">
        <van-image :src="media.icon" class="media-icon" fit="cover" :show-loading="false" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="less">
section {
	gap: 0.5rem;
	display: grid;
	padding: 1rem 0 0;
	border-top: 1px solid var(--ep-color-border-default);
	grid-template-columns: repeat(auto-fit, minmax(6rem, 1fr));

	.support-item {
		gap: 0.5rem;
		display: flex;
		align-items: center;

		.support-icon {
			width: 1.5rem;
			height: 1.5rem;
		}
	}

	.media-list {
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;

		.media-item {
			display: flex;
			min-width: 1.75rem;
			min-height: 1.75rem;
			padding: 0.25rem;
			border-radius: 50%;
			align-items: center;
			justify-content: center;
			background: rgba(42,171,238,.2);

			.media-icon {
				width: 100%;
				height: 100%;
				overflow: hidden;
				border-radius: 50%;
			}
		}
	}
}
</style>
