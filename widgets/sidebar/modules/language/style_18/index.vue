<script setup lang="ts">
import { showLanguage } from '@/widgets/languageDialog/data'

const appStore = useAppStore() // Application store

const locale = computed(() => appStore.locale) // Current language Code

const currentLanguage = computed(() => getLanguageName(locale.value, locale.value).split(' ')[0]) // Current language Name

</script>

<template>
	<section @click="showLanguage = true">
		<span>
			<Flag :iso="locale.split('-')[1]" class="flag-icon" />
			<span class="language-text">{{ currentLanguage }}</span>
		</span>
		<div>
			<van-icon name="arrow-down" />
		</div>
	</section>
</template>

<style scoped lang="less">
@import '../index.less';
</style>
