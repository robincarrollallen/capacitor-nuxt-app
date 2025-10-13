import { LANGUAGE_REVERSE } from "@/enums/language"

export default defineI18nConfig(() => ({
  legacy: false, // 是否启用旧版<vue2> API
  fallbackLocale: LANGUAGE_REVERSE.English, // 回退语言
}))
