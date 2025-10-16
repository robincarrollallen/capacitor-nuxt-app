<script setup lang="ts">
defineOptions({
  name: "DepositPage",
})

// Use main layout
definePageMeta({
  layout: "main",
})

const tabs = [
  {
    text: "标签 1",
    value: "1",
  },
  {
    text: "标签 2",
    value: "2",
  },
  {
    text: "标签 3",
    value: "3",
  },
]
</script>

<template>
  <div class="deposit-page page-safe-area">
    <ClientOnly>
      <SliderTabs :tabs="tabs" />
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped>
</style>
