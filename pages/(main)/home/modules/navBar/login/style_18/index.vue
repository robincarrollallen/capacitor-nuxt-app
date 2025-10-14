<script setup lang="ts">
</script>

<template>
  <div class="login-btn-wrap">
		<Button class="login-btn">{{ $t('main.login') }}</Button>
		<Button class="register-btn">{{ $t('main.signUp') }}</Button>
	</div>
</template>

<style scoped lang="less">
.login-btn-wrap {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	.login-btn {
		width: 3.75rem;
		height: 1.875rem;
		font-size: 0.75rem;
		border-radius: .375rem;
		background: transparent;
		border: 1px solid var(--ep-color-text-default);
	}

	.register-btn {
		width: 3.75rem;
		height: 1.875rem;
		font-size: 0.75rem;
		border-radius: .375rem;
		background: linear-gradient(90deg, var(--ep-color-background-fill-gradients-tertiary-a, #3A8EE3) -27.5%, var(--ep-color-background-fill-gradients-tertiary-b, #CF3F5B) 127.5%);
	}
}
</style>
