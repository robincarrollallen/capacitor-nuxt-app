<script setup lang="ts">
import { computed } from 'vue'
import { flagProps } from './props'

defineOptions({
	name: 'Flag'
})

const props = defineProps(flagProps)

const flagIconClass = computed(() => {
	return `fi-${props.iso.toLowerCase()} fis`
})
</script>
<template>
  <span
    class="fi"
    :class="flagIconClass"
    :title="title || iso"
  />
</template>

<style lang="less">
@import "./flag.less";
</style>
