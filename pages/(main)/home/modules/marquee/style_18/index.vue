<script setup lang="ts">
import { useMarqueeLogic } from "../logic"

const { marqueeList } = useMarqueeLogic()
</script>

<template>
  <div class="marquee-view">
    <Icon src="@/assets/svg/broadcast.svg" class="broadcast-icon" />
    <Marquee class="marquee-content" :content="marqueeList" />
    <Icon src="@/assets/svg/message.svg" class="message-icon" />
  </div>
</template>

<style lang="less" scoped>
.marquee-view {
	display: flex;
	position: relative;
	align-items: center;
	justify-content: center;
	background: var(--ep-color-background-fill-active-disabled);
	padding: 0.25rem .5rem;
	border-radius: 0.25rem;

	&::before {
		content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 1;
    width: 2.5rem;
    height: 100%;
    border-radius: 0.25rem 0px 0px 0.25rem;
    background: linear-gradient(90deg, rgb(19, 24, 38) 46.36%, rgba(28, 35, 52, 0));
	}

	&::after {
		content: "";
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    width: 2.5rem;
    height: 100%;
    border-radius: 0px 0.25rem 0.25rem 0px;
    background: linear-gradient(270deg, rgb(19, 24, 38) 46.36%, rgba(28, 35, 52, 0));
	}

	.broadcast-icon {
		z-index: 2;
	}

	.marquee-content {
		flex: 1;
	}

	.message-icon {
		z-index: 2;
	}
}
</style>
