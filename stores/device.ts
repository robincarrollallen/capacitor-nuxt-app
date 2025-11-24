import { Capacitor } from "@capacitor/core"
import { PLATFORM } from "~/enums"

export const useDeviceStore = defineStore("device", () => {
  const platform = ref(Capacitor.getPlatform())
  const isNative = ref(Capacitor.isNativePlatform())

  const isAndroid = computed(() => platform.value === PLATFORM.ANDROID)
  const isIos = computed(() => platform.value === PLATFORM.IOS)

  return { platform, isAndroid, isIos, isNative }
})
