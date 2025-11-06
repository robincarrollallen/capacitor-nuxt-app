<script setup lang="ts">
import { showLanguage } from "@/widgets/languageDialog/data"

const appStore = useAppStore()
const userStore = useUserStore()
const statusStore = useStatusStore()
const layoutStore = useLayoutStore()

const locale = computed(() => appStore.locale) // Current language Code

const links = [
  { title: "Report", icon: "@/assets/svg/profile/report.svg", link: "" },
  { title: "Invite", icon: "@/assets/svg/profile/invite.svg", link: "" },
  { title: "Redeem", icon: "@/assets/svg/profile/redeem.svg", link: "" },
  { title: "Security Center", icon: "@/assets/svg/profile/security.svg", link: "" },
  { title: "Language", icon: "@/assets/svg/profile/language.svg", link: "" },
  { title: "Logout", icon: "@/assets/svg/profile/logout.svg", link: "" },
]

const tabBarHeight = computed(() => layoutStore.tabBarHeight)
const currentLanguage = computed(() => getLanguageName(locale.value, locale.value))

function handleLink(link: Recordable) {
  if (link.title === "Language") {
    showLanguage.value = true
  }
  else if (link.title === "Logout") {
    handleLogout()
  }
}

function beforeClose(action: string): Promise<boolean> {
  if (action === "cancel") {
    return Promise.resolve(true) // 取消时立即关闭
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      userStore.clearToken()
      resolve(action === "confirm") // 确认时延迟处理
      statusStore.showLoginPopup()
    }, 1000)
  })
}

function handleLogout() {
  showConfirmDialog({
    title: "Sign out",
    className: "logout-dialog",
    message: "Are you sure you want to log out?",
    beforeClose,
  })
}
</script>

<template>
  <section>
    <Navigation title="Support">
      <template #prefix>
        <Icon class="support-icon" src="@/assets/svg/customer-service.svg" />
      </template>
    </Navigation>
    <footer>
      <Navigation v-for="link in links" :key="link.title" arrow :title="link.title" @click="handleLink(link)">
        <template #prefix>
          <Icon class="link-icon" :src="link.icon" />
        </template>
        <template v-if="link.title === 'Language'" #content>
          <div class="language-item">
            <Flag :iso="locale?.split('-')[1]" class="flag-icon" />
            <span class="language-item-name">
              {{ currentLanguage }}
            </span>
          </div>
        </template>
      </Navigation>
      <article :style="{ height: `${tabBarHeight}px` }" />
    </footer>
  </section>
</template>

<style scoped lang="less">
section {
	gap: .75rem;
	display: flex;
	flex-direction: column;

	.support-icon {
		width: 1.5rem;
		color: var(--ep-color-icon-brand-primary);
	}

	footer {
		background: var(--ep-color-background-fill-surface-raised-L1);

		.link-icon {
			width: 1.5rem;
			color: var(--ep-color-icon-weaker);
		}

		.language-item {
			flex: 1;
			gap: 0.5rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;

			.flag-icon {
				border-radius: 50%;
				height: 1rem;
				width: 1rem;
			}
		}
	}
}

:global(.logout-dialog) {
	--van-border-width: 0;
	--van-text-color: var(--ep-color-text-default);
	--van-button-default-color: var(--ep-color-text-default);
	--van-dialog-confirm-button-text-color: var(--ep-color-text-default);
	--van-dialog-has-title-message-text-color: var(--ep-color-text-weaker);
	--van-dialog-background: var(--ep-color-background-fill-surface-raised-L1);
	--van-button-default-background: var(--ep-color-background-fill-surface-raised-L2);
	--van-dialog-has-title-message-padding-top: 1.5rem;
}

:global(.logout-dialog .van-dialog__footer) {
	gap: .625rem;
	padding: .5rem .875rem .875rem;
}

:global(.logout-dialog .van-dialog__footer button) {
	border-radius: .375rem;
	box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

:global(.logout-dialog .van-dialog__footer button.van-dialog__confirm) {
	background: var(--ep-dynamic-primary);
}
</style>
