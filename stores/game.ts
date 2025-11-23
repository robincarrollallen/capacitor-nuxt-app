import hotListData from "public/data/hotList.json"
import gameListData from "public/data/gameList.json"
import homeListData from "public/data/homeList.json"
import platformListData from "public/data/platformList.json"

export const useGameStore = defineStore("game", () => {
  const gameList = ref(gameListData) // Game list
  const homeList = ref(homeListData) // Home list
  const platformList = ref(platformListData) // Platform list
  const homeHotList = ref(hotListData.filter(item => item.logoFlag)) // Home hot game list

  const homePlatformList = computed(() => {
    return platformList.value.sort((a: Recordable, b: Recordable) => b.sort - a.sort).map((item: Recordable) => {
      const { gameTypes = [], ...rest } = item
      let platformTotal = 0
      const newGameTypes = gameTypes.sort((a: Recordable, b: Recordable) => b.gameTypeSort - a.gameTypeSort).reduce((acc: Recordable[], cur: Recordable) => {
        const { gameCount, target } = cur as Recordable
        if (target === "hall") {
          platformTotal += 1
          acc.push({
            ...rest,
            ...cur,
          })
        }
        if (target !== "hall" && gameCount) {
          platformTotal += gameCount
          acc.push({
            ...rest,
            ...cur,
          })
        }
        return acc
      }, [])
      return {
        ...rest,
        total: platformTotal,
        gameTypes: newGameTypes,
      }
    })
  })

  return { homePlatformList, homeHotList, homeList, platformList, gameList }
})
