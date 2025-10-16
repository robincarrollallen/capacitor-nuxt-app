<script setup lang="ts">
defineOptions({
  name: "SecurityPage",
})
</script>

<template>
  <div class="security-page page-safe-area">
    <NavigateBar :title="$t('label.securityCenter')" left-arrow />
  </div>
</template>

<style lang="less" scoped>
.security-page {
  padding: 1rem;
}
</style>
