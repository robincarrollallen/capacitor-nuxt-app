<script setup lang="ts">
import { usePwaBarLogic } from "../logic"

const { isNative, tenantInfo, installPwa } = usePwaBarLogic()
</script>

<template>
  <div v-if="!isNative" class="pwa-bar">
    <div class="pwa-wrap">
      <div class="close-btn-bg" />
      <van-icon
        class="close-icon"
        name="cross"
      />
      <van-image
        class="pwa-icon"
        :src="tenantInfo.appIcon"
        :show-loading="false"
      />
      <div class="pwa-title">
        {{ $t('viewsTabbar.pwaView1') }}
      </div>
      <div class="pwa-btn-wrap">
        <Image class="pwa-money" src="/images/pwa-money.png" :show-loading="false" />
        <Button class="pwa-btn" @click="installPwa">
          <Icon src="@/assets/svg/download-new.svg" class="download-svg" />
          <span class="btn-text">{{ $t('viewsSystem.install') }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.pwa-bar {
  width: 100%;
	height: 3.125rem;

	.pwa-wrap {
		z-index: 5;
		width: -webkit-fill-available;
		display: flex;
		position: fixed;
		height: 3.125rem;
		overflow: hidden;
		align-items: center;
		padding: 0 1rem 0 0;
		justify-content: space-between;
		background: var(--ep-color-background-fill-surface-lowered);

		.close-btn-bg {
			position: absolute;
			height: 3.875rem;
			width: 3.875rem;
			border-radius: 50%;
			background: var(--ep-neutral-white-white-10);
			transform: translate(-50%, -50%);
		}

		.close-icon {
			position: absolute;
			left: .25rem;
			top: .25rem;
			font-size: 0.75rem;
		}

		.pwa-icon {
			width: 2.375rem;
			height: 2.375rem;
			border-radius: 8px;
			overflow: hidden;
			margin-left: 2.3125rem;
		}

		.pwa-title {
			flex: 1;
			font-size: 0.75rem;
			line-height: 1.125rem;
			margin: 0 .4375rem;
		}

		.pwa-btn-wrap {
			display: flex;
			align-items: center;

			.pwa-money {
				height: 1.5rem;
			}

			.pwa-btn {
				height: 2.125rem;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: .5rem .625rem;
				box-sizing: border-box;
				border-radius: .375rem;
				background: var(--ep-dynamic-tertiary);
				margin-left: .75rem;

				.download-svg {
					font-size: 1.625rem;
				}

				.btn-text {
					margin-left: .5rem;
					font-size: 0.75rem;
					font-weight: 700;
				}
			}
		}
	}
}
</style>
