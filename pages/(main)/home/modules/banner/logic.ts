export function useBannerLogic() {
  const tenantStore = useTenantStore()
  const systemStore = useSystemStore()
  const autoplay = { delay: 2500, disableOnInteraction: false } as any

  const bannerList = computed(() => tenantStore.bannerList)
  const slidesPerView = computed(() => {
    let perView = 1 // 同时显示数量
    let spaceBetween = 0 // 间距
    let initialSlide = 0 // 初始化序号
    let centeredSlides = false // 当前显示项是否居中

    if (systemStore.screenWidth >= 1344) {
      perView = 3
      spaceBetween = 30
      centeredSlides = true
    }
    else if (systemStore.screenWidth >= 1024) {
      perView = 2
      spaceBetween = 30
      centeredSlides = true
    }
    else if (systemStore.screenWidth >= 540) {
      perView = 1.3
      initialSlide = 1
      spaceBetween = 20
    }

    return {
      perView,
      initialSlide,
      spaceBetween,
      centeredSlides,
    }
  })

  return {
    bannerList,
    autoplay,
    slidesPerView,
  }
}
