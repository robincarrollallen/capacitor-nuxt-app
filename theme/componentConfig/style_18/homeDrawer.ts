import { Components } from "../../components"
import { THEME_KEY } from "../../type"

/** 首页抽屉组件配置 */
export const HomeDrawerComponent = {
  component: Components.drawer,
  children: [
    {
      component: Components.drawerHeader,
      children: [
        {
          component: Components.drawerHeaderLogo,
        },
        {
          component: Components.drawerHeaderLogin,
        },
      ],
    },
    {
      component: Components.drawerContent,
      options: {
        class: "flex-1 scroll-y column",
        style: {
          gap: "1rem",
        },
      },
      children: [
        {
          component: Components.drawerHeaderLanguage,
        },
        {
          component: Components.drawerContentActivity(THEME_KEY.STYLE_18),
        },
        {
          component: Components.drawerContentCategory,
        },
      ],
    },
    {
      component: Components.drawerFooter,
      children: [
        {
          component: Components.drawerContentSupport,
        },
      ],
    },
  ],
}
