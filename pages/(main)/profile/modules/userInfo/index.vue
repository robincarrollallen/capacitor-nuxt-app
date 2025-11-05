<script setup lang="ts">
const router = useRouter()
const vipStore = useVipStore()
const userStore = useUserStore()
const tenantStore = useTenantStore()
const { t } = useI18n()

const vipLevel = computed(() => safeNumber(vipStore.vipInfo.currentVipLevel?.level))
const user = computed(() => userStore.user) // user info

// TODO: 模拟提现相关信息验证接口
async function handleWithdraw() {
  showLoading()
  await delay(1000)
  closeToast()
  showTextPopup(t("popup.tips06"), () => {
    router.push("/withdraw/password")
  })
}
</script>

<template>
  <header>
    <!-- Background -->
    <Image src="@/assets/images/profile/yellow-dark-top-bg.webp" />
    <!-- User Info -->
    <div class="user-info">
      <van-image
        src="https://upload-dev.b83.xyz/avatar/first_male_1.jpg"
        radius="50%"
      />
      <div class="account-info">
        <div class="name">
          <label>{{ user.userName }}</label>
          <VipTag :level="vipLevel" />
        </div>
        <div class="id">
          <label>ID: {{ user.userId }}</label>
          <SvgIcon src="@/assets/svg/copy.svg" size="1rem" @click="copy(user.userId)" />
        </div>
      </div>
    </div>
    <!-- Balance -->
    <div class="balance-warp">
      <div class="balance-item">
        <label>Balance</label>
        <div class="balance-content">
          <a>{{ tenantStore.merchantCy }}</a>
          <AnimatedNumber :decimals="2" :value="10000" />
          <van-icon name="replay" />
        </div>
      </div>
      <div class="balance-item">
        <label>The bonus received today</label>
        <p>18.97</p>
      </div>
    </div>
    <!-- Assets Handle -->
    <div class="assets-handle">
      <Button>
        <SvgIcon src="@/assets/svg/pig.svg" />
        <span>Deposit</span>
      </Button>
      <Button @click="handleWithdraw">
        <SvgIcon src="@/assets/svg/wallet.svg" />
        <span>Withdraw</span>
      </Button>
    </div>
  </header>
</template>

<style scoped lang="less">
header {
	padding: 2rem .75rem 1rem;
	position: relative;

	> .__image {
		top: 0;
		left: 0;
		width: 100%;
		height: auto;
		position: absolute;
		pointer-events: none;
	}

	.user-info {
		gap: 1rem;
		display: flex;
		align-items: center;

		.van-image {
			width: 3.25rem;
			height: 3.25rem;
		}

		.account-info {
			display: flex;
			flex-direction: column;
			justify-content: center;

			.name {
				gap: .5rem;
				display: flex;
				align-items: center;

				label {
					font-size: .875rem;
					font-weight: 600;
				}
			}

			.id {
				gap: .75rem;
				display: flex;
				align-items: center;

				label {
					font-size: .75rem;
					color: var(--ep-color-text-weaker);
				}

				.svg__icon {
					width: .875rem;
					color: var(--ep-color-icon-brand-primary);
					cursor: pointer;
				}
			}
		}
	}

	.balance-warp {
		gap: .75rem;
		display: flex;
		margin-bottom: 1.09375rem;
		justify-content: space-around;
		border-bottom: 1px solid var(--ep-color-border-default);

		.balance-item {
			flex: 1;
			z-index: 0;
			display: flex;
			overflow: hidden;
			padding-top: 1rem;
			position: relative;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			padding-bottom: .625rem;

			&::before {
				width: 50%;
				content: '';
				top: 2.5rem;
				z-index: -1;
				height: 2rem;
				position: absolute;
				filter: blur(1.5rem);
				background-color: var(--ep-color-background-fill-glow-primary-opacity-40);
			}

			label {
				font-size: .625rem;
				color: var(--ep-color-text-weaker);
			}

			.balance-content {
				gap: .25rem;
				width: 100%;
				display: flex;
				font-size: 1rem;
				font-weight: 700;
				align-items: center;
				padding: 0 .5rem 0 2rem;

				a {
					color: var(--ep-color-text-warning);
				}

				span {
					flex: 1;
				}

				i {
					color: var(--ep-color-icon-default);
				}
			}

			p {
				font-size: 1rem;
			}
		}
	}

	.assets-handle {
		gap: .75rem;
		display: flex;

		button {
			gap: .375rem;
			height: 2.5rem;
			font-weight: 600;
			font-size: .875rem;
			color: var(--ep-color-text-default);
			background: var(--ep-color-background-fill-surface-raised-L2);
			box-shadow: 0 -26px 20px -24px var(--ep-color-background-fill-glow-secondary-opacity-40) inset;

			i {
				width: 1.875rem;
				color: var(--ep-color-icon-brand-primary);
			}
		}
	}
}
</style>
