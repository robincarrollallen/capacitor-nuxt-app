<script setup lang="ts">
import { ref } from 'vue'
import { V_MODEL_KEY } from '@/enums'

const props = defineProps<{
	modelValue?: number | string // 父组件支持v-model
	tabs?: {
		text: string
		value: string | number
	}[]
}>()

const emits = defineEmits([V_MODEL_KEY.VALUE])

const tabsRef = ref(null)
let resizeObserver: ResizeObserver | null = null

const active = computed({
	get() {
		return props.modelValue ?? 0
	},
	set(value) {
		emits(V_MODEL_KEY.VALUE, value)
	}
})

/** 更新Tab滑块宽度 */
const updateBottomBarWidth = () => {
	const activeTab = tabsRef.value.$el.querySelector('.van-tab--active')
	if (activeTab) {
		const width = activeTab.offsetWidth
		tabsRef.value.$el.style.setProperty('--van-tabs-bottom-bar-width', `${width}px`)
	}
}

onMounted(() => {
	if (tabsRef.value) {
		// 监听尺寸变化
		resizeObserver = new ResizeObserver(() => {
			updateBottomBarWidth()
		})

		const tabs = tabsRef.value.$el.querySelectorAll('.van-tab')
		tabs.forEach(tab => resizeObserver?.observe(tab))
	}
})

onUnmounted(() => {
	resizeObserver?.disconnect()
})
</script>

<template>
  <van-tabs ref="tabsRef" class="slider-tabs" v-model:active="active">
		<slot>
			<van-tab v-for="tab in props.tabs" :key="tab.value" :title="tab.text"></van-tab>
		</slot>
	</van-tabs>
</template>

<style lang="less" scoped>
.van-tabs {
	--van-tab-text-color: var(--ep-color-text-weaker);
	--van-tab-active-text-color: var(--ep-color-text-selected);

	:deep(.van-tabs__wrap) {
		.van-tabs__nav {
			z-index: 0;
			padding: 0;
			border-radius: .375rem;
			--van-tabs-nav-background: var(--ep-color-background-fill-surface-lowered);

			.van-tabs__line {
				z-index: -1;
				height: 100%;
				bottom: auto;
				display: flex;
				align-items: center;
				justify-content: center;
				--van-tabs-bottom-bar-color: transparent;

				--van-tabs-slider-padding: var(--van-tabs-slider-offset, .1875rem);
				--van-tabs-slider-width: calc(100% - var(--van-tabs-slider-padding) * 2);
				--van-tabs-slider-height: calc(100% - var(--van-tabs-slider-padding) * 2);

				&::before {
					content: '';
					position: absolute;
					border-radius: .375rem;
					top: var(--van-tabs-slider-padding);
					width: var(--van-tabs-slider-width);
					height: var(--van-tabs-slider-height);
					background: var(--ep-color-background-fill-surface-raised-L2);
				}
			}
		}
	}
}
</style>
