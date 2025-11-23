<script setup lang="ts">
import { EMIT_KEY } from "@/enums"

defineOptions({
  inheritAttrs: false, // 禁用$attrs自动透传到根元素
})

const props = withDefaults(defineProps<{
  gutter?: number | string
  column?: number
  loading?: boolean
  finished?: boolean
  refreshing?: boolean
  bottomSpace?: boolean
  emptyIcon?: string
  emptyText?: string
  emptyIconColor?: string
  emptyTextColor?: string
  list?: Recordable[]
  disabledRefresh?: boolean
}>(), {
  gutter: 0,
  column: 1,
  loading: false,
  finished: false,
  refreshing: false,
  bottomSpace: false,
  disabledRefresh: false,
  emptyIcon: "@/assets/svg/empty.svg",
  emptyText: "",
  emptyIconColor: "",
  emptyTextColor: "",
  list: () => [],
})
const emits = defineEmits([EMIT_KEY.LOAD, EMIT_KEY.REFRESH])

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
  <van-pull-refresh :model-value="props.refreshing" :disabled="!isAtTop || disabledRefresh" @refresh="onRefresh">
    <van-list
      :finished-text="refreshing ? '' : $t('label.noMore')"
      :finished="props.finished"
      :loading="props.loading"
      :offset="0"
      @load="onLoad"
      @scroll="onScroll"
    >
      <slot name="header" />
      <van-grid :column-num="props.column" :gutter="props.gutter" v-bind="$attrs">
        <van-grid-item v-for="(item, index) in props.list" :key="index">
          <slot :item="item" :index="index">
            <!-- 默认插槽内容：当父组件没有提供内容时显示 -->
            <van-cell class="van-cell-default" :title="index + 1" />
          </slot>
        </van-grid-item>
      </van-grid>

      <template v-if="!list.length && !refreshing" #finished>
        <label>
          <Icon :src="emptyIcon" :style="{ color: emptyIconColor }" />
          <span :style="{ color: emptyTextColor }">
            {{ `${emptyText || $t('label.noRecord')}` }}
          </span>
        </label>
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

    .van-grid {
      --van-border-width: 0;

      .van-grid-item {
        --van-grid-item-content-padding: 0;
        --van-grid-item-content-background: transparent;

        :deep(.van-grid-item__content) {
          display: block;
        }
      }
    }

		label {
      margin-top: 30%;
			width: 100%;
			display: flex;
			align-items: center;
      flex-direction: column;
			justify-content: center;

      i {
        width: 50%;
      }

      span {
        font-size: 14px;
        line-height: 1;
      }
		}
	}
}
</style>
