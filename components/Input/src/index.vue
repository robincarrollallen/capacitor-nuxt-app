<script setup lang="ts">
import type { FieldType } from "vant/lib/field/types"
import { INPUT_TYPE, VAN_ICON, V_MODEL_KEY } from "@/enums"

interface Props {
  type?: string
  label?: string
  error?: boolean // 是否显示错误信息
  border?: boolean
  required?: boolean
  underline?: boolean
  modelValue?: string // 父组件支持v-model 或 v-model:value 传入值
  errorMessage?: string
  tabs?: {
    text: string
    value: string | number
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  border: true,
  placeholder: "",
})

const emits = defineEmits([
  V_MODEL_KEY.VALUE, // 父组件支持v-model 或 v-model:value 接收值
  V_MODEL_KEY.VERIFIED, // 输入成功
])

const slots = useSlots()

const showPassword = ref(false)
const emptyError = ref(false)

/** Input Value */
const value = computed({
  get() {
    return props.modelValue ?? ""
  },
  set(value: string) {
    emits(V_MODEL_KEY.VALUE, value)
  },
})
/** Input Type */
const inputType = computed(() => {
  if (props.type === INPUT_TYPE.PASSWORD) {
    return showPassword.value ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD
  }
  return props.type as FieldType
})
/** Is Has Prefix */
const hasPrefix = computed(() => {
  return !!slots.prefix || props.label
})
/** Input Right Icon */
const rightIcon = computed(() => {
  if (props.type === INPUT_TYPE.PASSWORD) {
    return showPassword.value ? VAN_ICON.EYE_O : VAN_ICON.CLOSED_EYE
  }
  return ""
})
/** Input Verified Error */
const verifiedError = computed(() => {
  if (props.errorMessage) {
    return props.errorMessage
  }

  if (value.value) {
    const result = validateInput(value.value, props.type)
    return result === true ? "" : result
  }

  return ""
})
/** Input Errored State */
const errored = computed(() => {
  return props.error && !!verifiedError.value && !!value.value
})
/** Input Verified */
const verified = computed(() => {
  return props.error && !!value.value && !verifiedError.value
})

watch(verified, (newValue: boolean, oldValue: boolean) => {
  if (newValue && !oldValue) {
    emits(V_MODEL_KEY.VERIFIED, true)
  }
})

watch(errored, (newValue: boolean, oldValue: boolean) => {
  if (newValue && !oldValue) {
    emits(V_MODEL_KEY.VERIFIED, false)
  }
})

/** Handle blur */
function handleBlur() {
  if (props.required && !value.value) {
    emptyError.value = true
  }
}

/** Handle focus */
function handleFocus() {
  emptyError.value = false
}

/** Handle click right icon */
function handleClickRightIcon() {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <van-field
    v-model="value"
    v-bind="$attrs"
    :class="{ verified, errored, prefix: hasPrefix, border }"
    :right-icon="rightIcon"
    :border="underline"
    :error="emptyError"
    :type="inputType"
    @blur="handleBlur"
    @focus="handleFocus"
    @click-right-icon="handleClickRightIcon"
  >
    <template #label>
      <slot name="prefix">
        {{ label ? `${label}` : '' }}
      </slot>
    </template>
  </van-field>
  <p v-if="error" :class="{ error: !!verifiedError }">
    <van-icon :name="VAN_ICON.WARNING_O" /> {{ verifiedError }}
  </p>
</template>

<style lang="less" scoped>
.van-field {
	--van-field-input-text-color: var(--ep-color-text-default);
	--van-cell-vertical-padding: var(--vertical-padding, .75rem);
	--van-field-placeholder-text-color: var(--ep-color-text-weaker);
	--van-cell-horizontal-padding: var(--horizontal-padding, .75rem);
	--van-cell-background: var(--ep-color-background-fill-surface-lowered);
	border-radius: var(--border-radius, var(--ep-border-radius-m, .375rem));
	border-color: var(--border-color, var(--ep-color-border-default));
	border-style: var(--border-style, solid);
	border-width: var(--border-width, 0);

	&.border {
		border-width: var(--border-width, 1px);
	}

	&.errored {
		border-color: var(--ep-color-border-danger);
	}

	&.verified {
		border-color: var(--ep-color-border-success);
	}

	&.prefix {
		:deep(.van-field__label) {
			margin-right: var(--van-field-label-margin-right);
		}
	}

	:deep(.van-field__label) {
		width: auto;
		margin-right: 0;
	}
}

p {
	opacity: 0;
	white-space: nowrap;

	&.error {
		opacity: 1;
		color: var(--ep-color-text-danger);
		font-size: var(--ep-font-size-s, 0.75rem);
	}
}
</style>
