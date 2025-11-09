<script setup lang="ts">
interface Props {
  src?: string
}

const props = withDefaults(defineProps<Props>(), {
  src: "",
})

const config = useRuntimeConfig()

const imageSrc = computed(() => {
  if (props.src.startsWith("/")) {
    const src = props.src.slice(1)
    return `${config.app.baseURL || "/"}${src}`
  }
  return props.src
})
</script>

<template>
  <van-image :src="imageSrc" />
</template>

<style lang="less" scoped>

</style>
