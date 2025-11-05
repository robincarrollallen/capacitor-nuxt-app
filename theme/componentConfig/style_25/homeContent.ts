import { Assets } from "../../assets"
import { THEME_KEY } from "../../type"
import { Components } from "../../components"
import { sprite } from "../../sprite"

/** 首页内容组件配置 */
export const HomeContentComponent = {
  children: [
    {
      component: Components.layout, // Login & Info<动态布局>(自定义排序)
      options: {
        class: "row",
        style: {
          gap: "0.5rem",
          display: "flex",
          alignItems: "center",
          borderRadius: ".75rem",
          transform: "skew(-12deg)",
          padding: ".6875rem .75rem",
          justifyContent: "space-between",
          margin: ".375rem 1.375rem .375rem 2.5rem",
          border: ".125rem solid var(--ep-color-border-default)",
        },
      },
      children: [
        {
          component: Components.info(THEME_KEY.STYLE_25), // Info
          options: {
            outAvatar: "@/assets/svg/person-25.svg",
            style: {
              marginLeft: "-1.875rem",
              transform: "skew(12deg)",
            },
          },
        },
        {
          component: Components.login(THEME_KEY.STYLE_25), // Login
        },
      ],
    },
    {
      component: Components.banner(THEME_KEY.STYLE_18), // Banner
      options: {
        badgeSrc: new URL("@/assets/svg/badge-banner.svg", import.meta.url).href,
      },
    },
    {
      component: Components.marquee(THEME_KEY.STYLE_25), // Marquee
    },
    {
      component: Components.jackpot(THEME_KEY.STYLE_25), // Jackpot
      options: {
        icon: Assets.jackpot_25,
      },
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
        },
      ],
    },
    {
      component: Components.layout, // Rank<动态布局>(自定义排序)
      options: {
        style: {
          overflow: "hidden",
          height: "min-content",
          borderTop: ".125rem solid var(--ep-color-border-default)",
          borderRadius: "var(--ep-border-radius-surface-small, .75rem)",
          background: "var(--ep-color-background-fill-surface-raised-L1)",
        },
      },
      children: [
        {
          component: Components.rankTitle(THEME_KEY.STYLE_25), // RankTitle
        },
        {
          component: Components.rankHeader(THEME_KEY.STYLE_25), // RankHeader
        },
        {
          component: Components.rankList(THEME_KEY.STYLE_25), // RankList
        },
      ],
    },
  ],
}
