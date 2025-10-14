<script setup lang="ts">
const props = defineProps({
	outAvatar: {
		type: String,
		default: '',
	},
})

const basicAvatar = '/svg/user-default-avatar.svg'

const userStore = useUserStore()

const userPhoto = computed(() => userStore.user?.avatar || userStore.defaultAvatar || basicAvatar)
</script>

<template>
	<div v-if="userStore.user?.userId" class="log-in-box">
		<van-image
			class="account-icon"
			:src="userPhoto"
		/>
	</div>
	<div v-else-if="!isEmpty(props.outAvatar)" class="log-out-box">
		<SvgIcon class="log-out-icon" :src="props.outAvatar"/>
		<label>
			Welcome
		</label>
	</div>
</template>

<style scoped lang="less">
.log-in-box {
	width: 2rem;
	height: 2rem;
	overflow: hidden;
	border-radius: 50%;
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
