<script setup lang="ts">
import { useDays } from "~/composables/options"
import activityRecordHistory from "@/public/data/activityRecordHistory.json"

const dayList = useDays()

const list = ref([])
const date = ref(null)
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)

const params = reactive({
  page: 1,
  pageSize: 15,
})

// TODO: 模拟网络请求
async function onLoad() {
  loading.value = true

  await delay(1500)

  const result = activityRecordHistory

  if (params.page === 1) {
    list.value = result.recordList
    finished.value = false
  }
  else if (params.page < 3) {
    finished.value = false
    list.value = list.value.concat(result.recordList)
  }
  else {
    const lastList = result.recordList.slice(0, 3)
    list.value = list.value.concat(lastList)
    finished.value = true
  }

  loading.value = false
  refreshing.value = false
  params.page = params.page + 1
}

/** 下拉刷新事件 */
function onRefresh() {
  params.page = 1
  finished.value = false // 设置加载完成状态, 如果出现两个加载图标<下拉加载和加载更多>可以设置为true(加载完数据后再判断设置为false)
  refreshing.value = true // 设置下拉刷新状态, 确保空列表状态下不会显示空数据图标
  onLoad() // 加载数据(下拉刷新)
}

/** 日期选择确认事件 */
function onSelect(value: Recordable) {
  date.value = value.value
}
</script>

<template>
  <div class="unclaimed-page">
    <div class="option-bar">
      <Select :options="dayList" :label="$t('activity.selectDate')" @select="onSelect" />
      <div class="bonus-wrap">
        <span class="bonus-text">{{ `${$t('viewsAssets.bonus')}: ` }}</span>
        <span class="bonus-value">{{ `0.00` }}</span>
      </div>
    </div>
    <RollList :list="list" :loading="loading" :finished="finished" :refreshing="refreshing" @load="onLoad" @refresh="onRefresh">
      <template #default="{ item, index }">
        <ul :class="{ even: index % 2 !== 0 }">
          <li class="unclaimed-item">
            {{ formatTimeByDay(item.time) }}
          </li>
          <li class="unclaimed-item">
            {{ item.activityName }}
          </li>
          <li class="unclaimed-item">
            {{ item.minAwardCount && item.maxAwardCount ? `${item.minAwardCount} ~ ${item.maxAwardCount}` : item.awardCount }}
          </li>
          <li class="unclaimed-item">
            {{ item.awardType }}
          </li>
        </ul>
      </template>
    </RollList>
  </div>
</template>

<style lang="less" scoped>
.unclaimed-page {
	flex: 1;
	height: 100%;
	display: flex;
	flex-direction: column;

	.option-bar {
		font-size: var(--ep-font-size-s, 0.75rem);
		gap: 0.75rem;
		display: flex;
		padding: 0.75rem;

		.bonus-wrap {
			flex: 1;
			gap: 0.125rem;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			font-size: var(--ep-font-size-l, 1rem);

			.bonus-value {
				color: var(--ep-color-text-warning);
				font-weight: var(--ep-font-weight-bold, 700);
			}
		}
	}

	ul {
		display: flex;
		padding: .625rem;
		font-size: .75rem;
		color: var(--ep-color-text-weaker);

		&.even {
			background-color: var(--ep-color-background-fill-surface-lowered);
		}

		li {
			width: 25%;
			min-height: 2rem;
			display: flex;
			align-items: center;
			justify-content: center;

			&:nth-child(1) {
				color: var(--ep-color-text-weak);
			}

			&:nth-child(3) {
				color: var(--ep-color-text-warning);
			}
		}
	}
}
</style>
