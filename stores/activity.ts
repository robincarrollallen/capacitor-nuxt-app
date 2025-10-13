import agentActivityDetailData from "public/data/agentActivityDetail.json"
import lobbySidebarBannerListData from "public/data/lobbySidebarBannerList.json"

export const useActivityStore = defineStore("activity", () => {
  const sideBarActivityData = ref(lobbySidebarBannerListData)
  const agentActivityDetail = ref(agentActivityDetailData)
  const activityList = ref<Recordable[]>([])

  /**
   * @description 翻译活动名称
   */
  const translateActivityName = (type: string, val: string | number) => {
    const { $i18n } = useNuxtApp()

    if (type === "ACTIVITY") {
      const { type: activeType, name } = activityList.value?.find((item: any) => item.id === val) || {}
      if (activeType === "Custom")
        return name
      return activeType ? $i18n.t(`activity1.${activeType}`) : ""
    }
    if (type === "CODE") {
      const code = camelCase(`${val}`) || "mainInicio"
      return $i18n.t(`activity1.${code}`) || ""
    }
  }

  const sideBarActivityList = computed(() => sideBarActivityData.value.map((item) => {
    const { id, iconUrlType, defaultIconUrl, customIconUrl, imageUrl, name, targetType, targetValue: targetValueString, showName, shortName } = item
    let value: number | string = ""
    let valueType: string = ""
    if (targetType === "internal") {
      const targetValue = JSON.parse(targetValueString)
      value = handleInlineNavigation(targetValue)
      valueType = handleSideValueType(targetValue)
    }
    else {
      value = targetValueString
    }

    let newName = shortName
    if (valueType === "ACTIVITY") {
      const activity = activityList.value?.find((item: any) => item.id === value)
      if (!activity) {
        return null
      }
    }
    if (["ACTIVITY", "CODE"].includes(valueType)) {
      newName = shortName || translateActivityName(valueType, value)
    }

    return {
      id,
      name,
      value,
      showName,
      valueType,
      image: imageUrl,
      shortName: newName,
      logoSrc: iconUrlType === "default" ? defaultIconUrl : customIconUrl,
      type: handleSidebarJumpType(targetType),
    }
  }).filter(Boolean))

  return { sideBarActivityList, agentActivityDetail, activityList }
})
