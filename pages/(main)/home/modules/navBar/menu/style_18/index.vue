<script setup lang="ts">
import { useNavBarMenuLogic } from "../logic"

const props = defineProps({
  icon: {
    type: String,
    default: () => "@/assets/svg/menu.svg",
  },
})

const { showMainLeftDrawer } = useNavBarMenuLogic()
</script>

<template>
  <Icon :src="props.icon" class="menu-svg" @click="showMainLeftDrawer" />
</template>

<style scoped lang="less">
.menu-svg {
	cursor: pointer;
	border-radius: var(--ep-border-radius-s, .25rem);
}
</style>
