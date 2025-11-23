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
  <van-image :src="imageSrc" fit="contain">
    <template #error>
      <Icon src="@/assets/icons/heart.png" />
    </template>
    <template #loading>
      <Icon src="@/assets/icons/heart.png" />
    </template>
  </van-image>
</template>

<style lang="less" scoped>
.van-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  --van-image-placeholder-background: var(--ep-color-text-weakest);

  img {
    object-fit: contain;
  }

  em {
    width: 100%;
    aspect-ratio: 1 / 1;
  }
}
</style>
