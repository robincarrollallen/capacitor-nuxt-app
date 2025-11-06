<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue"
import { useGameWarpLogic } from "../logic"

const props = defineProps({
  platform: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  list: {
    type: Array as PropType<Recordable[]>,
    default: () => [],
  },
})

const { hasPrev, hasNext, showAll, swiperRef, currentSlide, swiperHandler, gameCardPagination, collapseIconColor, onSwiper, onSlideChange } = useGameWarpLogic(props)
</script>

<template>
  <div class="segment-pane-item">
    <header class="segment-pane-header">
      <i class="segment-pane-header-icon" :style="props.platform.platformIconStyle" />
      <div class="segment-pane-header-title">
        {{ props.platform.name }}
      </div>
      <div class="segment-pane-header-line" />
      <div class="segment-pane-header-count">
        <div class="segment-pane-header-count-num">
          {{ list.length }}
        </div>
        <div class="segment-pane-header-count-text">
          All
        </div>
      </div>
      <div class="segment-pane-header-more">
        <Icon class="segment-pane-header-more-icon" :class="{ disabled: !hasPrev }" src="@/assets/svg/arrow-left.svg" @click="swiperHandler.slidePrev()" />
        <Icon class="segment-pane-header-more-icon" :class="{ disabled: !hasNext }" src="@/assets/svg/arrow-right.svg" @click="swiperHandler.slideNext()" />
      </div>
    </header>
    <Swiper
      ref="swiperRef"
      :slides-per-view="1"
      :slides-per-group="1"
      :initial-slide="0"
      @swiper="onSwiper"
      @slide-change="onSlideChange"
    >
      <SwiperSlide v-for="(item, index) of gameCardPagination.pages" :key="index">
        <div class="game-wrap">
          <van-image v-for="game of item" :key="game.id" class="game-card" lazy-load :src="game.logoFlag ? `https://game-logo.d-e-7-f.com/pre/style2/en/${game.logoFlag}.jpg` : game.background" />
        </div>
      </SwiperSlide>
    </Swiper>
    <footer class="segment-pane-footer">
      <div class="segment-pane-footer-count">
        {{ `Displaying ${gameCardPagination.pages[currentSlide]?.length} of ${list.length} Games` }}
      </div>
      <div class="segment-pane-footer-collapse" @click="showAll = !showAll">
        {{ showAll ? 'Collapse' : 'Display All' }}
        <van-icon class="segment-pane-footer-collapse-icon" :color="collapseIconColor" :name="showAll ? 'arrow-up' : 'arrow-down'" />
      </div>
    </footer>
  </div>
</template>

<style scoped lang="less">
.segment-pane-item {
	border-radius: .75rem;
	background: var(--ep-color-background-fill-surface-rowered);

	.segment-pane-header {
		padding: 0.5rem 1rem;
		display: flex;
		align-items: center;
		background: url('@/assets/images/headerTextBg.png') no-repeat left top / auto 100%;

		.segment-pane-header-icon {
			color: var(--ep-color-background-fill-glow-primary-opacity-40);
			width: 1.5rem;
			height: 1.5rem;
			margin-right: .5rem;
		}

		.segment-pane-header-line {
			width: 0.0625rem;
			margin: 0 0.75rem;
			height: 1.5rem;
			background: var(--ep-color-border-brand);
			transform: rotate(30deg);
			transform-origin: center;
		}

		.segment-pane-header-count {
			text-align: end;

			.segment-pane-header-count-num {
				font-size: .625rem;
				font-weight: 600;
				color: var(--ep-color-text-default);
			}

			.segment-pane-header-count-text {
				font-size: 0.5rem;
				color: var(--ep-color-text-inverse-disabled);
			}
		}

		.segment-pane-header-more {
			flex: 1;
			display: flex;
			gap: .5rem;
			justify-content: flex-end;

			.segment-pane-header-more-icon {
				border-radius: 50%;
				color: var(--ep-primary-primary-700);
				background: var(--ep-color-background-fill-body-default);

				&.disabled {
					color: var(--ep-color-background-fill-surface-raised-L1);
				}
			}
		}
	}

	.game-wrap {
		padding: .5rem;
		display: grid;
		gap: .5rem;
		grid-template-columns: repeat(4, 1fr);

		@media (min-width: 768px) {
			grid-template-columns: repeat(5, 1fr);
		}

		@media (min-width: 1024px) {
			grid-template-columns: repeat(6, 1fr);
		}

		@media (min-width: 1344px) {
			padding: .625rem;
			gap: .625rem;
			grid-template-columns: repeat(7, 1fr);
		}

		@media (min-width: 1600px) {
			grid-template-columns: repeat(8, 1fr);
		}

		.game-card {
			overflow: hidden;
			border-radius: .5rem;

			&:hover {
				transform: scale(1.05);
			}
		}
	}

	.segment-pane-footer {
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		.segment-pane-footer-collapse {
			text-align: center;
			color: var(--ep-color-text-brand-primary);
			cursor: pointer;

			.segment-pane-footer-collapse-icon {
				margin-left: .25rem;
				border-radius: 50%;
				padding: .125rem;
				background: var(--ep-color-text-brand-primary);
			}
		}
	}
}
</style>
