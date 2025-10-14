import { Locale } from "vant"
import { LanguageSupport, type LanguageType } from "@/enums/language"

export const useAppStore = defineStore("app", () => {
  const locale = ref<LanguageType>(LanguageSupport[0])

  /** Set Vant locale */
  const setVantLocale = async () => {
    try {
      const pack = await import(`../node_modules/vant/es/locale/lang/${locale.value}.mjs`) // 只能使用相对路径从 node_modules 导入
      Locale.use(locale.value, pack.default || pack)
    }
    catch {
      const pack = await import("vant/es/locale/lang/en-US.mjs")
      Locale.use("en-US", pack.default || pack)
    }
  }

  /** Set language */
  const setLocale = (language: string) => {
    const { $i18n } = useNuxtApp()
    const cookieLocale = useCookie("lang") as Ref

    locale.value = LanguageSupport.includes(language as any)
      ? (language as LanguageType)
      : LanguageSupport[0]

    setVantLocale()
    $i18n.setLocale(locale.value)
    cookieLocale.value = locale.value
  }

  return { locale, setLocale }
})
