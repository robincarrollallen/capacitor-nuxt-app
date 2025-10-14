<script setup lang="ts">
import type { PopupPosition } from "vant/lib/popup/types"
import { EMIT_KEY } from "@/enums"

const props = withDefaults(defineProps<{
  type?: "single" | "range"
  date?: Date | Date[]
  position?: PopupPosition
}>(), {
  date: () => null,
  type: "single",
  position: "center",
})

const emits = defineEmits([EMIT_KEY.CONFIRM])

const show = ref(false)

const showConfirm = computed(() => {
  return props.type === "range"
})

/** 确认事件 */
function onConfirm(data: any) {
  emits(EMIT_KEY.CONFIRM, data)
  show.value = false
}

/** 点击事件 */
function onClick() {
  show.value = true
}
</script>

<template>
  <div @click="onClick">
    <slot>
      <span v-if="showConfirm">{{ props.date ? (props.date as Date[]).map(item => item.toLocaleDateString()).join(' - ') : $t('activity.selectDate') }}</span>
      <span v-else>{{ props.date ? (props.date as Date).toLocaleDateString() : $t('activity.selectDate') }}</span>
    </slot>
  </div>
  <van-calendar v-model:show="show" class="calendar-picker" :show-confirm="showConfirm" switch-mode="month" :type="props.type" :position="props.position" v-bind="$attrs" @confirm="onConfirm" />
</template>

<style lang="less" scoped>
:global(.calendar-picker .van-calendar) {
	--van-calendar-background: var(--ep-color-background-fill-body-default);
	--van-calendar-header-action-color: var(--ep-color-text-default);
	--van-calendar-month-mark-color: rgba(255, 255, 255, 0.1);
	--van-text-color: var(--ep-color-text-weaker);
}
</style>
