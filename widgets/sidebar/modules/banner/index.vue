<script setup lang="ts">
import { Autoplay, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/vue"
import { useSideBannerLogic } from "./logic"

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
})

const emit = defineEmits(["loaded"])
const router = useRouter() // 路由对象

const { autoplay, pagination, bannerList } = useSideBannerLogic()
</script>

<template>
  <div class="swiper-poster-wrap">
    <div class="swiper-poster-title">
      <img :src="props.icon">
      <label>Bonuses</label>
      <span @click="router.replace('/activity')">{{ $t('main.all') }}</span>
    </div>
    <Swiper :modules="[Autoplay, Pagination]" :pagination="pagination" :autoplay="autoplay" :slides-per-view="1" :slides-per-group="1" :initial-slide="0" :loop="bannerList.length > 2">
      <SwiperSlide v-for="item in bannerList" :key="item.id">
        <van-image class="poster-img" :src="item.imageUrl" :show-loading="false" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
