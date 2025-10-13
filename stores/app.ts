import { LanguageSupport, type LanguageType } from '@/enums/language'
import { Locale } from 'vant'

export const useAppStore = defineStore('app', () => {
	const locale = ref<LanguageType>(LanguageSupport[0])

	/** Set language */
	const setLocale = (language: string) => {
		const { $i18n } = useNuxtApp()

		locale.value = LanguageSupport.includes(language as any)
			? (language as LanguageType)
			: LanguageSupport[0]

		setVantLocale()
		$i18n.setLocale(locale.value)
		useCookie('lang').value = locale.value
	}

	/** Set Vant locale */
	const setVantLocale = async () => {
		try {
			const pack = await import(`../node_modules/vant/es/locale/lang/${locale.value}.mjs`) // 只能使用相对路径从 node_modules 导入
			Locale.use(locale.value, pack.default || pack)
		} catch (error) {
			const pack = await import(`../node_modules/vant/es/locale/lang/en-US.mjs`)
			Locale.use('en-US', pack.default || pack)
		}
	}

	return { locale, setLocale }
})
