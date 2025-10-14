<script setup lang="ts">
import Navigation from "./modules/navigation/index.vue"
import UserInfo from "./modules/userInfo/index.vue"
import VipWrap from "@/widgets/vipWrap/index.vue"

defineOptions({
  name: "ProfilePage",
})

// Use main layout
definePageMeta({
  layout: "main",
  ssr: false,
})

const vipStore = useVipStore()
const userStore = useUserStore()

onBeforeMount(() => {
  userStore.setUser()
  vipStore.setVipInfo()
})
</script>

<template>
  <div class="profile-page">
    <UserInfo />
    <div class="profile-content">
      <VipWrap />
      <Navigation />
    </div>
  </div>
</template>

<style lang="less" scoped>
.profile-page {
	height: 100%;
	display: flex;
	flex-direction: column;

	.profile-content {
		flex: 1;
		gap: .75rem;
		display: flex;
		padding: 0 .75rem;
		overflow: hidden auto;
		flex-direction: column;
	}
}
</style>
