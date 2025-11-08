import { themeManager } from "@/theme"
import { THEME_TYPE, ThemeSupport } from "@/theme/type"
import { LANGUAGE_REVERSE } from "@/enums/language"

/** Global plugin, used to set website information <Execute once when the page is first loaded> */
export default defineNuxtPlugin(async (_to) => {
  const config = useRuntimeConfig() // 获取运行时配置
  const cookieLocale = useCookie("lang") as Ref
  let siteInfo = null

  if (import.meta.client) {
    console.log("__NUXT__ >>>>>", window.__NUXT__)
    const appStore = useAppStore()
    siteInfo = useState("tenantInfo") // 等于 window.__NUXT__.state.$stenantInfo
    const savedTheme = localStorage.getItem("theme")
    appStore.setLocale(cookieLocale.value || siteInfo.value?.appDefaultLanguage || LANGUAGE_REVERSE.English)
    themeManager?.setTheme(savedTheme || siteInfo.value?.skinTwoType || THEME_TYPE.STYLE_25)
  }
  else {
    // ✅ 添加环境变量打印
    console.log("🔍 Plugin Environment:", {
      ssrEnabled: config,
      nuxtSSR: process.env.NUXT_SSR,
      nodeEnv: process.env.NODE_ENV,
      isServer: import.meta.server,
      isClient: import.meta.client,
    })

    const { data: tenant } = await useFetch("/api/tenant")
    console.log("tenant", tenant.value)

    siteInfo = useState("tenantInfo", () => ({
      ...tenant.value,
      appDefaultLanguage: cookieLocale.value || tenant.value?.appDefaultLanguage || LANGUAGE_REVERSE.English,
      skinTwoType: tenant.value?.skinTwoType || ThemeSupport[0],
    }))
  }
})
