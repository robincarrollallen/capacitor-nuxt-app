import { THEME_TYPE, type ThemeType, type ThemeKEY } from "@/theme/type"
import type { AsyncComponentLoader } from "vue"

export type ComponentConfig = {
	component?: AsyncComponentLoader
	options?: Recordable
	children?: ComponentConfig[]
}

/** 动态导入组件配置 */
const modules: Recordable = import.meta.glob('./style_*', { eager: true })

/** 组件配置映射 */
const configMap: Record<ThemeKEY, any> = {} as Record<ThemeKEY, any>

/** 遍历导入的模块 */
Object.entries(modules).forEach(([path, module]) => {
	const match = path.match(/\.\/style_(\d+)/)
	if (match) {
		const styleSerial = match[1]
		const themeType = THEME_TYPE[`STYLE_${styleSerial}`] as ThemeType
		configMap[themeType] = module
	}
})

/** 获取组件配置 */
export const getComponentConfig = (skinTwoType: ThemeType, componentName: string): ComponentConfig => {
	const module = configMap[skinTwoType]
	return module[componentName]
}
