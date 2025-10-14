import { Components } from "../../components"
import { THEME_KEY } from "../../type"

/** 首页内容组件配置 */
export const HomeContentComponent = {
  children: [
    {
      component: Components.banner(THEME_KEY.STYLE_18), // 轮播图组件
      options: {
        badgeSrc: new URL("@/assets/svg/badge-banner.svg", import.meta.url).href,
      },
    },
    {
      component: Components.marquee(THEME_KEY.STYLE_18), // 跑马灯组件
    },
    {
      component: Components.mainSortTab(THEME_KEY.STYLE_18), // 分类组件
    },
  ],
}
