<script setup lang="ts">
import { useMarqueeLogic } from "../logic"

const props = defineProps({
  icons: {
    type: Array as PropType<string[]>,
    default: () => [new URL("@/assets/icons/broadcast-25.png", import.meta.url).href, "@/assets/svg/magnifier-25.svg"],
  },
})

const { marqueeList } = useMarqueeLogic()
</script>

<template>
  <div class="marquee-wrap">
    <div class="marquee-view">
      <Icon :src="props.icons[0]" class="broadcast-icon" />
      <Marquee class="marquee-content" :content="marqueeList" />
    </div>
    <Icon :src="props.icons[1]" class="message-icon" />
  </div>
</template>

<style lang="less" scoped>
.marquee-wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.75rem;

	.marquee-view {
		flex: 1;
		width: 0;
		display: flex;
		position: relative;
		align-items: center;
		justify-content: center;
		background: var(--ep-color-background-fill-gradients-secondary-a);
		padding: 0.25rem .5rem;
		height: 2.5rem;
		border-radius: var(--ep-border-radius-m, 0.375rem);
		border: 1px solid var(--ep-color-border-default);

		&::before {
			content: "";
			position: absolute;
			top: 0px;
			left: 0px;
			z-index: 1;
			width: 3.5rem;
			height: 100%;
			border-radius: 0.25rem 0px 0px 0.25rem;
			background: linear-gradient(90deg, var(--ep-color-background-fill-gradients-secondary-a) 50%, transparent);
		}

		&::after {
			content: "";
			position: absolute;
			top: 0px;
			right: 0px;
			z-index: 1;
			width: 2.5rem;
			height: 100%;
		}

		.broadcast-icon {
			width: 2.5rem;
			padding: .5rem;
			z-index: 2;
			position: absolute;
			left: 0;
			top: 0;
		}

		.marquee-content {
			flex: 1;
		}

	}

	.message-icon {
		width: 2.5rem;
		padding: .5rem;
		background: var(--ep-color-background-fill-surface-raised-L1);
		border-radius: var(--ep-border-radius-m, 0.375rem);
		border: 1px solid var(--ep-color-border-default);
	}
}
</style>
