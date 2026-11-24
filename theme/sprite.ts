export const platformImagePosition = {
	PRISMGRID: 'background-position: 0 0',
	EMBERKITE: 'background-position: -100% 0',
	SOLORBIT: 'background-position: -200% 0',
	LIMEFLARE: 'background-position: -300% 0',
	COMETLINE: 'background-position: -400% 0',
	PULSEARC: 'background-position: -500% 0',
	AURASHARD: 'background-position: -600% 0',
	VORTELLO: 'background-position: -700% 0',
	DAWNHALO: 'background-position: 0 -100%',
	MINTFLAG: 'background-position: -100% -100%',
	SKYDRAFT: 'background-position: -200% -100%',
	TIDEPATH: 'background-position: -300% -100%',
	FORGEBAY: 'background-position: -500% -100%',
	AMBERMOON: 'background-position: -700% -100%',
	TILEBYTE: 'background-position: -200% -200%',
	JELLYGLOW: 'background-position: -500% -200%',
	VOLTFIELD: 'background-position: 0 -300%',
	BUBBLELOOP: 'background-position: -300% -300%',
	PEAKMINT: 'background-position: -400% -300%',
	LABMIX: 'background-position: -500% -300%',
}
export type PlatformImagePositionType = keyof typeof platformImagePosition

export const categoryImagePosition = {
	POPULAR: 'background-position: 0 0',
	ACTION: 'background-position: -100% 0',
	JUMPING: 'background-position: -500% 0',
	SHOOTING: 'background-position: -400% 0',
	STRATEGY: 'background-position: -200% 0',
	ADVENTURE: 'background-position: -300% 0',
	THREE_D: 'background-position: -600% 0',
}
export type CategoryType = keyof typeof categoryImagePosition

export const userInfoPosition = {
	entrar: 'background-position: 0 0',
	withdraw: 'background-position: -100% 0',
	vip: 'background-position: -200% 0',
	promo: 'background-position: -300% 0',
}
export type UserInfoPositionType = keyof typeof userInfoPosition

/** Sprite */
export const sprite = {
	game_category_25: (key: CategoryType) => {
		const position = categoryImagePosition[key]
		if (position) {
			const imageUrl = new URL('@/assets/icons/sprite/game-category-25.png', import.meta.url).href
			return `background-image: url(${imageUrl});${position};background-size: auto 100%;`
		}
		return ''
	},

	platform_category_25: (key: string) => {
		const position = Object.prototype.hasOwnProperty.call(platformImagePosition, key)
			? platformImagePosition[key as PlatformImagePositionType]
			: ''
		if (position) {
			const imageUrl = new URL('@/assets/icons/sprite/platform-category-25.png', import.meta.url).href
			return `background-image: url(${imageUrl});${position};background-size: 800% 400%;`
		}
		return ''
	}
}
