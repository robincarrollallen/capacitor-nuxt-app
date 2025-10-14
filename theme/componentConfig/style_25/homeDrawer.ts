import { Components } from "../../components"
import { THEME_KEY } from "../../type"
import { Assets } from "../../assets"
import { sprite } from "../../sprite"

/** 首页抽屉组件配置 */
export const HomeDrawerComponent = {
  component: Components.drawer,
  options: {
    position: "right",
  },
  children: [
    {
      component: Components.drawerHeader, // DrawerHeader<动态布局>(自定义排序)
      children: [
        {
          component: Components.drawerHeaderLogo, // DrawerLogo
          options: {
            style: {
              flexDirection: "row-reverse",
            },
          },
        },
        {
          component: Components.drawerHeaderLogin, // DrawerLogin
        },
      ],
    },
    {
      component: Components.drawerContent, // DrawerContent<动态布局>(滚动/自定义排序)
      options: {
        class: "flex-1 scroll-y column",
        style: {
          gap: "1rem",
        },
      },
      children: [
        {
          component: Components.drawerBanner, // DrawerBanner
          options: {
            icon: Assets.promo_25,
          },
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
          },
        },
      ],
    },
    {
      component: Components.drawerFooter,
      children: [
        {
          component: Components.drawerContentSupport, // Support
        },
      ],
    },
  ],
}
