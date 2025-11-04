<script setup lang="ts">
import { rankingList } from "../../data"
import VerticalInfiniteScroll from "@/widgets/verticalInfiniteScrollProps/index.vue"

const scrollRef = ref<InstanceType<typeof VerticalInfiniteScroll>>()

function handleItemVisible(item: any, index: number) {
  console.log("Item visible:", item, index)
}
</script>

<template>
  <div>
    <div class="rank-list-header">
      <b>Rank</b>
      <b>Member</b>
      <b>Amount</b>
    </div>
    <VerticalInfiniteScroll
      ref="scrollRef"
      :data="rankingList"
      :item-height="60"
      :speed="30"
      :container-height="400"
      @item-visible="handleItemVisible"
    >
      <template #default="{ item }">
        <div class="rank-item">
          <label>{{ item.rank }}</label>
          <div>
            <van-image :src="item.avatar" lazy-load />
            <span>{{ item.userId }}</span>
          </div>
          <b>{{ item.rankValue }}</b>
        </div>
      </template>
    </VerticalInfiniteScroll>
  </div>
</template>

<style lang="less" scoped>
@import './index.less';
</style>
