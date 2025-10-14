<script setup lang="ts">
import { safeNumber } from "@/utils/format/number"

interface ButtonProps {
  level?: number
}

const props = withDefaults(defineProps<ButtonProps>(), {
  level: 0,
})

const vipLevel = computed(() => safeNumber(props.level) + 1)
</script>

<template>
  <article class="vip__tag">
    <Image :src="`@/assets/icons/vip/vip${vipLevel}.webp`" />
    <label>VIP <span>{{ props.level }}</span></label>
    <SvgIcon :src="`@/assets/svg/vip/vipTextSvg${vipLevel}.svg`" />
  </article>
</template>

<style lang="less" scoped>
article {
	z-index: 0;
	gap: .25rem;
	width: 4rem;
	display: flex;
	height: 1.5rem;
	font-size: .625rem;
	position: relative;
	align-items: center;

	.__image {
		width: auto;
		height: 100%;
		aspect-ratio: 1/1;
	}

	span {
		font-weight: 700;
	}

	.svg__icon {
		left: 25%;
		height: 65%;
		z-index: -1;
		position: absolute;
		color: var(--ep-color-icon-brand-primary);
	}
}
</style>
