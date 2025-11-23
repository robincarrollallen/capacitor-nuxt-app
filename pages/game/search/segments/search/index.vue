<script setup lang="ts">
const list = ref([])
</script>

<template>
  <RollList :list="list" finished empty-icon="@/assets/svg/no-game.svg" :empty-text="$t('label.noGame')" empty-icon-color="var(--ep-color-text-weaker)" empty-text-color="var(--ep-color-text-weaker)" />
</template>

<style scoped lang="less"></style>
