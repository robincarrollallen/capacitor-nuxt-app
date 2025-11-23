<script setup lang="ts">
interface Props {
  item: Recordable
  radius?: string
  border?: string
}

const props = withDefaults(defineProps<Props>(), {
  item: () => ({}),
  radius: ".5rem",
  border: ".125rem",
})
</script>

<template>
  <article :style="{ borderRadius: props.radius, padding: props.border }">
    <Image :src="props.item.logo" :radius="props.radius" fit="cover" lazy-load />
  </article>
</template>

<style scoped lang="less">
article {
  width: 100%;
  height: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: linear-gradient(331deg,#fff 2.58%,rgba(255,255,255,0),#fff 97.72%);
}
</style>
