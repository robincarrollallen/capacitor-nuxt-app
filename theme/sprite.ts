export const platformImagePosition = {
	slots_cq9: 'background-position: 0 0',
	ONE_API_CQ9: 'background-position: 0 0',
	ELECTRONIC_tada: 'background-position: -100% 0',
	ONE_API_Tada: 'background-position: -100% 0',
	PP: 'background-position: -200% 0',
	ONE_API_PP: 'background-position: -200% 0',
	ELECTRONIC_PP: 'background-position: -200% 0',
	PG: 'background-position: -300% 0',
	KKGAME: 'background-position: -300% 0',
	ELECTRONIC_kk: 'background-position: -300% 0',
	ONE_API_PG: 'background-position: -300% 0',
	slots_Evoplay: 'background-position: -400% 0',
	ONE_API_Evoplay: 'background-position: -400% 0',
	Betby: 'background-position: -500% 0',
	slots_jdb: 'background-position: -600% 0',
	ONE_API_JDB: 'background-position: -600% 0',
	slots_Spinix: 'background-position: -700% 0',
	ONE_API_Spinix: 'background-position: -700% 0',
	live_evolutoin: 'background-position: 0 -100%',
	ONE_API_Evolution: 'background-position: 0 -100%',
	SPRIBE: 'background-position: -100% -100%',
	ONE_API_Spribe: 'background-position: -100% -100%',
	M8SPORTS: 'background-position: -200% -100%',
	basha: 'background-position: -300% -100%',
	slots_jili: 'background-position: -400% -100%',
	ONE_API_Jili: 'background-position: -400% -100%',
	slots_fc: 'background-position: -500% -100%',
	ONE_API_FaChai: 'background-position: -500% -100%',
	TBGame: 'background-position: -600% -100%',
	CP: 'background-position: -700% -100%',
	G759: 'background-position: -200% -200%',
	SEXYBCRT: 'background-position: -500% -200%',
	ONE_API_Sexy: 'background-position: -500% -200%',
	EVOLive: 'background-position: 0 -100%',
	WM_LIVE: 'background-position: -700% -200%',
	FBSports: 'background-position: 0 -300%',
	ONE_API_AG: 'background-position: -100% -300%',
	POPOK: 'background-position: -300% -300%',
}
export type PlatformImagePositionType = keyof typeof platformImagePosition

export const categoryImagePosition = {
	ONE_API_HOT: 'background-position: 0 0',
	ELECTRONIC: 'background-position: -100% 0',
	CHESS: 'background-position: -200% 0',
	FISHING: 'background-position: -300% 0',
	VIDEO: 'background-position: -400% 0',
	SPORTS: 'background-position: -500% 0',
	LOTTERY: 'background-position: -600% 0',
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

	platform_category_25: (key: PlatformImagePositionType) => {
		const position = platformImagePosition[key]
		if (position) {
			const imageUrl = new URL('@/assets/icons/sprite/platform-category-25.png', import.meta.url).href
			return `background-image: url(${imageUrl});${position};background-size: 800% 400%;`
		}
		return ''
	}
}
