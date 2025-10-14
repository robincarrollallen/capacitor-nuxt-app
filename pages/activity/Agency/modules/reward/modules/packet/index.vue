<script setup lang="ts">
import { ZDisplayMode, ZRewardType } from '../../../../data'
import { useOpenBoxHandle } from '../../logic'
import { REWARD_ICON } from './data'

const props = defineProps<{
	rewardList: Recordable[]
	rewardType: keyof typeof ZRewardType.enum
	rewardShowMode: keyof typeof ZDisplayMode.enum
}>()

const list = ref(props.rewardList)

const { openBoxHandle } = useOpenBoxHandle()
</script>

<template>
	<div class="agent-reward-list-content">
		<div class="agent-reward-list-item" v-for="item in list" :key="item.uuid">
			<div class="agent-reward-list-icon" :class="{ light: item.isMeet, animate: item.showOpenAni }">
				<img v-if="item.showOpenAni" :src="REWARD_ICON[`${props.rewardShowMode}_animate`]"/>
				<img v-else :class="{ opening: item.opening }" :src="REWARD_ICON[`${props.rewardShowMode}_${item.isOpen}`]" @click="openBoxHandle(item, 'agency')"/>
			</div>
			<div class="agent-reward-list-amount" :class="{ light: item.isMeet, random: props.rewardType === ZRewardType.enum.RANDOM && !item.isOpen, opened: item.isOpen, animate: item.showOpenAni }">
				<span v-if="props.rewardType === ZRewardType.enum.FIXED || item.isOpen">{{ item.rewardAmount }}</span>
				<div v-else>
					<p>{{ item.rewardAmount.split('~')[0] }}</p>
					<p>{{ `~${item.rewardAmount.split('~')[1]}` }}</p>
				</div>
			</div>
			<div class="agent-reward-list-condition">
				<div>
					{{ $t('activity.agent9') }}
					<span>{{ item.userCount }}</span>
					{{ $t('activity.agent7') }}
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.agent-reward-list-content {
	width: calc(100% + 1.5rem);
	margin-left: -.75rem;
	background-image: url('@/assets/svg/bg-agent-reward-stage.svg');
	background-repeat: repeat-y;
	background-size: 100% 8.25rem;
	background-position: top left;
	display: grid;
	padding: 0 .75rem .25rem;
	grid-template-columns: repeat(4, 1fr);
	gap: 2.25rem 0;

	.agent-reward-list-item {
		color: rgba(255, 255, 255, 0.6);
		font-size: .625rem;
		padding: 0 .375rem;
		margin-top: -1.875rem;
		aspect-ratio: 15/22;

		.agent-reward-list-icon {
			height: 4.5rem;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			padding: 0 1rem .5rem;
			position: relative;
			z-index: 1;

			&::after {
				content: "";
				position: absolute;
				top: 86%;
				width: 40%;
				aspect-ratio: 7/1;
				background: rgba(0, 0, 0, 0.5);
				border-radius: 50%;
				filter: blur(.1rem);
				z-index: -1;
			}

			&.light {
				padding-left: 0.75rem;
				padding-right: 0.75rem;

				&::before {
					z-index: -1;
					content: "";
					position: absolute;
					bottom: -45%;
					width: 175%;
					aspect-ratio: 1/1;
					background-image: url('@/assets/icons/activity/agent/bg-light-reward.png');
					background-size: 100% 100%;
					animation: spin 5s linear infinite;
				}

				&.animate {
					padding-left: 0;
					padding-right: 0;

					img {
						animation: none;
						cursor: default;
						animation: shake-scale-opening 2s ease-out forwards;
					}
				}

				img {
					cursor: pointer;
					animation: shake-status 1s linear infinite;

					&.opening {
						animation:
							shake-rotate-start 200ms linear infinite,
							shake-scale-start 1s linear infinite;
					}
				}
			}

			img {
				width: 100%;
			}
		}

		.agent-reward-list-amount {
			width: 100%;
			line-height: 1.5rem;
			background-image: url('@/assets/icons/activity/agent/bg-amount.png');
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position: 0 0;

			&.random {
				background-image: none;
			}

			&.light {
				color: #fff;

				&.animate {
					color: #fc974c;
					background-image: url('@/assets/icons/activity/agent/bg-amount-light.png');
				}
			}

			&.opened {
				color: #53C154;
			}

			p {
				line-height: normal;
			}
		}

		.agent-reward-list-condition {

			span {
				color: var(--ep-color-text-success);
			}
		}
	}
}
</style>
