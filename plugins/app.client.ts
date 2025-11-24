import { useSystemStore } from "@/stores/system"

// Execute immediately when the plugin starts
export default defineNuxtPlugin(() => {
  // Execute the logic that needs to wait for Nuxt to be fully initialized here
  onNuxtReady(() => {
    const systemStore = useSystemStore()
    systemStore.updateScreenSize()
    window.addEventListener("resize", systemStore.updateScreenSize)
  })
})
