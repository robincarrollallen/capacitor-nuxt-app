<script setup lang="ts">

</script>

<template>
	<section>
		<Button class="login-btn">
			{{ $t('main.login') }}
		</Button>
		<Button class="register-btn">
			{{ $t('main.signUp') }}
		</Button>
	</section>
</template>

<style scoped lang="less">
section {
	gap: 1rem;
	display: none;
	grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
