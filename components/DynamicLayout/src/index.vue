<script setup lang="ts">
import type { ComponentConfig } from '@/theme/componentConfig'

const props = defineProps({
	components: {
		type: Array as PropType<ComponentConfig[]>,
		default: () => []
	},
})

</script>

<template>
  <section>
    <component
      v-for="(item, index) in props.components"
      :key="index"
      :is="defineAsyncComponent(item.component)"
      v-bind="{...item.options, components: item.children}"
    />
  </section>
</template>

<style scoped lang="less">
@media (min-width: 540px) {
  .nav-bar {
		display: none !important;
	}
}

section {
	&.column {
		display: flex;
		flex-direction: column;
	}

	&.row {
		display: flex;
		align-items: center;
	}

	&.row-reverse {
		display: flex;
		flex-direction: row-reverse;
	}

	&.scroll-y {
		overflow-x: hidden;
		overflow-y: auto;
	}

	&.flex-1 {
		flex: 1;
	}

	&.space-between {
		justify-content: space-between;
	}
}
</style>
