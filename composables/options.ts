/** 下级等级选项 */
export function useSubordinateLevels() {
  const { t } = useI18n()

  return [
    {
      label: t("sort.ALL"),
      value: 0,
    },
    {
      label: t("mlmAgent.agentLevelName1"),
      value: 1,
    },
    {
      label: t("mlmAgent.agentLevelName2"),
      value: 2,
    },
    {
      label: t("mlmAgent.agentLevelName3"),
      value: 3,
    },
    {
      label: t("mlmAgent.agentLevelName4"),
      value: 4,
    },
    {
      label: t("mlmAgent.agentLevelName5"),
      value: 5,
    },
    {
      label: t("mlmAgent.agentLevelName6"),
      value: 6,
    },
  ]
}

/** 日期范围选项 */
export function useDays() {
  const { t } = useI18n()

  return [
    {
      label: t("date.today"),
      value: 0,
    },
    {
      label: t("date.yesterday"),
      value: 1,
    },
    {
      label: t("date.lastSevenDays"),
      value: 2,
    },
    {
      label: t("date.lastThirtyDays"),
      value: 3,
    },
  ]
}
