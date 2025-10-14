<script setup lang="ts">
import { EMIT_KEY } from "@/enums"
import emptySvg from "@/assets/svg/empty.svg"

const props = withDefaults(defineProps<{
  loading?: boolean
  finished?: boolean
  refreshing?: boolean
  bottomSpace?: boolean
  list?: Recordable[]
}>(), {
  loading: false,
  finished: false,
  refreshing: false,
  bottomSpace: false,
  list: () => [],
})
const emits = defineEmits([EMIT_KEY.LOAD, EMIT_KEY.REFRESH])
const layoutStore = useLayoutStore()

const isAtTop = ref(true)

/** 监听列表滚动事件 */
function onScroll(event: Event) {
  isAtTop.value = (event.target as HTMLElement).scrollTop === 0
}

/** 加载更多事件 */
function onLoad() {
  emits(EMIT_KEY.LOAD)
}

/** 下拉刷新事件 */
function onRefresh() {
  emits(EMIT_KEY.REFRESH)
}
</script>

<template>
  <van-pull-refresh :model-value="props.refreshing" :disabled="!isAtTop" @refresh="onRefresh">
    <van-list
      v-bind="$attrs"
      :finished-text="refreshing ? '' : $t('label.noMore')"
      :finished="props.finished"
      :loading="props.loading"
      :offset="0"
      :style="{ paddingBottom: props.bottomSpace ? `${layoutStore.tabBarHeight}px` : '0' }"
      @load="onLoad"
      @scroll="onScroll"
    >
      <slot name="header" />
      <div v-for="(item, index) in props.list" :key="index">
        <slot :item="item" :index="index">
          <!-- 默认插槽内容：当父组件没有提供内容时显示 -->
          <van-cell class="van-cell-default" :title="index + 1" />
        </slot>
      </div>

      <template v-if="!list.length && !refreshing" #finished>
        <van-empty
          :image="emptySvg"
          image-size="50%"
          :description="$t('label.noRecord')"
        />
      </template>
    </van-list>
  </van-pull-refresh>
</template>

<style lang="less" scoped>
.van-pull-refresh {
	flex: 1;
	height: 100%;

	.van-list {
		height: 100%;
		overflow: hidden auto;

		.van-cell-default {
			--van-cell-background: transparent;
		}
	}
}
</style>
