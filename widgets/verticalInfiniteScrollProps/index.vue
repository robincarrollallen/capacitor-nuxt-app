<script setup lang="ts">
interface VerticalInfiniteScrollProps {
  data: any[]
  itemHeight: number // 单个项目的高度
  speed?: number // 滚动速度（像素/秒）
  containerHeight?: number // 容器高度
  onItemVisible?: (item: any, index: number) => void // 当项目进入可视区域时的回调
}

const props = withDefaults(defineProps<VerticalInfiniteScrollProps>(), {
  speed: 30, // 默认每秒滚动30像素
})

// 定义插槽
defineSlots<{
  default: (props: { item: any, index: number }) => any
}>()

// 定义暴露的方法
defineExpose({
  pause,
  resume,
})

// 响应式状态
const isPausedRef = ref(false)
const frameRef = ref<number>(0)
const lastTimeRef = ref<number>(0)
const translateY = ref(0)

// 至少复制2份数据确保无缝循环
const repeatedData = computed(() => [...props.data, ...props.data])
const singleSetHeight = computed(() => props.data.length * props.itemHeight)

// 计算实际容器高度
const actualContainerHeight = computed(() => {
  const height = props.containerHeight && props.containerHeight < singleSetHeight.value
    ? props.containerHeight
    : singleSetHeight.value
  return height
})

// 动画循环函数
function animate(currentTime: number) {
  if (!lastTimeRef.value) {
    lastTimeRef.value = currentTime
  }

  // 计算时间差（秒）
  const deltaTime = (currentTime - lastTimeRef.value) / 1000
  lastTimeRef.value = currentTime

  if (!isPausedRef.value) {
    // 计算新位置（向上移动，所以是负值）
    const newY = translateY.value - props.speed * deltaTime

    // 当滚动超过一组数据的高度时，重置到起始位置
    if (Math.abs(newY) >= singleSetHeight.value) {
      translateY.value = 0
    }
    else {
      translateY.value = newY
    }
  }

  // 继续下一帧
  frameRef.value = requestAnimationFrame(animate)
}

// 暂停控制
function pause() {
  isPausedRef.value = true
}

// 恢复控制
function resume() {
  isPausedRef.value = false
  lastTimeRef.value = 0 // 重置时间，避免跳跃
}

// 生命周期
onMounted(() => {
  frameRef.value = requestAnimationFrame(animate)
})

onUnmounted(() => {
  if (frameRef.value) {
    cancelAnimationFrame(frameRef.value)
  }
})

// 监听 speed 变化，重启动画
watch(() => props.speed, () => {
  if (frameRef.value) {
    cancelAnimationFrame(frameRef.value)
  }
  lastTimeRef.value = 0
  frameRef.value = requestAnimationFrame(animate)
})
</script>

<template>
  <div
    class="vertical-infinite-scroll"
    :style="{
      height: `${actualContainerHeight}px`,
      overflow: 'hidden',
    }"
  >
    <div
      class="scroll-content"
      :style="{
        transform: `translateY(${translateY}px)`,
        willChange: 'transform',
      }"
    >
      <div
        v-for="(item, idx) in repeatedData"
        :key="`${item.userId || item.id || idx}-${Math.floor(idx / data.length)}`"
        :style="{ height: `${itemHeight}px` }"
        class="scroll-item"
      >
        <slot :item="item" :index="idx % data.length" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vertical-infinite-scroll {
  position: relative;
}

.scroll-content {
  transition: none;
}

.scroll-item {
  display: flex;
  align-items: center;
}
</style>
