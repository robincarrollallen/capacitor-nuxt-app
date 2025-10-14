<script setup lang="ts">
import type { ComponentConfig } from "@/theme/componentConfig"

defineOptions({
  name: "SideBar",
})

const props = defineProps({
  components: {
    type: Array as PropType<ComponentConfig[]>,
    default: () => [],
  },
})

// 预先处理侧边栏组件
const sidebarComponents = computed(() =>
  props.components
    ?.filter((item: ComponentConfig) => item.component)
    .map((item: ComponentConfig) => ({
      ...item,
      component: defineAsyncComponent(item.component!),
    })),
)
</script>

<template>
  <aside>
    <component :is="item.component" v-for="(item, index) in sidebarComponents" :key="index" v-bind="{ ...item.options, components: item.children }" />
  </aside>
</template>

<style scoped lang="less">
aside {
	gap: 1rem;
  width: 20rem;
	height: 100%;
	display: flex;
  padding: .75rem;
	max-width: 320px;
	flex-direction: column;
	color: var(--ep-color-text-default);
  background-color: var(--ep-color-background-fill-body-default);
	padding-top: env(safe-area-inset-top);
}

@media (min-width: 540px) and (max-width: 1023px) {
  aside {
    width: 10rem;
    height: 100%;
		padding: .5rem;
		max-width: 160px;

		.close-icon {
			display: none;
		}

		.login-btn-wrap {
			display: grid;
		}

    .language-option-wrap {
      .language-content {
        justify-content: center;
      }

      .language-btn {
        display: none;
      }
    }

		.activity-recommend-wrap {
			.activity-recommend-list {
				.activity-recommend-item {
					&:nth-child(even) {
						display: none;
					}
				}
			}
		}
  }
}

@media (min-width: 1024px) {
	aside {
		padding: .5rem;

		.close-icon {
			display: none;
		}

		.login-btn-wrap {
			display: grid;
		}
	}
}
</style>
