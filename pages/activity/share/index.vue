<script setup lang="ts">
defineOptions({
	name: 'SharePage'
})

const agentStore = useAgentStore()

const onShareTabClick = ({ title }) => showToast(title)
</script>

<template>
	<div class="share-page">
		<ClientOnly>
			<NavigateBar title="Invite" left-arrow/>
			<main class="main-container">
				<div class="share-card">
					<div class="share-url-warp">
						<div class="url-title">Invite link:</div>
						<div class="url-link">https://tg3-gray.7-v-s-8.com/?pid=575718350</div>
						<SvgIcon url="@/assets/svg/copy.svg" class="copy-icon" @click="copy('https://tg3-gray.7-v-s-8.com/?pid=575718350')"/>
					</div>
					<div class="quick-share-warp">
						<div class="share-title">Quick share</div>
						<van-tabs class="share-tabs" @click-tab="onShareTabClick">
							<van-tab v-for="item in agentStore.shareConfig?.software" :key="item.name">
								<template #title><SvgIcon class="share-icon" :url="`@/assets/svg/share/${item.name.toLocaleLowerCase()}.svg`" /></template>
							</van-tab>
						</van-tabs>
					</div>
					<div class="details-warp">
            <div class="details-content">
              <div class="bet-register-count">
                My direct subordinates
                <span class="count-text">{{ `${0} ${$t('Person')}` }}</span>
                {{ `(${$t('Valid')}` }}
                <span class="valid-text">{{  `${0} ${$t('Person')})` }}</span>
              </div>
              <div class="details-btn"> {{ `${$t('Details')} >` }}</div>
            </div>
          </div>
				</div>
				<van-progress
					stroke-width=".5rem"
					:percentage="75"
					pivot-text="紫色"
					pivot-color="#7232dd"
					:show-pivot="false"
					color="linear-gradient(to right, #be99ff, #7232dd)"
				/>
			</main>
		</ClientOnly>
	</div>
</template>

<style lang="less" scoped>
@import '@/assets/css/variables.less';

.share-page {
  height: 100%;
	display: flex;
	flex-direction: column;

	.main-container {
		flex: 1;
		padding: 1rem;

		.share-card {
			background: var(--ep-color-background-fill-surface-raised-L1);
			border-radius: .5rem;
			padding: 1rem;

			.share-url-warp {
				display: flex;
				align-items: center;
				justify-content: center;
				padding-bottom: .75rem;
				border-bottom: 1px solid var(--ep-color-border-default);

				.url-title {
					font-weight: 500;
				}

				.url-link {
					@text-ellipsis();
					color: var(--ep-color-text-brand-primary);
					flex: 1;
				}

				.copy-icon {
					transform: scale(.9);
				}
			}

			.quick-share-warp {
				padding: 1rem 0;
				border-bottom: 1px solid var(--ep-color-border-default);

				.share-tabs {
					--van-tab-active-text-color: var(--ep-color-text-brand-primary);
					--van-tab-text-color: var(--ep-color-text-navigation-default);
					--van-tabs-nav-background: transparent;
					padding-top: 0.5rem;

					:deep(.van-tabs__nav.van-tabs__nav--line.van-tabs__nav--complete) {
						--van-tabs-bottom-bar-height: 0;
						padding: 0;
						gap: 0.5rem;

						.van-tab.van-tab--line.van-tab--grow {
							padding: 0;

							.share-icon {
								width: 2rem;
								height: 2rem;
							}
						}
					}
				}
			}

			.details-warp {
				display: flex;
				align-items: center;
				padding-top: 1rem;

				.details-content {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.bet-register-count {
						flex: 1;
						font-size: 0.875rem;

						.count-text {
							color: var(--ep-color-text-success);
						}
					}

					.details-btn {
						color: var(--ep-color-text-brand-primary);
					}
				}
			}
		}
	}
}
</style>
