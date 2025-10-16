<script setup lang="ts">
import LoginPopup from "@/widgets/loginPopup/index.vue"
import IosPwaGuideSheet from "@/widgets/iosPwaGuideSheet/index.vue"
import { getComponentConfig } from "@/theme/componentConfig"

const layoutStore = useLayoutStore()
const tenantStore = useTenantStore()
const Tabbar = defineAsyncComponent(getComponentConfig(tenantStore.theme, "TabbarComponent"))

const tabbarRef = ref<ComponentPublicInstance<typeof Tabbar> | null>(null)

let resizeObserver: ResizeObserver | null = null

// 监听tabbar高度变化
watchEffect(() => {
  if (tabbarRef.value?.$el) {
    const element = tabbarRef.value.$el

    // 如果已有观察器，先断开
    if (resizeObserver) {
      resizeObserver.disconnect()
    }

    resizeObserver = new ResizeObserver(() => {
      const tabbarHeight = element.getBoundingClientRect().height
      layoutStore.setTabBarHeight(tabbarHeight)
    })

    resizeObserver.observe(element)
  }
})

// 在组件卸载时清理
onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <NuxtLayout name="default">
    <div id="__main">
      <NuxtPage keepalive />
    </div>
    <Tabbar ref="tabbarRef" />
    <LoginPopup />
    <IosPwaGuideSheet />
  </NuxtLayout>
</template>

<style scoped lang="less">
#__main {
	flex: 1;
	position: relative;
	height: 100%;
}
</style>
