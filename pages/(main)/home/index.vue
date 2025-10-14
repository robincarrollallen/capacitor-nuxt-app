<script setup lang="ts">
import { type ComponentConfig, getComponentConfig } from "@/theme/componentConfig"

defineOptions({
  name: "HomePage",
})
const tenantStore = useTenantStore()
const layoutStore = useLayoutStore()

definePageMeta({
  auto: false,
  layout: "main",
  keepalive: true,
})

const tabBarHeight = computed(() => layoutStore.tabBarHeight)
const homeHeaderComponent = computed(() => getComponentConfig(tenantStore.theme, "HomeHeaderComponent")) // 首页头部组件配置
const homeContentComponent = computed(() => getComponentConfig(tenantStore.theme, "HomeContentComponent")) // 首页内容组件配置
const homeDrawerComponent = computed(() => getComponentConfig(tenantStore.theme, "HomeDrawerComponent")) // 首页抽屉组件配置

// 预先处理头部组件
const headerComponents = computed(() =>
  homeHeaderComponent.value?.children
    ?.filter((item: ComponentConfig) => item.component)
    .map((item: ComponentConfig) => ({
      ...item,
      component: defineAsyncComponent(item.component!),
    })),
)

// 预先处理内容组件
const contentComponents = computed(() =>
  homeContentComponent.value?.children
    ?.filter((item: ComponentConfig) => item.component)
    .map((item: ComponentConfig) => ({
      ...item,
      component: defineAsyncComponent(item.component!),
    })),
)

// 预先处理抽屉组件
const drawerComponent = computed(() => {
  const component = homeDrawerComponent.value?.component
  return component ? defineAsyncComponent(component) : null
})
</script>

<template>
  <div class="home-page page-safe-area" v-bind="homeContentComponent.options">
    <ClientOnly>
      <header>
        <component :is="item.component" v-for="(item, index) in headerComponents" :key="index" v-bind="{ ...item.options, components: item.children }" />
      </header>

      <main class="main-warp" v-bind="homeContentComponent.options">
        <component :is="item.component" v-for="(item, index) in contentComponents" :key="index" v-bind="{ ...item.options, components: item.children }" />
        <article :style="{ height: `${tabBarHeight}px` }" />
      </main>

      <!-- 左侧抽屉 -->
      <component :is="drawerComponent" v-bind="{ ...homeDrawerComponent.options, components: homeDrawerComponent.children }" />
    </ClientOnly>
  </div>
</template>

<style scoped lang="less">
.home-page {
	z-index: 0;
	height: 100%;
	display: flex;
	position: relative;
	flex-direction: column;

	header {
		z-index: 199;
	}

	.main-warp {
		flex: 1;
		gap: 1rem;
		display: grid;
		padding: .5rem 1rem 0;
		overflow: hidden auto;
		grid-template-columns: 100%;
	}
}
</style>
