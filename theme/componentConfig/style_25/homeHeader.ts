import { Components } from "../../components"
import { THEME_KEY } from "../../type"

/** 首页头部组件配置 */
export const HomeHeaderComponent = {
  children: [
    {
      component: Components.pwaBar, // PWA
    },
    {
      component: Components.layout, // NavBar<动态布局>(自定义排序)
      options: {
        class: "nav-bar row",
        style: {
          width: "100%",
          height: "3.125rem",
          padding: "0 .75rem",
          gap: ".5rem",
          background: "linear-gradient(125deg, #121713 0%, #121713 8%, rgba(255, 255, 255, 0.06) 8%, rgba(255, 255, 255, 0.00) 20%, rgba(255, 255, 255, 0.05) 20%, rgba(255, 255, 255, 0.00) 32%, rgba(255, 255, 255, 0.04) 32%, rgba(255, 255, 255, 0.0) 44%, rgba(255, 255, 255, 0.03) 44%, rgba(255, 255, 255, 0.00) 56%, rgba(255, 255, 255, 0.02) 56%, rgba(255, 255, 255, 0.00) 68%, rgba(255, 255, 255, 0.01) 68%, rgba(255, 255, 255, 0.00) 80% ), #121713",
        },
      },
      children: [
        {
          component: Components.navBarLogo, // Logo
          options: {
            icon: "@/assets/svg/menu.svg",
            fit: "contain",
            position: "left",
          },
        },
        {
          component: Components.navBarLanguage(THEME_KEY.STYLE_18), // Language
          options: {
            icon: "@/assets/svg/earth.svg",
            class: "style-25",
          },
        },
        {
          component: Components.navBarMenu(THEME_KEY.STYLE_18), // Menu
          options: {
            icon: "@/assets/svg/menu.svg",
            style: {
              padding: ".5rem",
              width: "2.125rem",
              height: "2.125rem",
              color: "var(--ep-color-icon-default)",
              border: ".0625rem solid var(--ep-color-border-default)",
              background: "var(--ep-color-background-fill-surface-raised-L2)",
            },
          },
        },
      ],
    },
  ],
}
