<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NavigationProps } from './props'

defineOptions({
	name: 'Navigation'
})

const props = defineProps(NavigationProps)

const router = useRouter()

</script>

<template>
  <article>
		<slot name="prefix"></slot>
		<slot name="title">
			<label>{{ props.title }}</label>
		</slot>
		<slot name="content">
			<span>{{ props.content }}</span>
		</slot>
		<slot name="suffix">
			<van-icon name="arrow" v-if="props.arrow" />
		</slot>
	</article>
</template>

<style scoped lang="less">
article {
	gap: .75rem;
	display: flex;
	padding: .75rem;
	align-items: center;
	border-radius: .375rem;
	justify-content: space-between;
	color: var(--ep-color-text-default);
	background: var(--ep-color-background-fill-surface-raised-L1);

	label {
		font-weight: 500;
	}

	span {
		flex: 1;
		text-align: right;
	}

	i {
		color: var(--ep-color-icon-weaker);
	}
}
</style>
