<script setup lang="ts">
const props = defineProps({
  outAvatar: {
    type: String,
    default: "",
  },
})

const basicAvatar = "/svg/user-default-avatar.svg"

const userStore = useUserStore()
const tenantStore = useTenantStore()

const userPhoto = computed(() => userStore.user?.avatar || userStore.defaultAvatar || basicAvatar)
</script>

<template>
  <div v-if="userStore.user?.userId" class="log-in-box">
    <Icon
      class="account-icon"
      :src="userPhoto"
    />
    <div class="balance-wrap">
      <div>
        <Icon src="@/assets/icons/assets-25.webp" class="assets-icon" />
        <span>Balance</span>
      </div>
      <strong>{{ tenantStore.merchantCy }} <AnimatedNumber :decimals="2" :value="10000" /></strong>
    </div>
  </div>
  <div v-else-if="!isEmpty(props.outAvatar)" class="log-out-box">
    <Icon class="log-out-icon" :src="props.outAvatar" />
    <label>
      Welcome
    </label>
  </div>
</template>

<style scoped lang="less">
.log-in-box {
	gap: 0.5rem;
	display: flex;
	align-items: center;

	.account-icon {
		width: 2.5rem;
		height: 2.5rem;
		overflow: hidden;
		border-radius: 50%;
	}

	.balance-wrap {

		div {
			display: flex;
			align-items: center;
			gap: 0.25rem;

			.assets-icon {
				width: 1.25rem;
				height: 1.25rem;
			}

			span {
				font-size: 0.75rem;
			}
		}

		strong {
			font-size: 0.875rem;
			color: var(--ep-color-text-warning);
		}
	}
}

.log-out-box {
	gap: .5rem;
	display: flex;
	align-items: center;

	.log-out-icon {
		padding: 0.5rem;
		width: 2rem;
		height: 2rem;
		border-radius: 43%;
		background: var(--ep-dynamic-primary);
		box-shadow: 4px 0px 11px 0px var(--ep-color-background-fill-glow-primary-opacity-40);
	}

	label {
		font-size: var(--label-font-size, 1rem);
		font-weight: var(--label-font-weight, 600);
	}
}
</style>
