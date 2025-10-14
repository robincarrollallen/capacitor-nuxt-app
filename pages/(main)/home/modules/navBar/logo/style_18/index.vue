<script setup lang="ts">
import { useNavBarLogoLogic } from '../logic'

const { tenantInfo } = useNavBarLogoLogic()
</script>

<template>
  <van-image class="site-logo" :src="tenantInfo.siteLogo" :show-loading="false" v-bind="$attrs"/>
</template>

<style scoped lang="less">
.site-logo {
	flex: 1;
	height: 1.875rem;
}
</style>
