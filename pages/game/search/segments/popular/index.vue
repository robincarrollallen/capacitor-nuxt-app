<script setup lang="ts">
import GameCard from "@/widgets/gameCard/index.vue"

const gameStore = useGameStore()

const hotList = computed(() => {
  return gameStore.homeHotList.filter((item: Recordable) => item.type === "game")
})
</script>

<template>
  <RollList :list="hotList" disabled-refresh column="4" gutter=".5rem">
    <template #default="{ item }">
      <GameCard :item="item" />
    </template>
  </RollList>
</template>

<style scoped lang="less">
:deep(.van-grid) {
  padding-top: .5rem;
  padding-bottom: .5rem;
}
</style>
