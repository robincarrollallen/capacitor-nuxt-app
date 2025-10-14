<script setup lang="ts">
import { useJackpotLogic } from "../logic"
import { getInterval, setAmountInterval } from "../data"

const props = defineProps({
  icon: {
    type: String,
    default: "",
  },
})

const { tenantInfo, bonusClick } = useJackpotLogic()

const dynamicAmount = ref(Number.parseInt(Date.now().toString().slice(-9)) / 100) // Dynamic amount

onMounted(() => {
  setAmountInterval(setInterval(() => {
    dynamicAmount.value = Number.parseInt(Date.now().toString().slice(-9)) / 100
  }, 3000))
})

onUnmounted(() => {
  const interval = getInterval()
  if (interval)
    clearInterval(interval)
})
</script>

<template>
  <div v-if="tenantInfo?.switch" class="bonus" @click="bonusClick">
    <SvgIcon class="bonus-img" :src="props.icon" />
    <div class="bonus-content">
      <label class="bonus-title">
        Jack Pots
      </label>
      <div class="bonus-content-inner">
        <label class="bonus-money">
          <AnimatedNumber :value="dynamicAmount" :decimals="2" />
        </label>
      </div>
    </div>
    <div class="bonus-top-line" />
  </div>
</template>

<style lang="less" scoped>
@import '../index.less';
</style>
