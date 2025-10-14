<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NavigationBarProps } from './props'

defineOptions({
	name: 'NavigateBar'
})

const props = defineProps(NavigationBarProps)

const slots = useSlots()
const router = useRouter()
</script>

<template>
  <header>
		<van-nav-bar v-bind="$attrs" @click-left="router.back()" >
			<template v-slot:left v-if="slots.left || props.leftText">
				<slot name="left">{{ props.leftText }}</slot>
			</template>
			<template v-slot:right v-if="slots.right || props.rightText">
				<slot name="right">{{ props.rightText }}</slot>
			</template>
			<template v-slot:title v-if="slots.title || props.title">
				<slot name="title">{{ props.title }}</slot>
			</template>
		</van-nav-bar>
	</header>
</template>

<style scoped lang="less">
header {
	width: 100%;
	min-height: 3.5rem;
}

.van-nav-bar {
	z-index: 9;
	width: 100%;
	position: fixed;
	--van-nav-bar-background: var(--ep-color-background-fill-top-nav-secondary);
  --van-nav-bar-title-text-color: var(--ep-color-text-default);
	--van-nav-bar-icon-color: var(--ep-color-text-default);
	--van-border-color: var(--ep-color-border-default);
	--van-nav-bar-title-font-size: .875rem;
	--van-nav-bar-arrow-size: 1rem;
	--van-nav-bar-height: 3.5rem;
	--van-border-width: 1px;
}
</style>
