import { Components } from "../../components"
import { THEME_KEY } from "../../type"

/** 首页头部组件配置 */
export const HomeHeaderComponent = {
  children: [
    {
      component: Components.pwaBar, // pwa栏组件
    },
    {
      component: Components.navBar, // 导航栏组件
      options: {
        class: "nav-bar",
        style: {
          width: "100%",
          height: "3.125rem",
          display: "flex",
          alignItems: "center",
          padding: "0 .75rem",
          gap: ".5rem",
          background: "var(--ep-color-background-fill-active-disabled)",
        },
      },
      children: [
        {
          component: Components.navBarMenu(THEME_KEY.STYLE_18), // 导航栏菜单组件
          options: {
            icon: "@/assets/svg/menu.svg",
            style: {
              padding: ".125rem",
              width: "1.5rem",
              height: "1.5rem",
            },
          },
        },
        {
          component: Components.navBarLogo, // 导航栏logo组件
          options: {
            icon: "@/assets/svg/menu.svg",
            fit: "contain",
            position: "left",
          },
        },
        {
          component: Components.navBarLogin, // 导航栏登录组件
        },
        {
          component: Components.navBarLanguage(THEME_KEY.STYLE_18), // 导航栏语言组件
          options: {
            icon: "@/assets/svg/earth.svg",
          },
        },
      ],
    },
  ],
}
