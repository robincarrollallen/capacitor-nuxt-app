<script setup lang="ts">
import VipBackground from '@/widgets/svg/vipBackground.vue'

const vipStore = useVipStore()
const vipLevel = computed(() => safeNumber(vipStore.vipInfo.currentVipLevel?.level))
</script>

<template>
	<article class="vip__wrap">
		<div>
			<VipBackground startColor="#2a2a2a" endColor="#3b3b3b"/>
			<slot name="flexible">
				<div class="vip__detail">
					<label>VIP Details</label>
					<van-icon name="arrow" />
				</div>
			</slot>
			<div class="vip__content">
				<div class="vip__level">
					<VipTag :level="vipLevel" />
					<span>Current Level</span>
				</div>

				<div class="vip__progress">
					<van-progress stroke-width=".25rem" :percentage="50" :show-pivot="false" />
					<VipTag :level="vipLevel + 1" />
				</div>

				<div class="vip__info">
					<label>Promotion Criteria</label>
					<ul>
						<li>
							<label>Deposit required:</label>
							<a>0.00</a>
							<span>(0.00/10.00)</span>
						</li>
						<li>
							<label>Required bet:</label>
							<a>0.00</a>
							<span>(0.00/10.00)</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</article>
</template>

<style lang="less" scoped>
article {

	> div {
		position: relative;
		z-index: 0;

		svg {
			left: 0;
			top: .75rem;
			width: 100%;
			z-index: -1;
			position: absolute;
		}

		.vip__detail {
			top: 0;
			right: 0;
			gap: .5rem;
			width: 30%;
			display: flex;
			position: absolute;
			aspect-ratio: 57/23;
			align-items: center;
			border-radius: 999rem;
			justify-content: center;
			background: linear-gradient(#22262e, #34383e);

			label {
				font-size: .75rem;
			}

			i {
				font-size: 1.09375rem;
				color: var(--ep-color-icon-default);
			}
		}

		.vip__content {
			padding: 1.6rem .8125rem 1.125rem;

			.vip__level {
				display: flex;
				align-items: center;
				gap: .875rem;

				.vip__tag {
					width: 5.5rem;
					height: 2.375rem;
				}

				span {
					font-weight: 700;
					font-size: .75rem;
					color: var(--ep-color-text-weaker)
				}
			}

			.vip__progress {
				gap: .5rem;
				display: flex;
				padding: 1.375rem 0 .5rem;
				align-items: center;
				justify-content: space-between;
				--van-progress-background: var(--ep-color-text-weakest);
				--van-progress-color: linear-gradient(to right, #be99ff, #7232dd);

				.van-progress {
					flex: 1;
				}
			}

			.vip__info {
				color: var(--ep-color-text-weaker);

				> label {
					font-weight: 700;
					font-size: .75rem;
				}

				ul {
					padding-left: .75rem;
					padding-top: .5rem;
					list-style-type: disc;

					li {
						font-size: .625rem;

						label {
							color: var(--ep-color-text-weakest);
						}

						a {
							color: var(--ep-color-text-warning);
							padding-left: .5rem;
							padding-right: .5rem;
						}

						span {
							color: var(--ep-color-text-highlight-white);
						}
					}
				}
			}
		}
	}
}
</style>
