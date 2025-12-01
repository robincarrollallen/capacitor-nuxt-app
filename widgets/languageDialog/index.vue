<script setup lang="ts">
import { showLanguage } from "./data"

const appStore = useAppStore() // Application store
const systemStore = useSystemStore() // System store
const statusStore = useStatusStore() // Status store
const tenantStore = useTenantStore() // Tenant store

const locale = computed(() => appStore.locale) // Current language Code
const showLanguageDialog = computed(() => systemStore.screenWidth >= 540 || statusStore.showMainLeftDrawer) // Whether to show language dialog

/**
 * Change language
 * @param lang Language code
 */
function changeLanguage(lang: any) {
  appStore.setLocale(lang) // Set language
  showLanguage.value = false // Close language selection
}
</script>

<template>
  <van-dialog v-if="showLanguageDialog" v-model:show="showLanguage" class-name="language-dialog" :title="$t('label.chooseLanguage')" :show-confirm-button="false" close-on-click-overlay>
    <div class="language-dialog-list">
      <div v-for="lang in tenantStore.tenantInfo.appLanguage" :key="lang" class="change-language-item" @click="changeLanguage(lang)">
        <p class="change-language-item-name">
          {{ getLanguageName(lang, locale) }}
        </p>
        <van-checkbox v-if="locale === lang" :checked="true" />
      </div>
    </div>
  </van-dialog>
</template>

<style scoped lang="less">
:global(.van-dialog.language-dialog) {
	--van-text-color: var(--ep-color-text-default);
  background: var(--ep-color-background-fill-surface-raised-L1);
}

.language-dialog-list {
	color: var(--ep-color-text-default);
  padding: 0.5rem 1rem;

  .change-language-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid var(--ep-color-border-default);

    .change-language-item-name {
      padding: 0.5rem 0;
    }

		.van-checkbox {
			--van-checkbox-checked-icon-color: transparent;

			:deep(.van-checkbox__icon--checked) {
				--van-checkbox-size: 1rem;

				.van-icon-success {
					background: var(--ep-dynamic-primary);
					border-radius: .25rem;
				}
			}
		}
  }
}
</style>
