<script setup lang="ts">
import { ActivityListData, generatePreviewText, getActivityDefaultName } from "./data"
import { useActivityListLogic } from "./logic"
import { ZNameType } from "@/enums"

const activityStore = useActivityStore()

const { activityList, ActivityStatus, language, toActivity } = useActivityListLogic()

onMounted(() => {
  activityStore.activityList = ActivityListData.activityList

  activityList.value = activityStore.activityList.map((item: Recordable) => {
    if (item.nameType === ZNameType.enum.DEFAULT && item.nameParams) {
      try {
        const nameParams = JSON.parse(`${item.nameParams}`)
        item.name = getActivityDefaultName(language.value, item.type, nameParams.variablesValue)
      }
      catch (error) {
        console.warn(error)
      }
    }
    if (item.previewText) {
      try {
        const preTextParams = JSON.parse(`${item.previewText}`)
        item.previewText = generatePreviewText(language.value, preTextParams.variablesValue)
      }
      catch {
        console.warn(item.previewText)
      }
    }
    return item
  })
})
</script>

<template>
  <div class="activity-list">
    <div v-for="item in activityList" :key="item.id" class="activity-list-item" @click="toActivity(item)">
      <Button class="activity-list-item-poster" :style="`background: url(${item.bannerBackground}) center/cover`" shiny>
        <div class="activity-list-item-rule">
          <p v-for="(text, index) in (item.previewText.split('\n'))" :key="index">
            {{ text }}
          </p>
        </div>
        <van-image :src="item.bannerLogo" />
      </Button>
      <div class="activity-list-item-content">
        <div class="activity-list-item-content-title">
          {{ item.name }}
        </div>
        <Button class="activity-list-item-content-preview">
          {{ ActivityStatus[item.status] }}
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.activity-list {
	gap: .5rem;
	height: 100%;
	display: flex;
	padding: .5rem;
	overflow: hidden auto;
	flex-direction: column;

	.activity-list-item {
		font-weight: 600;
		font-size: .875rem;

		.activity-list-item-poster {
			height: 7.5rem;
			border-end-start-radius: 0;
			border-end-end-radius: 0;

			.activity-list-item-rule {
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: flex-start;
			}

			.van-image {
				width: 6.25rem;
				height: 6.25rem;
			}
		}

		.activity-list-item-content {
			gap: .5rem;
			display: flex;
			height: 3.625rem;
			align-items: center;
			padding: 0 .5rem;
			justify-content: space-between;

			.activity-list-item-content-title {
				flex: 1;
				color: var(--color-text-primary);
			}

			.activity-list-item-content-preview {
				width: auto;
				border-radius: .25rem;
				background-color: var(--ep-color-background-fill-surface-raised-L1, var(--color-bg-200));
				color: var(--color-primary-800);
			}
		}
	}
}
</style>
