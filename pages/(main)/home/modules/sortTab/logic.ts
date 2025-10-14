export function useSortTabLogic(props: Recordable = {}) {
  const { t } = useI18n()
  const gameStore = useGameStore()
  const systemStore = useSystemStore()
  const tenantStore = useTenantStore()

  const active = ref(0)

  const isGameCategory = computed(() => tenantStore.tenantInfo?.homeNavType === "GameType")
  const gameWarpComponent = defineAsyncComponent(props.components[0]?.component) // Game warp component
  const homeHotList = computed(() => gameStore.homeHotList) // Home hot game list
  const tabsOffsetTop = computed(() => { // Tabs offset top
    if (systemStore.screenWidth >= 540) {
      return 3.125 * systemStore.fontSize
    }

    return 6.25 * systemStore.fontSize
  })
  const hotTab = computed(() => {
    return {
      id: "POPULAR",
      code: "ONE_API_HOT",
      name: t("sort.POPULAR"),
      categoryIconStyle: props.getCategoryIconStyle("ONE_API_HOT"),
      platformList: [{
        id: "POPULAR",
        code: "ONE_API_HOT",
        gameList: gameStore.homeHotList,
        platformIconStyle: props.getCategoryIconStyle("ONE_API_HOT"),
      }],
    }
  })
  const homeList = computed(() => {
    const list = gameStore.homeList.sort((a, b) => (b.gameTypeSort ?? 0) - (a.gameTypeSort ?? 0)).map((item) => {
      const { gameType } = item
      return {
        ...item,
        id: gameType,
        code: gameType,
        name: t(`sort.${gameType}`),
        categoryIconStyle: props.getCategoryIconStyle(gameType),
        platformList: item.platformList.map((platform) => {
          return {
            ...platform,
            id: gameType,
            code: gameType,
            platformIconStyle: props.getPlatformIconStyle(platform.code),
            gameList: gameStore.gameList.flatMap(game => game.gameList.filter(game => game.gameType === gameType && game.platformId === platform.id)),
          }
        }),
      }
    })
    if (props.noHot) {
      return list
    }
    return [hotTab.value, ...list]
  })
  const homePlatformList = computed(() => { // Home platform list
    const platformList = [...gameStore.homePlatformList]

    platformList.unshift({
      id: 0,
      name: "POPULAR",
      code: "POPULAR",
      logo: "@/assets/svg/sort/POPULAR.svg",
      status: "ON",
      openType: true,
      type: "sort",
      sort: 12,
    } as any)

    return platformList
  })

  /** get game list by category */
  const getGameListByCategory = (category: string) => {
    const platforms = gameStore.platformList
    console.log(">>>>>>>>>>>>>> getGameListByCategory", category, platforms)
    return getOrSetCache("game", `category_${category}`, () => {
      return gameStore.gameList.flatMap(platformGames =>
        platformGames.gameList.filter(game => game.gameType === category),
      )
    })
  }

  /** get game list by platform */
  const getGameListByPlatform = (platformId: number) => {
    return getOrSetCache("game", `platform_${platformId}`, () => {
      return gameStore.gameList
        .filter(item => item.gameList[0]?.platformId === platformId)
        .flatMap(item => item.gameList)
    })
  }

  let navComplete: HTMLElement | null = null
  let isDown = false
  let startX: number
  let scrollLeft: number
  let hasMoved = false // 标记是否发生了拖拽移动

  /** 鼠标按下 */
  const handleMouseDown = (e: MouseEvent) => {
    isDown = true
    hasMoved = false // 重置移动标记
    if (navComplete)
      navComplete.style.cursor = "grabbing"
    startX = e.pageX - safeNumber(navComplete?.offsetLeft)
    scrollLeft = safeNumber(navComplete?.scrollLeft)
    e.preventDefault() // 防止文本选择
  }

  /** 鼠标离开事件 */
  const handleMouseLeave = () => {
    isDown = false
    if (navComplete)
      navComplete.style.cursor = "grab"
  }

  /** 鼠标松开事件 */
  const handleMouseUp = (e: MouseEvent) => {
    isDown = false
    if (navComplete)
      navComplete.style.cursor = "grab"

    // 如果发生了拖拽移动，阻止点击事件
    if (hasMoved) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  /** 鼠标移动事件 */
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown)
      return
    e.preventDefault()

    const x = e.pageX - safeNumber(navComplete?.offsetLeft)
    const walk = (x - startX) * 1 // 滚动速度倍数

    // 如果移动距离超过阈值，标记为已移动, 5px的容错范围
    if (Math.abs(walk) > 5) {
      hasMoved = true
    }

    if (navComplete)
      navComplete.scrollLeft = scrollLeft - walk
  }

  /** 鼠标点击事件 */
  const handleClick = (e: MouseEvent) => {
    if (hasMoved) {
      e.preventDefault()
      e.stopPropagation()
      hasMoved = false // 重置标记
    }
  }

  onMounted(() => {
    const { isPc } = useDevice().getInfo()
    if (isPc) {
      navComplete = document.querySelector(".segment-tabs .van-tabs__nav--complete")
      if (!navComplete)
        return

      // 监听鼠标按下
      navComplete.addEventListener("mousedown", handleMouseDown)

      // 监听鼠标离开
      navComplete.addEventListener("mouseleave", handleMouseLeave)

      // 监听鼠标松开
      navComplete.addEventListener("mouseup", handleMouseUp)

      // 监听鼠标移动
      navComplete.addEventListener("mousemove", handleMouseMove)

      // 额外的点击事件拦截（双重保险）
      navComplete.addEventListener("click", handleClick, true) // 使用捕获阶段，确保最先执行

      // 设置初始鼠标样式
      navComplete.style.cursor = "grab"
      navComplete.style.userSelect = "none" // 防止文本选择
    }
  })

  onBeforeUnmount(() => {
    if (navComplete) {
      navComplete.removeEventListener("mousedown", handleMouseDown)
      navComplete.removeEventListener("mouseleave", handleMouseLeave)
      navComplete.removeEventListener("mouseup", handleMouseUp)
      navComplete.removeEventListener("mousemove", handleMouseMove)
      navComplete.removeEventListener("click", handleClick, true)
    }
  })

  return {
    active,
    homeList,
    homeHotList,
    tabsOffsetTop,
    isGameCategory,
    homePlatformList,
    getGameListByCategory,
    getGameListByPlatform,
    gameWarpComponent,
  }
}
