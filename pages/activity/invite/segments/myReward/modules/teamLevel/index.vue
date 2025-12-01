<script setup lang="ts">
import { Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/vue"
import { levelBgImages, pagination } from "./data"

const { data } = await useFetch("/api/agency/info")

const agentStore = useAgentStore()
const tenantStore = useTenantStore()

const totalTeamCount = computed(() => (data.value.info?.histDirectCnt || 0) + (data.value.info?.histTeamCnt || 1)) // Total team count
const totalTeamBet = computed(() => Number(data.value.info?.histBet || 50000)) // Total team bet
const currentLevel = computed(() => data.value.info?.agencyLevel || 1) // Current level
const agentLevelConfig = computed(() => {
  try {
    return JSON.parse(agentStore.agencyConfig.templateInfo.config)
  }
  catch {
    return []
  }
})

const totalComm = computed(() => {
  let comm = 0
  agentStore.agencyConfig.inviteConfig?.commissionLevelConfig.forEach((item: any) => {
    comm += item.rewardAmount / 100
  })
  return comm
})

/**
 * Calculate first recharge rebate
 */
function computeFirstRechargeComm(level: number) {
  const config = agentStore.agencyConfig.inviteConfig?.firstRechargeRebateLevelConfig
  const comm = config?.find((item: any) => item.level === level && item.subLevel === 1)
  return formatMoneyToLocal((comm?.rate || 0) / 100)
}
</script>

<template>
  <Swiper :modules="[Pagination]" :pagination="pagination" :slides-per-view="1.1" :slides-per-group="1" :initial-slide="0">
    <SwiperSlide v-for="(item, index) in agentLevelConfig" :key="item.name">
      <div class="team-wrap">
        <div class="team-info" :style="{ background: `url(${levelBgImages[item.level - 1]}) no-repeat 0 0 / 100% 100%` }">
          <span class="team-title">
            {{ item.level === currentLevel ? $t('activity.myTeam') : $t('activity.nextLevel') }}
          </span>
          <div class="team-level-wrap">
            <div class="team-level-logo">
              <img :src="`/images/agent/mlm-level${item.level - 1}.png`">
            </div>
            <div class="team-level-content">
              <div class="team-level">
                <span class="team-label">{{ $t('mlmAgent.agentLevel') }}</span>
                <span class="team-value">{{ `Lv.${item.level}` }}</span>
                <span class="team-detail" @click="navigateTo('/record/subordinate')">
                  {{ $t('activity.agent28') }}
                  <!-- <IonIcon class="chevron-forward" :icon="chevronForward" /> -->
                </span>
              </div>
              <div v-if="index === 0" class="team-current-text">
                {{ $t('agent.achievedLevel') }}
              </div>
              <div v-else class="team-progress">
                <div class="team-content">
                  <span class="team-label">{{ $t('key.teamCount') }}</span>
                  <van-progress :show-pivot="false" :percentage="totalTeamCount >= item.count ? 100 : totalTeamCount / safeNumber(item.count) * 100" />
                  <div class="team-count-wrap">
                    <span>{{ totalTeamCount }}</span>/<span>{{ item.count || 0 }}</span>
                  </div>
                </div>
                <div class="team-content">
                  <span class="team-label">{{ $t('agent.totalBet') }}</span>
                  <van-progress :show-pivot="false" :percentage="totalTeamBet >= safeNumber(item.totalTeamBet) ? 100 : totalTeamBet / safeNumber((item.totalTeamBet)) * 100" />
                  <div class="team-count-wrap">
                    <span>{{ formatMoneyToLocal(totalTeamBet) }}</span>/<span>{{ safeNumber(item.totalTeamBet) / 100 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="reward-wrap">
          <div class="rebate-info">
            <div class="rebate-value">
              {{ `${$t('activity.upto')} ${(item.rats[0]?.rat || 0) / 100}%` }}
            </div>
            <div>{{ $t('activity.betComm') }}</div>
          </div>
          <div class="rebate-line-wrap">
            <div class="rebate-line" />
          </div>
          <div class="rebate-info">
            <div class="rebate-value">
              {{ `${$t('activity.rebate')} ${computeFirstRechargeComm(item.level)}%` }}
            </div>
            <div>{{ $t('task.NewbieTask:FirstRecharge') }}</div>
          </div>
          <div class="rebate-line-wrap">
            <div class="rebate-line" />
          </div>
          <div class="rebate-info">
            <div class="rebate-value">
              {{ `${$t('activity.upto')} ${tenantStore.merchantCy} ${totalComm}` }}
            </div>
            <div>{{ $t('tags.inviteComm') }}</div>
          </div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<style lang="less" scoped>
.swiper {
	width: 100%;
	--swiper-pagination-bottom: 0;

	:deep(.swiper-pagination) {

		.swiper-pagination-bullet {
			--swiper-pagination-bullet-inactive-color: var(--ep-color-text-weaker, --my-card-bg-gradient);
			--swiper-pagination-bullet-size: .5rem;
			--swiper-pagination-bullet-height: .25rem;

			&.swiper-pagination-bullet-active {
				background: var(--ep-agent-color-highlight-primary, var(--ep-color-icon-selected)) !important;
				--swiper-pagination-bullet-width: 1.25rem;
				--swiper-pagination-bullet-border-radius: 1rem;
			}
		}
	}

	.swiper-slide {
		&:last-child {
				padding-right: .625rem;

				.reward-wrap {
					margin-top: -.125rem;
				}
			}

		.team-wrap {
			font-size: .625rem;
			padding: 0 0 1.25rem .625rem;

			.team-info {
				z-index:1;
				width: 100%;
				display: flex;
				color: #fff;
				text-align: center;
				position: relative;
				flex-direction: column;
				padding: .125rem .75rem 0;
				justify-content: space-between;
				aspect-ratio: 8/3;

				.team-title {
					font-weight: 600;
					font-size: .875rem;
					padding: 0 3rem;
				}

				.team-level-wrap {
					gap: .75rem;
					display: flex;
					text-align: left;
					align-items: center;

					.team-level-logo {
						width: 4.25rem;
						padding: .8125rem;
						background: url('@/assets/svg/agent/level-icon-bg.svg') no-repeat;
						background-size: 100% 100%;
					}

					.team-level-content {
						flex: 1;

						.team-level {
							display: flex;
							align-items: center;
							padding: .5rem 0;
							font-size: .875rem;
							border-bottom: 1px solid #ffffff1A;

							.team-value {
								flex: 1;
								font-weight: 600;
								padding-left: .25rem;
								color: var(--ep-color-text-success);
							}

							.team-detail {
								gap: .25rem;
								display: flex;
								cursor: pointer;
								align-items: center;
								border-radius: 999rem;
								padding-right:.75rem;
								color: var(--ep-color-text-info, --accent-color-blue, #5c82f5);

								.chevron-forward {
									font-size: 1.25rem;
								}
							}
						}

						.team-current-text {
							height: 3.375rem;
							line-height: 3.375rem;
							color: var(--ep-color-text-weak);
						}

						.team-progress {
							gap: 1rem;
							display: flex;
							padding: .25rem 0 .5rem;
							align-items: center;
							color: rgba(255, 255, 255, 0.6);

							.team-content {
								display: flex;
								flex-direction: column;
								gap: .25rem;
								width: 50%;
								padding-right: .5rem;

								.team-label {
									width: 6rem;
									white-space: nowrap;
									color: rgba(255, 255, 255, 0.4);
								}

								.van-progress {
									--van-progress-height: .375rem;
									--van-progress-color: var(--ep-agent-color-highlight-primary, var(--ep-color-icon-brand-primary));
									--van-progress-background: #ffffff33;
								}
							}
						}
					}
				}
			}

			.reward-wrap {
				display: flex;
				position: relative;
				margin: -0.0625rem 1.25rem;
				padding: 1rem .5rem .5rem;
				justify-content: space-between;
				border-bottom-left-radius: 1rem;
				border-bottom-right-radius: 1rem;
				background: var(--ep-color-background-fill-surface-raised-L1);

				.rebate-info {
					display: flex;
					text-align: center;
					align-items: center;
					flex-direction: column;
					color: var(--ep-color-text-weaker);

					&:first-child {
						padding-right: .4375rem;
					}

					&:nth-child(3) {
						padding: 0 .4375rem;
					}

					&:last-child {
						padding-left: .4375rem;
					}

					.rebate-value {
						font-weight: 600;
						color: var(--ep-color-text-success);
					}
				}

				.rebate-line-wrap {
					flex: 1;
					display: flex;
					text-align: center;
					justify-content: center;

					.rebate-line {
						width: 1px;
						height: 100%;
						background: var(--ep-color-border-default);
					}
				}
			}
		}
	}
}
</style>
