import Search from "./segments/search/index.vue"
import Recent from "./segments/recent/index.vue"
import Popular from "./segments/popular/index.vue"
import Favorite from "./segments/favorite/index.vue"

export function useActivityLogic() {
  const { t } = useI18n()

  const activeTabIndex = ref(0)

  const PageType = {
    search: 1,
    popular: 2,
    recent: 3,
    favorite: 4,
  }

  const tabList = computed(() => [
    { type: "search", component: Search, icon: "@/assets/svg/segment/magnifier.svg", value: PageType.search, name: `${t("sort.SEARCH")}`, isShow: true, isShowRedPoint: false },
    { type: "popular", component: Popular, icon: "@/assets/svg/segment/popular.svg", value: PageType.popular, name: `${t("sort.POPULAR")}`, isShow: true, isShowRedPoint: false },
    { type: "recent", component: Recent, icon: "@/assets/svg/segment/recent.svg", value: PageType.recent, name: `${t("sort.RECENT")}`, isShow: true, isShowRedPoint: false },
    { type: "favorite", component: Favorite, icon: "@/assets/svg/segment/favorite.svg", value: PageType.favorite, name: `${t("sort.FAVORITE")}`, isShow: true, isShowRedPoint: false },
  ])

  onMounted(async () => {
    setTimeout(() => {
      activeTabIndex.value = 1
    }, 100)
  })

  return {
    activeTabIndex,
    tabList,
  }
}
