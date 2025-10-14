<script setup lang="ts">
import { useSidebarLogoLogic } from "./logic"

const tenantStore = useTenantStore() // Tenant store

const { closeMainLeftDrawer } = useSidebarLogoLogic()
</script>

<template>
  <section>
    <van-icon class="close-icon" name="cross" @click="closeMainLeftDrawer" />
    <van-image fit="contain" position="left center" :src="tenantStore.tenantInfo.siteLogo" :show-loading="false" />
  </section>
</template>

<style scoped lang="less">
section {
	display: flex;
	align-items: center;
	justify-content: space-between;

	i {
		padding: .5rem;
		border-radius: var(--ep-border-radius-xl, .625rem);
		background-color: var(--ep-color-background-fill-surface-raised-L2);

		@media (min-width: 540px) {
			width: 0;
			opacity: 0;
			padding: 0;
		}
	}

	div {
		height: 1.875rem;
	}
}
</style>
