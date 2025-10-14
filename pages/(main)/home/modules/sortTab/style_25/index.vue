<script setup lang="ts">
import { useSortTabLogic } from "../logic"
import { Assets } from "@/theme/assets"
import type { ComponentConfig } from "@/theme/componentConfig"

const props = defineProps({
  getCategoryIconStyle: {
    type: Function,
    default: () => () => {},
  },
  getPlatformIconStyle: {
    type: Function,
    default: () => () => {},
  },
  components: {
    type: Array as PropType<ComponentConfig[]>,
    default: () => [],
  },
})

const { active, homePlatformList, tabsOffsetTop, homeList, isGameCategory, gameWarpComponent, getGameListByPlatform, getGameListByCategory } = useSortTabLogic(props)
</script>

<template>
  <van-tabs v-if="isGameCategory" v-model:active="active" class="segment-tabs" sticky :offset-top="tabsOffsetTop" v-bind="$attrs">
    <van-tab v-for="(gameCategory, index) of homeList" :key="gameCategory.id" class="segment-pane">
      <template #title>
        <div class="segment-tab" :style="{ backgroundImage: `url(${Assets.bg_game_category_25[gameCategory.code]})` }" @click.stop="null">
          <p class="segment-tab-icon" :style="gameCategory.categoryIconStyle" />
          <div>{{ gameCategory.name }}</div>
        </div>
      </template>
      <div v-if="active === index">
        <div v-for="gameCategory of homeList" :key="gameCategory.id">
          <component :is="gameWarpComponent" v-for="platform in gameCategory.platformList" :key="platform.id" :components="props.components[0]?.children" :platform="platform" :list="(platform as Recordable).gameList" />
        </div>
      </div>
    </van-tab>
  </van-tabs>
  <van-tabs v-else v-model:active="active" class="segment-tabs" scrollspy sticky :offset-top="tabsOffsetTop" v-bind="$attrs">
    <van-tab v-for="platform of homePlatformList" :key="platform.id" class="segment-pane">
      <template #title>
        <div class="segment-tab">
          <SvgIcon class="segment-tab-icon" :url="platform.logo" />
          <div>{{ platform.name }}</div>
        </div>
      </template>
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="less">
.segment-tabs {
	width: 100%;

	:deep(.van-sticky) {
		background: var(--ep-color-background-fill-body-default);

		.van-tabs__wrap {
			--van-tabs-line-height: 5rem;

			.van-tabs__nav.van-tabs__nav--line.van-tabs__nav--complete {
				--van-padding-sm: 0;
				background: transparent;
				background-size: 100% 50%;
				background-position: center 80%;
				padding: 0 0 .5rem 0;
				gap: .5rem;

				.van-tabs__line {
					display: none;
					background: var(--ep-color-icon-success);
					bottom: .5rem;
				}

				.segment-tab {
					width: 5rem;
					aspect-ratio: 1;
					font-size: .75rem;
					text-align: center;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background-size: 100% 100%;
					color: var(--ep-color-text-default);

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
