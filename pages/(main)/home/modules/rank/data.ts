export const topThreeList = ref<Recordable[]>([])
export const rankingList = ref<Recordable[]>([])

export function setTopThreeList(list: Recordable[]) {
  topThreeList.value = list
}

export function setRankingList(list: Recordable[]) {
  rankingList.value = list
}
