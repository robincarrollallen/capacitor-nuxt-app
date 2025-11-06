<script setup lang="ts">
import { useSortTabLogic } from "../logic"
import GameWarp from "@/widgets/gameWrap/style_18/index.vue"

const { active, homeHotList, homePlatformList, tabsOffsetTop, getGameListByPlatform } = useSortTabLogic()
</script>

<template>
  <van-tabs v-model:active="active" class="segment-tabs" scrollspy sticky :offset-top="tabsOffsetTop">
    <van-tab v-for="platform of homePlatformList" :key="platform.id" class="segment-pane">
      <template #title>
        <div class="segment-tab">
          <Icon class="segment-tab-icon" :src="platform.logo" />
          <div>{{ platform.name }}</div>
        </div>
      </template>
      <div class="segment-pane-wrap">
        <GameWarp v-if="platform.id === 0" :platform="platform" :list="homeHotList" />
        <GameWarp v-else :platform="platform" :list="getGameListByPlatform(platform.id)" />
      </div>
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="less">
.segment-tabs {

	:deep(.van-sticky) {
		background: var(--ep-color-background-fill-body-default);

		.van-tabs__wrap {
			--van-tabs-line-height: 4rem;

			.van-tabs__nav.van-tabs__nav--line.van-tabs__nav--complete {
				background: url('@/assets/images/bgTrapezoid.png') no-repeat;
				background-size: 100% 50%;
				background-position: center 80%;
				padding: 0 0 .5rem 0;

				.van-tabs__line {
					background: var(--ep-color-icon-success);
					bottom: .5rem;
				}

				.segment-tab {
					font-size: .75rem;
					text-align: center;

					.segment-tab-icon {
						width: 2.5rem;
						height: 2.5rem;
					}
				}

				.van-tab--active {
					.segment-tab {
						color: var(--ep-color-text-default);

						.segment-tab-icon {
							color: var(--ep-color-icon-danger);
						}
					}
				}
			}
		}
	}

	:deep(.van-tabs__content) {
		.segment-pane {
			padding: .5rem 0 0;

			.segment-pane-wrap {
				border: none;
			}
		}
	}
}
</style>
