<script setup lang="ts">
import { useActivityAgentLogic } from "./logic"
import ShareView from "./modules/share/index.vue"
import RewardView from "./modules/reward/index.vue"
import ConditionView from "./modules/condition/index.vue"
import RuleView from "./modules/rule/index.vue"

defineOptions({
  name: "AgentPage",
})

const { agentMediaList, rewardList, conditionType, allConditions, ruleContent, rewardShowMode, rewardType, activityId } = useActivityAgentLogic()

// 模拟不同活动奖励模式，替代 rewardShowMode
const rewardMode = computed(() => {
  if (activityId.value === "661") {
    return "RECEIVE"
  }
  else if (activityId.value === "3770") {
    return "RED_PACKET"
  }
  return "BOX"
})
</script>

<template>
  <div class="agent-page page-safe-area">
    <ClientOnly>
      <NavigateBar :title="$t('agent.center')" left-arrow>
        <template #right>
          <SvgIcon url="@/assets/svg/record.svg" class="agent-nav-record" />
        </template>
      </NavigateBar>
      <div class="agent-poster">
        <!-- <div class="agent-poster-gift" /> -->
        <div class="agent-poster-treasure" />
      </div>
      <div class="agent-content">
        <div class="agent-content-wrap">
          <!-- 快速分享 -->
          <ShareView :agent-media-list="agentMediaList" />
          <!-- 奖励列表 -->
          <RewardView :reward-list="rewardList" :reward-type="rewardType" :reward-show-mode="rewardMode" />
          <!-- 获取奖励条件 -->
          <ConditionView :condition-type="conditionType" :all-conditions="allConditions" />
          <!-- 活动规则 -->
          <RuleView :rule-content="ruleContent" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped>
.agent-page {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden auto;

	.agent-poster {
		width: 100%;
		min-height: 18.25rem;
		background-image: url('@/assets/images/activity/agent/bg-poster.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		background-position: center;

		.agent-poster-gift {
			width: 100%;
			height: 100%;
			background-image: url('@/assets/images/activity/agent/gift-poster.png');
			background-size: auto 9.875rem;
			background-repeat: no-repeat;
			background-position: center 7.75rem;
		}

		.agent-poster-treasure {
			width: 100%;
			height: 100%;
			background-image: url('@/assets/images/activity/agent/treasure-poster.png');
			background-size: auto 10rem;
			background-repeat: no-repeat;
			background-position: center 7.75rem;
		}
	}

	.agent-content {
		padding: 0 1.25rem 1.25rem;

		.agent-content-wrap {
			gap: 1.5rem;
			color: #fff;
			display: flex;
			position: relative;
			border-top-width: 0;
			padding: 2rem 0 .5rem;
			background: #2A2371;
			flex-direction: column;
			border: 4px solid #797AF1;
			box-shadow: 0px 0px 0px 4px #3852EB;

			&::after {
				content: '';
				position: absolute;
				bottom: -.75rem;
				left: -1rem;
				background-image: url('@/assets/svg/agent-corner.svg');
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: center;
				height: 4.75rem;
				width: 2.25rem;
				transform: scaleX(-1);
			}

			&::before {
				content: '';
				position: absolute;
				bottom: -.75rem;
				right: -1rem;
				background-image: url('@/assets/svg/agent-corner.svg');
				background-size: 100% auto;
				background-repeat: no-repeat;
				background-position: center;
				height: 4.75rem;
				width: 2.25rem;
			}
		}
	}
}
</style>
