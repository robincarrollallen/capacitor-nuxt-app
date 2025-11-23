<script setup lang="ts">
import { useActivityLogic } from "./logic"

defineOptions({
  name: "GameSearchPage",
})

definePageMeta({
  auto: false,
  ssr: false,
})

const searchValue = ref("")

const { activeTabIndex, tabList } = useActivityLogic()
</script>

<template>
  <div class="game-search-page page-safe-area">
    <NavigateBar :title="$t('sort.SEARCH')" left-arrow />
    <main>
      <div class="search-input-wrap">
        <Input v-model="searchValue" :placeholder="$t('input.SearchGames')">
          <template #suffix>
            <van-icon name="search" size="1.5rem" />
          </template>
        </Input>
      </div>
      <van-tabs v-model:active="activeTabIndex" shrink>
        <van-tab v-for="item in tabList" :key="item.type" :title="item.name">
          <template #title>
            <Icon :src="item.icon" />{{ item.name }}
          </template>
          <component :is="item.component" />
        </van-tab>
      </van-tabs>
    </main>
  </div>
</template>

<style lang="less" scoped>
.game-search-page {
  height: 100%;
  display: flex;
  flex-direction: column;

  main {
    flex: 1;
    height: 0;
    display: flex;
	  flex-direction: column;

    .search-input-wrap {
      padding: .5rem;
    }

    .van-tabs {
      flex: 1;
      height: 0;
      display: flex;
      flex-direction: column;
      --van-tabs-bottom-bar-height: .125rem;
      --van-tabs-bottom-bar-color: var(--ep-color-border-default);
      --van-tabs-nav-background: var(--ep-color-background-fill-surface-lowered);
      --van-tab-active-text-color: var(--ep-agent-color-highlight-primary, var(--ep-color-text-selected));

      :deep(.van-tabs__wrap) {
        border-bottom: .0625rem solid var(--ep-color-border-default);

        .van-tab__text {
          gap: .25rem;
          display: flex;
          align-items: center;

          i {
            width: 1rem;
            height: 1rem;
          }
        }
      }

      :deep(.van-tabs__content) {
        flex: 1;
        height: 0;
        overflow: hidden;

        .van-tab__panel {
          height: 100%;
        }
      }
    }
  }
}
</style>
