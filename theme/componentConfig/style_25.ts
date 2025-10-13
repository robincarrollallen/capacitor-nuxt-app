import { Assets } from "../assets"
import { THEME_KEY } from "../type"
import { Components } from "../components"
import { sprite } from "../sprite"

/** 首页头部组件配置 */
export const HomeHeaderComponent= {
	children: [
		{
			component: Components.pwaBar, // PWA
		},
		{
			component: Components.layout, // NavBar<动态布局>(自定义排序)
			options: {
				class: 'nav-bar row',
				style: {
					width: '100%',
					height: '3.125rem',
					padding: '0 .75rem',
					gap: '.5rem',
					background: 'linear-gradient(125deg, #121713 0%, #121713 8%, rgba(255, 255, 255, 0.06) 8%, rgba(255, 255, 255, 0.00) 20%, rgba(255, 255, 255, 0.05) 20%, rgba(255, 255, 255, 0.00) 32%, rgba(255, 255, 255, 0.04) 32%, rgba(255, 255, 255, 0.0) 44%, rgba(255, 255, 255, 0.03) 44%, rgba(255, 255, 255, 0.00) 56%, rgba(255, 255, 255, 0.02) 56%, rgba(255, 255, 255, 0.00) 68%, rgba(255, 255, 255, 0.01) 68%, rgba(255, 255, 255, 0.00) 80% ), #121713',
				}
			},
			children: [
				{
					component: Components.navBarLogo, // Logo
					options: {
						icon: '@/assets/svg/menu.svg',
						fit: 'contain',
						position: 'left',
					}
				},
				{
					component: Components.navBarLanguage(THEME_KEY.STYLE_18), // Language
					options: {
						icon: '@/assets/svg/earth.svg',
						class: 'style-25',
					}
				},
				{
					component: Components.navBarMenu(THEME_KEY.STYLE_18), // Menu
					options: {
						icon: '@/assets/svg/menu.svg',
						style: {
							padding: '.5rem',
							width: '2.125rem',
							height: '2.125rem',
							color: 'var(--ep-color-icon-default)',
							border: '.0625rem solid var(--ep-color-border-default)',
							background: 'var(--ep-color-background-fill-surface-raised-L2)',
						}
					}
				}
			]
		}
	]
}

/** 首页内容组件配置 */
export const HomeContentComponent = {
	children: [
		{
			component: Components.layout, // Login & Info<动态布局>(自定义排序)
			options: {
				class: 'row',
				style: {
					gap: '0.5rem',
					display: 'flex',
					alignItems: 'center',
					borderRadius: '.75rem',
					transform: 'skew(-12deg)',
					padding: '.6875rem .75rem',
					justifyContent: 'space-between',
					margin: '.375rem 1.375rem .375rem 2.5rem',
					border: '.125rem solid var(--ep-color-border-default)',
					aspectRatio: '154/29',
				}
			},
			children: [
				{
					component: Components.info(THEME_KEY.STYLE_25), // Info
					options: {
						outAvatar: '@/assets/svg/person-25.svg',
						style: {
							marginLeft: '-1.875rem',
							transform: 'skew(12deg)',
						}
					}
				},
				{
					component: Components.login(THEME_KEY.STYLE_25), // Login
				}
			]
		},
		{
			component: Components.banner(THEME_KEY.STYLE_18), // Banner
			options: {
				badgeSrc: new URL('@/assets/svg/badge-banner.svg', import.meta.url).href
			}
		},
		{
			component: Components.marquee(THEME_KEY.STYLE_25), // Marquee
		},
		{
			component: Components.jackpot(THEME_KEY.STYLE_25), // Jackpot
			options: {
				icon: Assets.jackpot_25,
			}
		},
		{
			component: Components.mainSortTab(THEME_KEY.STYLE_25), // SortTab
			options: {
				getCategoryIconStyle: sprite.game_category_25,
				getPlatformIconStyle: sprite.platform_category_25,
			},
			children: [
				{
					component: Components.gameWrap(THEME_KEY.STYLE_25), // GameWrap
				}
			]
		}
	]
}

/** 首页抽屉组件配置 */
export const HomeDrawerComponent = {
	component: Components.drawer,
	options: {
		position: 'right',
	},
	children: [
		{
			component: Components.drawerHeader, // DrawerHeader<动态布局>(自定义排序)
			children: [
				{
					component: Components.drawerHeaderLogo, // DrawerLogo
					options: {
						style: {
							flexDirection: 'row-reverse',
						}
					}
				},
				{
					component: Components.drawerHeaderLogin, // DrawerLogin
				}
			]
		},
		{
			component: Components.drawerContent, // DrawerContent<动态布局>(滚动/自定义排序)
			options: {
				class: 'flex-1 scroll-y column',
				style: {
					gap: '1rem',
				}
			},
			children: [
				{
					component: Components.drawerBanner, // DrawerBanner
					options: {
						icon: Assets.promo_25
					}
				},
				{
					component: Components.drawerHeaderLanguage(THEME_KEY.STYLE_18), // Language
				},
				{
					component: Components.drawerContentActivity(THEME_KEY.STYLE_25), // Activity
				},
				{
					component: Components.drawerContentCategory(THEME_KEY.STYLE_25), // Category
					options: {
						getCategoryIconStyle: sprite.game_category_25,
						getPlatformIconStyle: sprite.platform_category_25,
						gameCategoryBgImages: Assets.bg_game_category_25,
					}
				}
			]
		},
		{
			component: Components.drawerFooter,
			children: [
				{
					component: Components.drawerContentSupport, // Support
				}
			]
		}
	]
}
