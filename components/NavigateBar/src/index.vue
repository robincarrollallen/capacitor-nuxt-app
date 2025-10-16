<script setup lang="ts">
import { useRouter } from "vue-router"
import { NavigationBarProps } from "./props"

defineOptions({
  name: "NavigateBar",
})

const props = defineProps(NavigationBarProps)

const slots = useSlots()
const router = useRouter()
</script>

<template>
  <header>
    <van-nav-bar v-bind="$attrs" @click-left="router.back()">
      <template v-if="slots.left || props.leftText" #left>
        <slot name="left">
          {{ props.leftText }}
        </slot>
      </template>
      <template v-if="slots.right || props.rightText" #right>
        <slot name="right">
          {{ props.rightText }}
        </slot>
      </template>
      <template v-if="slots.title || props.title" #title>
        <slot name="title">
          {{ props.title }}
        </slot>
      </template>
    </van-nav-bar>
  </header>
</template>

<style scoped lang="less">
header {
	width: 100%;
	height: var(--height, 3.5rem);

	.van-nav-bar {
		width: 100%;
		--van-nav-bar-background: var(--ep-color-background-fill-top-nav-secondary);
		--van-nav-bar-title-text-color: var(--ep-color-text-default);
		--van-nav-bar-icon-color: var(--ep-color-text-default);
		--van-border-color: var(--ep-color-border-default);
		--van-nav-bar-title-font-size: .875rem;
		--van-nav-bar-arrow-size: 1rem;
		--van-nav-bar-height: var(--height, 3.5rem);
		--van-border-width: 1px;
	}
}
</style>
