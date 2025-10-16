<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value?: string // 单向接收值
    length?: number // 密码长度
    modelValue?: string // 双向绑定值
    autofocus?: boolean // 自动聚焦
  }>(),
  {
    value: "",
    length: 6,
    modelValue: "",
    autofocus: false,
  },
)
const emit = defineEmits(["input", "update:modelValue"]) // 定义传递事件方法<事件名称>

const focusIndex = ref(-1) // 光标位置
const inputRef = ref<HTMLInputElement | null>(null) // 输入框ref
const password = ref(props.modelValue || props.value) // 密码

// 监听密码获取数组(用于显示密码点)
const passwordArray = computed(() => {
  const arr = Array(props.length).fill(null)
  password.value.toString().split("").forEach((char: string, index: number) => {
    arr[index] = char
  })
  return arr // 遍历密码赋值予显示密码点数组
})

onMounted(async () => {
  await nextTick()
  if (props.autofocus)
    inputRef.value?.focus()
})

/** 输入事件回调 */
function handleInput() {
  const passwordStr = password.value.toString() // 获取密码
  if (!/^\d*$/.test(passwordStr)) {
    password.value = passwordStr.slice(0, password.value.length - 1) // 检查输入的值是否是数字, 如果不是清除输入的值或者设置为上一次的值
  }
  if (passwordStr.length > props.length) {
    password.value = passwordStr.slice(0, props.length) // 截取密码长度
  }
  focusIndex.value = password.value.length // 设置光标位置
  emit("input", password.value.toString()) // 传送事件(父组件使用@input监听)
  emit("update:modelValue", password.value.toString()) // 传送事件(父组件使用v-model接收)
}

/** 聚焦事件回调 */
function handleFocus() {
  focusIndex.value = password.value.length // 设置光标位置(获取焦点)
}

/** 失焦事件回调 */
function handleBlur() {
  focusIndex.value = -1 // 设置光标位置(失去焦点)
}
</script>

<template>
  <article>
    <div
      v-for="(item, index) in passwordArray" :key="index" class="item"
      :class="{ focus: focusIndex === index }"
    >
      <div v-if="item !== null" class="dot" />
      <div v-else-if="focusIndex === index" class="cursor" />
    </div>
    <input
      ref="inputRef" v-model="password" :autofocus="autofocus" inputmode="numeric" maxlength="6"
      @input="handleInput" @focus="handleFocus" @blur="handleBlur"
    >
  </article>
</template>

<style scoped lang="less">
article {
  padding: 0;
  width: 100%;
  display: flex;
  position: relative;
  border: 1px solid transparent;
  justify-content: space-between;

  .item {
	display: flex;
	height: 2.75rem;
	aspect-ratio: 1;
	position: relative;
	align-items: center;
	justify-content: center;
	border-radius: var(--border, var(--ep-border-radius-s, .25rem));
	background: var(--background, var(--ep-color-background-fill-surface-raised-L2)); /* 密码框 */

	&.focus {
	  border: 1px solid var(--color-focus, var(--ep-color-border-brand)); /* 密码点(聚焦) */
	}
  }

  .dot {
	width: 10px;
	height: 10px;
	border-radius: 50%;
	background: var(--color, var(--ep-color-text-default)); /* 密码点(显示) */
  }

  .cursor {
	width: 1px;
	height: 1rem;
	position: absolute;
	background: var(--color, var(--ep-color-text-default)); /* 光标 */
	animation: blink 1s infinite;
  }

  input {
	inset: 0;
	opacity: 0; /* input(透明) */
	position: absolute;
	caret-color: transparent;
	-webkit-text-fill-color: transparent;
  }
}

/* 光标闪烁 */
@keyframes blink {
  0% {
    opacity: 1;
  }

  49% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 0;
  }
}
</style>
