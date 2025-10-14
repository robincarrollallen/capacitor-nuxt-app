import { UAParser } from "ua-parser-js"

interface DeviceInfo {
  platform: string
  model: string
  isPc: boolean
  isIos: boolean
  isAndroid: boolean
  isMobile: boolean
  osVersion: string
  operatingSystem: string
}

export function useDevice() {
  const deviceInfo = useState<DeviceInfo | null>("device.info", () => null)

  const getModel = (result: Recordable) => {
    // Web 环境下很难获取具体型号，可以返回设备类型
    if (result.device.model)
      return result.device.model
    if (result.device.vendor && result.device.type) {
      return `${result.device.vendor} ${result.device.type}`
    }
    return result.browser.name || "unknown"
  }

  const getPlatform = (result: Recordable) => {
    const osName = result.os.name?.toLowerCase()
    if (osName?.includes("android"))
      return "android"
    if (osName?.includes("ios"))
      return "ios"
    if (osName?.includes("windows"))
      return "web"
    if (osName?.includes("mac"))
      return "web"
    if (osName?.includes("linux"))
      return "web"
    return "web"
  }

  const getInfo = (): DeviceInfo => {
    if (deviceInfo.value) {
      return deviceInfo.value
    }

    if (import.meta.client) {
      const parser = new UAParser()
      const result = parser.getResult()
      const platform = getPlatform(result)

      const info: DeviceInfo = {
        platform,
        model: getModel(result),
        isPc: platform === "web",
        isIos: platform === "ios",
        isAndroid: platform === "android",
        osVersion: result.os.version || "unknown",
        operatingSystem: result.os.name || "unknown",
        isMobile: platform === "ios" || platform === "android",
      }

      deviceInfo.value = info // 缓存结果
      return info
    }

    const fallbackInfo: DeviceInfo = {
      isPc: false,
      isIos: false,
      isMobile: false,
      isAndroid: false,
      model: "unknown",
      platform: "unknown",
      osVersion: "unknown",
      operatingSystem: "unknown",
    }

    deviceInfo.value = fallbackInfo
    return fallbackInfo
  }

  return {
    getInfo,
    deviceInfo: readonly(deviceInfo),
  }
}
