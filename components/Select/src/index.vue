<script setup lang="ts">
import { EMIT_KEY } from '@/enums'

const emits = defineEmits([EMIT_KEY.SELECT, EMIT_KEY.CHANGE])

const props = defineProps<{
	label?: string,
	options: {
		label: string
		value: string | number
	}[]
}>()

const triggerWidth = ref(0)
const triggerRef = ref(null)
const showPopover = ref(false)
const currentValue = ref(props.options[0]?.value)

const onSelect = (item: any) => {
	showPopover.value = false
	currentValue.value = item.value
	emits(EMIT_KEY.SELECT, item)
}

/** 点击选项框事件: 更新选项框宽度 */
const updateWidth = () => {
	if (triggerRef.value) {
		triggerWidth.value = triggerRef.value.offsetWidth
	}
}

/** 监听选项框显示状态: 触发change事件 */
watch(showPopover, (newVal) => {
	emits(EMIT_KEY.CHANGE, newVal)
})
</script>

<template>
	<van-popover
		overlay
		trigger="click"
		class="__select"
		:show-arrow="false"
		placement="bottom-start"
		v-model:show="showPopover"
		:overlay-style="{background: 'transparent'}"
		:style="{ '--trigger-width': triggerWidth + 'px', }"
	>
		<div class="option-item" :class="{active: currentValue == item.value}" v-for="item in props.options" :key="item.value" @click="onSelect(item)">
			{{ item.label }}
		</div>
		<template #reference>
			<ul ref="triggerRef" @click="updateWidth" v-bind="$attrs">
				<slot>
					<label v-if="props.label">{{ `${props.label}: ` }}</label>
					<li >{{ props.options[currentValue]?.label }}</li>
					<van-icon :class="{active: showPopover}" name="arrow-down" color="var(--ep-color-icon-weaker)" />
				</slot>
			</ul>
		</template>
	</van-popover>
</template>

<style lang="less" scoped>
.__select {
	text-align: center;
	min-width: var(--trigger-width, 200px);
}

.option-item {
	font-size: var(--ep-font-size-s, 0.75rem);
	color: var(--ep-color-text-weaker);
	padding: 0.5rem 0;
	background-color: var(--ep-color-background-fill-surface-raised-L1);

	&.active {
		color: var(--ep-color-text-default);
		background-color: var(--ep-color-background-fill-surface-raised-L2);
	}
}

ul {
	gap: 0.25rem;
	display: flex;
	padding: 0.5rem;
	align-items: center;
	justify-content: space-between;
	border-radius: var(--ep-border-radius-s, 0.25rem);
	background-color: var(--ep-color-background-fill-surface-raised-L1);

	label {
		color: var(--ep-color-text-weaker);
	}

	li {
		flex: 1;
	}

	i {
		transition: all 0.3s ease;

		&.active {
			transform: rotate(180deg);
		}
	}
}
</style>
