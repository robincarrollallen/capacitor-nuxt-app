<script setup lang="ts">
const meta = ref({
  title: "Capacitor",
  description: "Capacitor Nuxt App",
  icon: "https://upload-us.b83.xyz/s1/app-icon/9287543/icon.png",
})

const config = useRuntimeConfig()

if (config.public.ssr) {
  const { data } = await useFetch("/api/meta")
  meta.value = data.value ?? meta.value
}

useHead({
  title: meta.value?.title,
  meta: [
    { name: "description", content: meta.value?.description },
  ],
  link: [
    { rel: "icon", type: "image/x-icon", href: meta.value?.icon },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="less">
@import '@/assets/css/global.css';
@import '@/assets/css/animate.css';
@import '@/assets/css/root.css';
</style>
