<script setup lang="ts">
import { useNavBarLanguageLogic } from "../logic"

const props = defineProps<{
  icon: string
}>()

const { showPopover, langList, fontSize, locale, changeLanguage } = useNavBarLanguageLogic()
</script>

<template>
  <van-popover v-model:show="showPopover" :show-arrow="false" placement="bottom-end" trigger="click" overlay :offset="[fontSize * .5, fontSize]" :overlay-style="{ background: 'transparent' }">
    <div class="change-language-wrap">
      <div v-for="lang in langList" :key="lang" class="change-language-item" :class="{ active: locale.toString() === lang }" @click="changeLanguage(lang)">
        <Flag :iso="lang.split('-')[1]" class="flag-icon" />
        <span class="change-language-item-name">
          {{ getLanguageName(lang, locale) }}
        </span>
      </div>
    </div>
    <template #reference>
      <Icon :src="props.icon" class="earth-svg" v-bind="$attrs" />
    </template>
  </van-popover>
</template>

<style scoped lang="less">
@import '../index.less';
</style>
