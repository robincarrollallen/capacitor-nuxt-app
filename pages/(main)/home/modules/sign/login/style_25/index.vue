<script setup lang="ts">
const statusStore = useStatusStore()

const userStore = useUserStore()
</script>

<template>
	<div v-if="userStore.user?.userId">
		<Button>{{ $t("main.entrar") }}</Button>
	</div>
	<div v-else class="login-out-box">
		<Button @click="statusStore.showLoginPopup()">{{ $t("main.login") }}</Button>
		<Button class="register" @click="statusStore.showRegisterPopup()">{{ $t("main.signUp") }}</Button>
	</div>
</template>

<style scoped lang="less">
.login-out-box {
	display: flex;
	gap: .5rem;
	justify-content: center;
	align-items: center;
}

button {
	--padding-top: .25rem;
	--padding-bottom: .25rem;
	--padding-start: .75rem;
	--padding-end: .75rem;

	font-weight: var(--ep-font-weight-medium, 600);
	background: var(--ep-dynamic-primary);
	border-radius: var(--ep-border-radius-s, .25rem);
	border: var(--ep-border-width-surface-default, .125rem) var(--ep-border-style-surface-default, solid) var(--ep-color-btn-level-2-border, #19CC10);

	&.register {
		background: var(--ep-color-btn-level-3-bg);
		border-color: var(--ep-color-btn-level-3-border, #FFC754);
	}
}
</style>
