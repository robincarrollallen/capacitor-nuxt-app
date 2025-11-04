<script setup lang="ts">
import { useRankHeaderLogic } from "../logic"
import { topThreeList } from "../../data"

const { getUserTopList } = useRankHeaderLogic()

onMounted(() => {
  getUserTopList()
})
</script>

<template>
  <div class="rank-header">
    <div class="rank-header-wrap">
      <div v-for="item in topThreeList" :key="item.rank" class="rank-avatar-warp">
        <van-image :src="item.avatar" lazy-load />
        <h1>{{ item.userId }}</h1>
        <b>{{ item.rankValue }}</b>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>
