export function useGameWarpLogic(props: Recordable) {
  const systemStore = useSystemStore()

  const swiperRef = ref() // Swiper DOM
  const showAll = ref(false) // Whether to show all
  const currentSlide = ref(0) // Current slide index
  const swiperHandler = ref()	// Swiper method

  const screenWidth = computed(() => systemStore.screenWidth) // Screen width
  // Collapse icon color
  const collapseIconColor = computed(() => {
    return getComputedStyle(document.documentElement).getPropertyValue("--ep-color-background-fill-active-disabled") || ""
  })
  // Game card pagination
  const gameCardPagination = computed(() => {
    let limit = 16 // Number of games per page

    if (showAll.value) {
      limit = props.list.length
    }
    else if (screenWidth.value >= 1600) {
      limit = 32
    }
    else if (screenWidth.value >= 1344) {
      limit = 28
    }
    else if (screenWidth.value >= 1024) {
      limit = 24
    }
    else if (screenWidth.value >= 768) {
      limit = 20
    }

    const { pages, currentPage, totalPages, totalItems } = paginate(props.list, limit)

    return {
      pages,
      currentPage,
      totalPages,
      totalItems,
    }
  })
  const hasPrev = computed(() => {
    return !showAll.value && currentSlide.value > 0
  })
  const hasNext = computed(() => {
    return !showAll.value && currentSlide.value < gameCardPagination.value.totalPages - 1
  })

  const onSwiper = (swiper: any) => {
    swiperHandler.value = swiper
  }

  /**
   * 轮播图切换事件
   */
  const onSlideChange = (e: any) => {
    currentSlide.value = e.activeIndex
  }

  return {
    hasPrev,
    hasNext,
    showAll,
    swiperRef,
    currentSlide,
    swiperHandler,
    collapseIconColor,
    gameCardPagination,
    onSlideChange,
    onSwiper,
  }
}
