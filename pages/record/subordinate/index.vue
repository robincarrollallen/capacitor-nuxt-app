<script setup lang="ts">
import { Select } from "@/components/Select"
import { useSubordinateLevels } from "@/hooks/options"

defineOptions({
  name: "SubordinatePage",
})

const levels = useSubordinateLevels()

const level = ref(0)
const date = ref(new Date()) // 日期
const selectRef = ref(null)

/** 确认选择事件 */
function onSelect(value: Recordable) {
  level.value = value.value
  selectRef.value.showPopover = false
}

/** 点击选项框事件 */
function onChange(value: string | number) {
  console.log(value)
}

/** 日期选择确认事件 */
function onConfirm(value: Date) {
  date.value = value
}
</script>

<template>
  <div class="subordinate-page">
    <ClientOnly>
      <NavigateBar :title="$t('mlmAgent.nextLevelData')" left-arrow />
      <div class="select-bar">
        <Select ref="selectRef" :options="levels" @select="onSelect" @change="onChange" />
        <CalendarPicker :date="date" @confirm="onConfirm">
          <div class="select-button">
            <span class="calendar-text">{{ $t('activity.selectDate') }}</span>
            <span>{{ date.toLocaleDateString() }}</span>
            <SvgIcon class="calendar-icon" url="@/assets/svg/calendar.svg" />
          </div>
        </CalendarPicker>
      </div>
    </ClientOnly>
  </div>
</template>

<style lang="less" scoped>
.subordinate-page {
	height: 100%;
	display: flex;
	flex-direction: column;

	.select-bar {
		font-size: var(--ep-font-size-s, 0.75rem);
		gap: 0.75rem;
		display: grid;
		padding: 0.75rem;
		grid-template-columns: repeat(2, 1fr);

			.select-button {
				display: flex;
				padding: 0.5rem;
				align-items: center;
				justify-content: space-between;
				border-radius: var(--ep-border-radius-s, 0.25rem);
				background-color: var(--ep-color-background-fill-surface-raised-L1);

				.calendar-icon {
					color: var(--ep-color-icon-weaker);
					width: 0.75rem;
				}

				.calendar-text {
					color: var(--ep-color-text-weaker);
				}
			}
	}
}
</style>
