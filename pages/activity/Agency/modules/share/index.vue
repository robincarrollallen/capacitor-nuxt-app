<script setup lang="ts">
const props = defineProps<{
	agentMediaList: SoftwareType
}>()

const shareTabsRef = ref() // 分享图标切换组件
const disableTab = ref(false) // 定义导航标签禁用状态

let isDown: boolean
let startX: number
let scrollLeft: number

/**
 * @description 鼠标按下事件
 */
function handleMouseDown(e: any) {
	console.log('handleMouseDown', e.pageX, e.currentTarget.offsetLeft)
	isDown = true
	startX = e.pageX - e.currentTarget.offsetLeft
	scrollLeft = e.currentTarget.scrollLeft
}
function handleMouseUp() {
	isDown = false
	disableTab.value = false
}
function handleMouseLeave() {
	isDown = false
	disableTab.value = false
}
function handleMouseMove(e: any) {
	if (!isDown)
		return
	console.log('>>>>>>>>>>>>>>', e.pageX, e.currentTarget.offsetLeft)
	e.preventDefault()
	disableTab.value = true
	const x = e.pageX - e.currentTarget.offsetLeft
	const walk = (x - startX)
	e.currentTarget.scrollLeft = scrollLeft - walk
}

</script>

<template>
	<div class="agent-media">
		<div class="agent-media-title">
			<span>{{ $t('activity.agent2') }}</span>
		</div>
		<div class="agent-media-link">
			<van-tabs ref="shareTabsRef" class="share-tabs" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mouseleave="handleMouseLeave" @mousemove="handleMouseMove">
				<van-tab v-for="item in props.agentMediaList" :key="item.name">
					<template #title><SvgIcon class="share-icon" :url="`@/assets/svg/share/first/${item.name.toLowerCase()}.svg`" /></template>
				</van-tab>
			</van-tabs>
			<div class="share-url-warp">
				<div class="url-title">Invite link ：</div>
				<div class="url-link">https://tg3-gray.7-v-s-8.com/?pid=575718350</div>
				<SvgIcon url="@/assets/svg/copy.svg" class="copy-icon" @click="copy('https://tg3-gray.7-v-s-8.com/?pid=575718350')"/>
			</div>
			<div class="details-warp">
				<div class="details-content">
					<div class="bet-register-count">
						My direct subordinates
						<span class="count-text">{{ `${0}` }}</span>
						{{ `${$t('Person')} (${$t('Valid')}` }}
						<span class="count-text">{{ `${0} ` }}</span>
						<span class="valid-text">{{ `${$t('Person')})` }}</span>
					</div>
					<Button> {{ `${$t('Details')} >` }}</Button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.agent-media {
	font-size: .75rem;
	position: relative;

	.agent-media-title {
		background-image: url('@/assets/images/activity/agent/bar-title.png');
		background-size: 100% auto;
		background-repeat: no-repeat;
		background-position: 0 0;
		width: calc(100% + 2.875rem);
		aspect-ratio: 120/23;
		position: absolute;
		top: -3.125rem;
		left: -1.4375rem;
		font-weight: 700;
		text-shadow:
			-1px -1px 0 #E64021,
			1px -1px 0 #E64021,
			-1px  1px 0 #E64021,
			1px  1px 0 #E64021;

		span {
			height: 57%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.agent-media-link {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: .3125rem;
		padding: 0 .4375rem;

		.agent-media-link-icons {
			width: 100%;
			overflow: auto hidden;
			gap: .625rem;
			display: flex;
			flex-wrap: nowrap;

			.agent-media-link-icon {
				min-width: 2.1875rem;
				min-height: 2.1875rem;
			}
		}

		.share-tabs {
			--van-tabs-nav-background: linear-gradient(90deg, rgba(38, 57, 156, 0) 0%, #3345A3 50%, rgba(38, 57, 156, 0) 100%);
			--van-tabs-line-height: auto;

			:deep(.van-tabs__nav.van-tabs__nav--line.van-tabs__nav--complete) {
				--van-tabs-bottom-bar-height: 0;
				padding: .75rem 0;
				gap: 0.625rem;

				.van-tab.van-tab--line.van-tab--grow {
					padding: 0;

					.share-icon {
						width: 2.1875rem;
						height: 2.1875rem;
					}
				}
			}
		}

		.share-url-warp {
			padding: 0 .25rem;
			display: flex;
			align-items: center;
			justify-content: center;
			background: linear-gradient(90deg, rgba(38, 57, 156, 0) 0%, #3345A3 50%, rgba(38, 57, 156, 0) 100%);

			.url-title {
				font-weight: 500;
			}

			.url-link {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				color: var(--ep-color-text-brand-primary);
				flex: 1;
			}

			.copy-icon {
				transform: scale(.9);
			}
		}

		.details-warp {
			display: flex;
			margin-top: 1rem;
			padding: .875rem;
			align-items: center;
			border-radius: .25rem;
			background: var(--color-background-fill-glow-primary-opacity-40, #0A77DA66);

			.details-content {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.bet-register-count {
					flex: 1;
					padding-right: .5rem;

					.count-text {
						color: var(--ep-color-text-warning);
					}
				}

				button {
					width: auto;
					border-radius: .25rem;
					padding: .25rem .75rem;
				}
			}
		}
	}
			}
</style>
