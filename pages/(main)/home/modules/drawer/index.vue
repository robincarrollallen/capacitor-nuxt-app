<script setup lang="ts">
import type { ComponentConfig } from "@/theme/componentConfig"
import SideBar from "@/widgets/sidebar/index.vue"

const props = defineProps({
  components: {
    type: Array as PropType<ComponentConfig[]>,
    default: () => [],
  },
})

const statusStore = useStatusStore()
</script>

<template>
  <van-popup
    v-model:show="statusStore.mainLeftDrawerVisible"
    round
    position="left"
    teleport="#__main"
    overlay-class="sidebar-overlay"
  >
    <SideBar :components="props.components" />
  </van-popup>
</template>

<style lang="less" scoped>
@import './index.less';
</style>
