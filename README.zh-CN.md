# 项目说明文档  [English](README.md) 

#### Web预览: https://robincarrollallen.github.io/capacitor-nuxt-app

## 技术栈概述

本项目是一个基于 **Nuxt 3 + Capacitor 6** 的混合移动应用框架,支持 iOS/Android 原生开发和 Web 部署。项目采用企业级架构设计,具备完整的多语言、多主题、状态管理和数据持久化能力,适用于游戏、社交、金融等多租户移动应用场景。

### 1. 包管理工具

- 推荐`bun`包管理器进行依赖管理和脚本执行。
- 可任选 `npm`、`yarn`、`pnpm` 主流包管理器进行依赖管理和脚本执行。

### 核心特性

- 🚀 **跨平台支持**: Web + iOS + Android 统一开发
- 🎨 **多主题系统**: 支持 20+ 预定义主题,动态切换
- 🌍 **国际化**: 7 种语言开箱即用
- 💾 **完善的持久化**: IndexedDB + localStorage + Cookie 多层存储
- 📱 **移动端优化**: Vant UI + 响应式设计
- 🔐 **类型安全**: 全面的 TypeScript 支持
- ⚡ **高性能**: SSR/CSR 可选,自动路由,组件懒加载

### 2. 核心框架

| 技术 | 版本 | 用途 |
|------|------|------|
| **Nuxt 3** | ^3.19.3 | 全栈 Vue 框架,支持 SSR/SSG |
| **Vue 3** | ^3.5.22 | 响应式组件开发 |
| **Capacitor** | ^6.0.0 | 跨平台原生桥接 |
| **Pinia** | ^3.0.3 | 状态管理 |

### 3. UI 组件库

| 技术 | 版本 | 用途 |
|------|------|------|
| **Vant** | ^4.9.21 | 移动端组件库 |
| **Tailwind CSS** | ^6.12.0 | 原子化 CSS |
| **LESS** | ^4.4.2 | CSS 预处理器 |

### 工具库

| 技术 | 版本 | 用途 |
|------|------|------|
| **@nuxtjs/i18n** | ^10.1.0 | 国际化 |
| **dayjs** | ^1.11.18 | 日期处理 |
| **swiper** | ^12.0.2 | 轮播组件 |
| **DOMPurify** | ^3.3.0 | HTML 清理 |
| **clipboard-polyfill** | ^4.1.1 | 剪贴板 |
| **ua-parser-js** | ^2.0.6 | 用户代理解析 |


### 开发工具

| 技术 | 版本 | 用途 |
|------|------|------|
| **TypeScript** | ^5.4.5 | 类型系统 |
| **ESLint** | ^9.4.0 | 代码检查 |
| **@antfu/eslint-config** | ^2.20.0 | ESLint 配置 |

### 6. 其他技术与工具

- **Micro App**：微前端支持（`@micro-zoe/micro-app`），便于系统拆分和独立部署。

## 目录结构与用途

```
capacitor-nuxt-app/
├── pages/                  # Nuxt 自动路由 - 应用页面 (49 个页面)
│   ├── (main)/            # 主应用分组 (底部 Tabbar 导航区域)
│   │   ├── home/         # 首页 - 支持动态主题和多种样式
│   │   │   └── modules/  # 首页子模块 (banner/jackpot/marquee/navBar/rank/sign 等)
│   │   ├── profile/      # 个人资料页
│   │   ├── activity/     # 活动列表
│   │   └── deposit/      # 存款页
│   ├── activity/          # 活动详情页面
│   │   ├── invite/       # 邀请活动 (segments 分段)
│   │   ├── Agency/       # 代理活动 (modules 子模块)
│   │   └── share/        # 分享活动
│   ├── game/             # 游戏相关
│   │   └── search/       # 游戏搜索
│   ├── record/           # 记录页
│   ├── security/         # 安全相关
│   └── withdraw/         # 提现相关
│
├── components/            # 通用可复用组件 (16 个组件)
│   ├── AnimatedNumber/   # 动画数字显示
│   ├── Button/           # 按钮组件
│   ├── CalendarPicker/   # 日历选择器
│   ├── DynamicLayout/    # 动态布局
│   ├── Flag/             # 国旗组件
│   ├── Icon/             # 图标组件
│   ├── Image/            # 图片组件
│   ├── Input/            # 输入框
│   ├── Marquee/          # 跑马灯
│   ├── NavigateBar/      # 导航条
│   ├── Navigation/       # 导航组件
│   ├── PasswordInput/    # 密码输入框
│   ├── RollList/         # 滚动列表
│   ├── Select/           # 选择器
│   ├── SliderTabs/       # 滑块标签
│   └── VipTag/           # VIP 标签
│
├── widgets/              # 业务特定的大型组件 (10 个功能模块)
│   ├── gameCard/         # 游戏卡片
│   ├── gameWrap/         # 游戏包装器
│   ├── iosPwaGuideSheet/ # iOS PWA 引导页
│   ├── languageDialog/   # 语言选择对话框
│   ├── loginPopup/       # 登录弹窗
│   ├── sidebar/          # 侧边栏 (含 banner 子模块)
│   ├── svg/              # SVG 相关组件
│   ├── tabbar/           # 底部 Tabbar
│   ├── verticalInfiniteScrollProps/ # 垂直无限滚动
│   └── vipWrap/          # VIP 包装器
│
├── stores/               # Pinia 状态管理 (12 个 Store)
│   ├── user.ts           # 用户信息、认证、token
│   ├── activity.ts       # 活动相关数据
│   ├── app.ts            # 应用全局状态
│   ├── agent.ts          # 代理商信息
│   ├── device.ts         # 设备信息
│   ├── game.ts           # 游戏列表和状态
│   ├── layout.ts         # 布局状态 (tabbar 高度等)
│   ├── status.ts         # 应用状态 (SSR, loading 等)
│   ├── system.ts         # 系统信息
│   ├── tenant.ts         # 租户信息和主题配置
│   ├── vip.ts            # VIP 相关
│   └── plugins/          # Store 插件 (indexdb 持久化)
│
├── composables/          # Vue Composables - 状态逻辑复用
│   ├── useAuth.ts        # 认证相关 hooks
│   ├── useDevice.ts      # 设备相关 hooks
│   ├── useLazyObserver.ts # 懒加载观察器
│   ├── message.ts        # 消息 hooks
│   └── options.ts        # 选项配置 hooks
│
├── api/                  # API 请求层
│   ├── request.ts        # 核心 HTTP 请求函数
│   ├── types.ts          # API 类型定义
│   └── user/             # 用户相关 API 端点
│
├── utils/                # 工具函数库 (16 个模块)
│   ├── cache.ts          # 缓存管理
│   ├── dialog.ts         # 对话框弹窗
│   ├── event/            # 事件系统
│   ├── format/           # 格式化工具 (number/string)
│   ├── language.ts       # 语言相关
│   ├── library.ts        # 第三方库集成
│   ├── navigation.ts     # 导航跳转
│   ├── purify.ts         # HTML 清理
│   ├── share.ts          # 分享功能
│   ├── time.ts           # 时间工具
│   ├── util.ts           # 通用工具
│   └── validate.ts       # 验证函数
│
├── enums/                # 枚举定义 (13 个文件)
│   ├── activity.ts       # 活动类型
│   ├── country.ts        # 国家
│   ├── currency.ts       # 货币
│   ├── device.ts         # 设备类型
│   ├── icon.ts           # 图标枚举
│   ├── key.ts            # 缓存键
│   ├── language.ts       # 语言
│   ├── path.ts           # 路由路径
│   ├── regular.ts        # 正则表达式
│   ├── time.ts           # 时间枚举
│   └── index.ts          # 导出入口
│
├── i18n/                 # 国际化配置
│   ├── config.ts         # i18n 配置
│   ├── libs/             # 国际化库/组件
│   │   └── activity.ts   # 活动名称多语言库
│   └── locales/          # 语言文件 (7 种语言)
│       ├── en_US.json    # 英语
│       ├── zh_CN.json    # 中文
│       ├── pt_BR.json    # 葡萄牙语
│       ├── id_ID.json    # 印尼语
│       ├── hi_IN.json    # 印地语
│       ├── vi_VN.json    # 越南语
│       └── en_PH.json    # 菲律宾英语
│
├── theme/                # 主题系统
│   ├── index.ts          # ThemeManager 主题管理器
│   ├── type.ts           # 主题类型定义 (20+ 主题)
│   ├── assets.ts         # 资源配置 (图片, 图标)
│   ├── components.ts     # 动态组件配置
│   ├── sprite.ts         # Sprite 雪碧图
│   ├── componentConfig/  # 组件配置预设
│   └── variables/        # CSS 变量
│       ├── color.ts      # 颜色变量
│       └── style_*.css   # 各主题 CSS 变量文件
│
├── storage/              # 存储管理
│   └── indexdb/          # IndexedDB 完整封装
│       ├── indexedDB.ts  # 核心管理类
│       ├── useIndexedDB.ts # 组合式 API
│       └── useIndexedDBCleanup.ts # 过期数据清理
│
├── plugins/              # Nuxt 插件
│   ├── app.client.ts     # 应用初始化
│   ├── indexdb.client.ts # IndexedDB 初始化
│   ├── pinia-indexdb.client.ts # Pinia + IndexedDB 插件
│   └── site-info.global.ts # 全局站点信息
│
├── middleware/           # 路由中间件
│   └── redirect.global.ts # 全局重定向
│
├── layouts/              # 页面布局模板
├── server/               # Nuxt Server API 端点
├── types/                # TypeScript 类型定义
│   ├── global.d.ts       # 全局类型
│   ├── i18n.d.ts         # i18n 类型
│   └── vant.d.ts         # Vant 组件类型
│
├── assets/               # 静态资源
│   ├── css/              # 全局样式
│   │   ├── global.css    # 全局样式
│   │   ├── animate.css   # 动画
│   │   └── root.css      # CSS 变量根定义
│   ├── svg/              # SVG 图标 (按功能分类)
│   │   ├── tabbar/       # Tabbar 图标
│   │   ├── home/         # 首页图标
│   │   └── sort/         # 分类图标
│   └── icons/            # 其他图标资源
│
├── public/               # 公开静态资源
│   └── data/
│       └── tenantInfo.json # 租户配置 (默认语言/主题)
│
├── ios/                  # iOS Capacitor 项目
├── android/              # Android Capacitor 项目
├── dist/                 # 构建输出目录
│
├── nuxt.config.ts        # Nuxt 核心配置
├── capacitor.config.ts   # Capacitor 原生配置
├── tsconfig.json         # TypeScript 配置
├── eslint.config.mjs     # ESLint 配置
├── tailwind.config.ts    # Tailwind CSS 配置
└── package.json          # 项目依赖
```

#### 4. site-info.global.ts

**用途**: 全局站点信息和主题/语言初始化

**功能**:
- 从 `tenantInfo.json` 加载租户配置
- 恢复用户语言偏好 (Cookie → 租户默认 → English)
- 恢复用户主题偏好 (localStorage → 租户默认 → STYLE_25)

**优先级**:
```
语言: Cookie > tenantInfo.appDefaultLanguage > English
主题: localStorage > tenantInfo.skinTwoType > STYLE_25
```

### Vant 插件

通过 `@vant/nuxt` 自动集成:

```typescript
// nuxt.config.ts
modules: [
  '@vant/nuxt',
]
```

**功能**:
- 自动导入 Vant 组件
- 按需加载,减小包体积
- 支持 locale 切换 (与 i18n 联动)

### i18n 插件

通过 `@nuxtjs/i18n` 自动集成:

```typescript
// nuxt.config.ts
i18n: {
  locales: [...],
  defaultLocale: 'en-US',
  strategy: 'no_prefix',
  detectBrowserLanguage: false,
}
```

**功能**:
- 多语言支持
- 语言切换
- 翻译文件懒加载

---

## 多语言实现

### 技术方案

采用 **@nuxtjs/i18n + vue-i18n** 的标准组合:

```typescript
// nuxt.config.ts
i18n: {
  locales: [
    { code: 'en-US', name: 'English', iso: 'en-US', file: 'en_US.json' },
    { code: 'zh-CN', name: '中文', iso: 'zh-CN', file: 'zh_CN.json' },
    // ... 其他语言
  ],
  defaultLocale: 'en-US',
  strategy: 'no_prefix',              // 不使用 URL 前缀
  langDir: 'locales/',
  vueI18n: 'config.ts',
  detectBrowserLanguage: false,       // 禁用浏览器语言检测
  compilation: {
    strictMessage: false,
    escapeHtml: true,                 // 转义 HTML 标签
  },
}
```

### 支持的语言

| 语言代码 | 语言名称 | 文件大小 |
|---------|---------|---------|
| en-US | English | 85 KB |
| zh-CN | 中文 | 76.5 KB |
| pt-BR | Português | 91.7 KB |
| id-ID | Bahasa Indonesia | 89.5 KB |
| hi-IN | हिंदी | 153.7 KB |
| vi-VN | Tiếng Việt | 100 KB |
| en-PH | English (Philippines) | 0.3 KB |

### 语言文件结构

语言文件位于 [i18n/locales/](i18n/locales/),采用 JSON 格式:

```json
// en_US.json
{
  "label": {
    "deposit": "Deposit",
    "language": "Language",
    "phonePlaceholder": "Phone"
  },
  "main": {
    "inicio": "Home",
    "promo": "Offers",
    "entrar": "Deposit",
    "suporte": "Support",
    "perfil": "Profile"
  },
  "11024": "No available channels."
}
```

### 语言切换机制

#### 1. 状态管理

语言状态由 [stores/app.ts](stores/app.ts) 管理:

```typescript
export const useAppStore = defineStore("app", () => {
  const locale = ref<LanguageType>(LanguageSupport[0])

  // 设置 Vant locale
  const setVantLocale = async () => {
    const pack = await import(`vant/es/locale/lang/${locale.value}.mjs`)
    Locale.use(locale.value, pack.default || pack)
  }

  // 设置语言
  const setLocale = (language: string) => {
    const { $i18n } = useNuxtApp()
    const cookieLocale = useCookie("lang")

    locale.value = LanguageSupport.includes(language)
      ? language
      : LanguageSupport[0]

    setVantLocale()                   // 更新 Vant UI 语言
    $i18n.setLocale(locale.value)    // 更新 vue-i18n 语言
    cookieLocale.value = locale.value // 持久化到 Cookie
  }

  return { locale, setLocale }
})
```

#### 2. 初始化流程

```
1. 应用启动
   ↓
2. 插件加载 (site-info.global.ts)
   ↓
3. 读取语言优先级
   - Cookie "lang"
   - tenantInfo.appDefaultLanguage
   - 默认 "en-US"
   ↓
4. 设置语言
   - appStore.setLocale()
   - 更新 Vant locale
   - 更新 vue-i18n locale
```

#### 3. 用户切换语言

通过 [widgets/languageDialog/](widgets/languageDialog/) 组件:

```vue
<template>
  <van-popup v-model:show="visible">
    <van-picker
      :columns="availableLanguages"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script setup>
const appStore = useAppStore()

const onConfirm = (language) => {
  appStore.setLocale(language.code) // 切换语言并持久化
}
</script>
```

### 持久化机制

**Cookie 存储**:
- Cookie 名称: `lang`
- 有效期: 会话级别 (默认)
- 作用域: 全局

**初始化恢复**:
```typescript
// plugins/site-info.global.ts
const cookieLocale = useCookie("lang")
appStore.setLocale(
  cookieLocale.value ||                        // 优先使用 Cookie
  siteInfo.value?.appDefaultLanguage ||        // 其次使用租户配置
  LANGUAGE_REVERSE.English                      // 最后使用默认语言
)
```

### 使用示例

#### 在模板中使用

```vue
<template>
  <!-- 简单翻译 -->
  <h1>{{ $t('label.deposit') }}</h1>

  <!-- 动态路径 -->
  <span>{{ $t(`main.${item.label}`) }}</span>

  <!-- 带参数 -->
  <p>{{ $t('message.welcome', { name: userName }) }}</p>
</template>
```

#### 在脚本中使用

```typescript
<script setup>
const { $i18n } = useNuxtApp()

// 获取翻译
const text = $i18n.t('label.deposit')

// 切换语言
$i18n.setLocale('zh-CN')

// 获取当前语言
const currentLocale = $i18n.locale.value
</script>
```

#### 业务活动名称

使用专用的活动名称库 [i18n/libs/activity.ts](i18n/libs/activity.ts):

```typescript
import { getRechargeActivityName } from "@/i18n/libs/activity"

const activityName = getRechargeActivityName(
  'zh-CN',  // 语言
  'DAILY',  // resetType
  'FIRST'   // rechargeType
)
```

---

## 主题配置

### 主题管理器

主题系统由 [theme/index.ts](theme/index.ts) 中的 `ThemeManager` 类管理。

#### ThemeManager API

```typescript
class ThemeManager {
  // 设置主题
  async setTheme(theme: ThemeType, isInit?: boolean): Promise<void>

  // 预加载主题 (优化性能)
  async preloadTheme(theme: ThemeType): Promise<void>

  // 预加载所有主题
  async preloadAllThemes(): Promise<void>

  // 获取当前主题
  getCurrentTheme(): ThemeType
}

// 全局实例
export const themeManager = new ThemeManager()
```

### 支持的主题

项目支持 **20+ 预定义主题**,定义在 [theme/type.ts](theme/type.ts):

```typescript
export const THEME_TYPE = {
  STYLE_1: "style_1",
  STYLE_2: "style_2",
  // ...
  STYLE_18: "style_18",
  STYLE_25: "style_25",
  // ... 最多 STYLE_50
} as const
```

**常用主题**:
- `STYLE_18`: 经典主题
- `STYLE_25`: 默认主题 (项目默认值)

### 主题变量系统

每个主题都有独立的 CSS 变量文件:

```
theme/variables/
├── style_1.css
├── style_2.css
├── style_18.css
├── style_25.css
└── ...
```

#### 变量分类

主题定义了 **400+ 个 CSS 变量**,涵盖:

**1. 色彩系统 (120+ 变量)**

```css
/* style_25.css */
:root[data-theme="style_25"] {
  /* 重点色 */
  --theme-color-primary: #ff6b00;
  --theme-color-secondary: #4caf50;
  --theme-color-accent: #2196f3;

  /* 透明度变体 */
  --theme-color-primary-light-10: rgba(255, 107, 0, 0.1);
  --theme-color-primary-light-20: rgba(255, 107, 0, 0.2);

  /* 色系梯度 */
  --theme-color-orange-1: #fff7e6;
  --theme-color-orange-5: #ff6b00;
  --theme-color-orange-9: #b34a00;

  /* 中性灰度 */
  --theme-color-gray-1: #f5f5f5;
  --theme-color-gray-9: #1a1a1a;
}
```

**2. 尺寸系统 (20+ 变量)**

```css
--theme-space-xs: 4px;
--theme-space-sm: 8px;
--theme-space-md: 16px;
--theme-space-lg: 24px;
--theme-space-xl: 32px;
```

**3. 排版系统 (10+ 变量)**

```css
--theme-font-family: "Roboto", sans-serif;
--theme-font-size-xs: 12px;
--theme-font-size-sm: 14px;
--theme-font-size-md: 16px;
--theme-font-weight-normal: 400;
--theme-font-weight-bold: 700;
```

**4. 空间系统 (20+ 变量)**

```css
--theme-radius-sm: 4px;
--theme-radius-md: 8px;
--theme-radius-lg: 12px;
--theme-shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
--theme-shadow-md: 0 4px 8px rgba(0,0,0,0.15);
```

**5. 应用变量 (80+ 变量)**

```css
/* 背景色 */
--theme-bg-primary: #ffffff;
--theme-bg-secondary: #f5f5f5;
--theme-bg-tertiary: #e0e0e0;

/* 边框色 */
--theme-border-color: #e0e0e0;
--theme-border-color-light: #f0f0f0;

/* 文本色 */
--theme-text-primary: #333333;
--theme-text-secondary: #666666;
--theme-text-disabled: #999999;

/* 图标色 */
--theme-icon-color: #666666;
--theme-icon-color-active: #ff6b00;
```

### 组件配置

除了 CSS 变量,部分主题还支持组件级配置:

```typescript
// theme/componentConfig/style_25.ts
export const style_25Config = {
  banner: {
    autoplay: true,
    interval: 3000,
    showIndicators: true,
  },
  button: {
    borderRadius: '8px',
    primaryColor: '#ff6b00',
  },
}
```

### 主题切换流程

```
1. 用户选择主题
   ↓
2. themeManager.setTheme(theme)
   ↓
3. 动态导入主题 CSS 文件
   - import(`/theme/variables/${theme}.css`)
   ↓
4. 应用主题到 DOM
   - document.documentElement.setAttribute('data-theme', theme)
   ↓
5. 持久化到 localStorage
   - localStorage.setItem('theme', theme)
   ↓
6. 更新组件配置 (如需要)
```

### 使用示例

#### 在组件中使用主题变量

```vue
<template>
  <div class="custom-box">
    <button class="primary-btn">点击我</button>
  </div>
</template>

<style scoped>
.custom-box {
  background-color: var(--theme-bg-primary);
  border: 1px solid var(--theme-border-color);
  border-radius: var(--theme-radius-md);
  padding: var(--theme-space-md);
}

.primary-btn {
  background-color: var(--theme-color-primary);
  color: var(--theme-text-inverse);
  border-radius: var(--theme-radius-sm);
  padding: var(--theme-space-sm) var(--theme-space-md);
}

.primary-btn:hover {
  background-color: var(--theme-color-primary-dark);
}
</style>
```

#### 切换主题

```typescript
<script setup>
import { themeManager, THEME_TYPE } from '@/theme'

// 切换到 STYLE_18
const switchTheme = () => {
  themeManager.setTheme(THEME_TYPE.STYLE_18)
}

// 获取当前主题
const currentTheme = themeManager.getCurrentTheme()
</script>
```

---

## 多皮肤实现

### 实现原理

多皮肤系统采用 **CSS 变量 + 动态导入** 方案:

1. **CSS 变量**: 使用 `data-theme` 属性选择器隔离样式
2. **动态导入**: 按需懒加载主题 CSS 文件
3. **组件级样式**: 支持每个主题的专属组件样式

### 核心机制

#### 1. 主题 CSS 懒加载

```typescript
// theme/index.ts
class ThemeManager {
  private loadedThemes = new Set<ThemeType>()

  private async loadThemeCSS(theme: ThemeType): Promise<boolean> {
    if (this.loadedThemes.has(theme)) {
      return true // 已加载,直接返回
    }

    try {
      // 动态导入主题 CSS
      await import(`./variables/${theme}.css`)
      this.loadedThemes.add(theme)
      return true
    } catch (error) {
      console.error(`Failed to load theme: ${theme}`, error)
      return false
    }
  }
}
```

#### 2. DOM 属性切换

```typescript
private applyTheme(theme: ThemeType): void {
  document.documentElement.setAttribute('data-theme', theme)
}
```

#### 3. 样式隔离

```css
/* theme/variables/style_25.css */
:root[data-theme="style_25"] {
  --theme-color-primary: #ff6b00;
  --theme-bg-primary: #ffffff;
}

/* theme/variables/style_18.css */
:root[data-theme="style_18"] {
  --theme-color-primary: #4caf50;
  --theme-bg-primary: #f5f5f5;
}
```

### 组件级多皮肤

部分组件支持主题专属样式文件:

```
pages/(main)/home/modules/banner/
├── style_18/
│   ├── index.vue
│   └── index.less
├── style_25/
│   ├── index.vue
│   └── index.less
└── index.vue  (根据主题动态加载对应版本)
```

**动态组件加载**:

```vue
<!-- pages/(main)/home/index.vue -->
<template>
  <component :is="BannerComponent" />
</template>

<script setup>
const tenantStore = useTenantStore()
const theme = computed(() => tenantStore.theme)

const BannerComponent = computed(() => {
  // 根据主题加载对应组件
  return defineAsyncComponent(() =>
    import(`./modules/banner/${theme.value}/index.vue`)
  )
})
</script>
```

### 预加载优化

为避免主题切换时的闪烁,支持预加载:

```typescript
// 预加载单个主题
await themeManager.preloadTheme(THEME_TYPE.STYLE_18)

// 预加载所有主题 (首页空闲时)
await themeManager.preloadAllThemes()
```

### 主题持久化

使用 **localStorage** 持久化用户选择:

```typescript
// theme/index.ts
async setTheme(theme: ThemeType, isInit = false): Promise<void> {
  const success = await this.loadThemeCSS(theme)

  if (success) {
    this.currentTheme = theme
    this.applyTheme(theme)

    if (!isInit) {
      // 仅用户主动切换时才保存
      localStorage.setItem("theme", theme)
    }
  }
}
```

### 租户配置

支持通过 [public/data/tenantInfo.json](public/data/tenantInfo.json) 配置租户默认主题:

```json
{
  "skinTwoType": "style_25",
  "appDefaultLanguage": "en-US"
}
```

### 完整切换流程

```
用户触发切换
   ↓
themeManager.setTheme(newTheme)
   ↓
检查主题是否已加载
   ├─ 已加载 → 直接应用
   └─ 未加载 → 动态 import CSS
       ↓
   成功加载 → 添加到 loadedThemes
       ↓
应用到 DOM
   - setAttribute('data-theme', newTheme)
       ↓
持久化
   - localStorage.setItem('theme', newTheme)
       ↓
更新 Pinia 状态
   - tenantStore.theme = newTheme
       ↓
组件响应式更新
   - 动态组件重新加载
   - CSS 变量自动生效
```

---

## 缓存及持久化封装

项目采用 **多层次、分级别** 的存储方案,满足不同场景需求。

### 存储方案总览

| 存储类型 | 应用场景 | 实现位置 | 特点 |
|---------|--------|--------|-----|
| **IndexedDB** | 状态持久化、数据缓存 | [storage/indexdb/](storage/indexdb/) | 支持过期时间、自动清理 |
| **localStorage** | 主题、语言、配置 | [theme/index.ts](theme/index.ts) | 持久化关键配置 |
| **Cookie** | 用户认证、语言偏好 | [stores/user.ts](stores/user.ts) | 支持自动过期、跨域配置 |
| **内存缓存** | 运行时临时数据 | [utils/cache.ts](utils/cache.ts) | 分类管理、快速查询 |
| **Pinia State** | 应用状态 | [stores/](stores/) | 响应式、自动推导 |

---

### 1. IndexedDB 完整封装

位于 [storage/indexdb/](storage/indexdb/),提供企业级 IndexedDB 管理。

#### 核心文件

**a) indexedDB.ts - 核心管理类**

```typescript
class IndexedDBManager {
  // 数据库配置
  dbName: string
  version: number
  storeName: string

  // 核心方法
  async set<T>(key: string, value: T, expiresIn?: number): Promise<void>
  async get<T>(key: string): Promise<T | null>
  async delete(key: string): Promise<void>
  async clear(): Promise<void>
  async keys(): Promise<string[]>
  async has(key: string): Promise<boolean>
  async size(): Promise<number>
  async cleanup(): Promise<void> // 清理过期数据
  close(): void
}
```

**存储结构**:
```typescript
interface StorageItem<T = any> {
  value: T                    // 实际存储的值
  timestamp: number           // 存储时间戳
  expiresAt?: number         // 过期时间戳 (可选)
}
```

**b) useIndexedDB.ts - 组合式 API**

```typescript
export function useIndexedDB(config?: IndexedDBConfig) {
  const set = async <T>(key: string, value: T, expiresIn?: number)
  const get = async <T>(key: string): Promise<T | null>
  const remove = async (key: string)
  const clear = async ()
  const keys = async (): Promise<string[]>
  const has = async (key: string): Promise<boolean>
  const size = async (): Promise<number>
  const cleanup = async ()
  const close = ()

  return { set, get, remove, clear, keys, has, size, cleanup, close }
}
```

**c) useIndexedDBCleanup.ts - 过期数据清理**

```typescript
export function useIndexedDBCleanup() {
  const startCleanup = ()  // 启动清理定时器 (每小时)
  const stopCleanup = ()   // 停止清理定时器
  const manualCleanup = () // 手动清理

  return { startCleanup, stopCleanup, manualCleanup }
}
```

#### 使用示例

```typescript
<script setup>
import { useIndexedDB } from '@/storage/indexdb'

const { set, get, remove } = useIndexedDB()

// 保存数据 (1 小时后过期)
await set('user:profile', userData, 60 * 60 * 1000)

// 读取数据
const profile = await get('user:profile')

// 删除数据
await remove('user:profile')
</script>
```

---

### 2. 内存缓存工具

位于 [utils/cache.ts](utils/cache.ts),提供高性能的分类型内存缓存。

#### API 接口

```typescript
// 基础操作
export function setCache<T>(type: string, key: string, value: T): void
export function getCache<T>(type: string, key: string): T | undefined
export function getOrSetCache<T>(
  type: string,
  key: string,
  factory: () => T
): T

// 批量操作
export function getCacheKeysByType(type: string): string[]
export function getCacheValuesByType<T>(type: string): T[]
export function getCacheEntriesByType<T>(type: string): Array<[string, T]>

// 管理功能
export function hasCache(type: string, key: string): boolean
export function deleteCache(type: string, key: string): boolean
export function deleteCacheByType(type: string): boolean
export function clearCacheByType(type: string): void
export function clearCache(): void

// 统计信息
export function getCacheStats(): {
  totalTypes: number
  totalItems: number
  types: Record<string, number>
}
```

#### 使用示例

```typescript
import { setCache, getCache, getOrSetCache } from '@/utils/cache'

// 缓存用户数据
setCache('user', 'profile', userProfile)

// 读取缓存
const profile = getCache('user', 'profile')

// 懒加载缓存 (不存在时才创建)
const config = getOrSetCache('app', 'config', () => ({
  theme: 'style_25',
  language: 'en-US',
}))

// 清理特定类型缓存
clearCacheByType('user')
```

---

### 3. Pinia 状态持久化

#### Pinia IndexedDB 插件

位于 [stores/plugins/indexdb.ts](stores/plugins/indexdb.ts),自动持久化 Pinia 状态。

**工作原理**:

```typescript
export function piniaIndexedDBPlugin({ store }: PiniaPluginContext) {
  const config = store.$indexedDB || {}
  const excludeSet = new Set(config.exclude || [])
  const { get, set } = useIndexedDB()
  const key = `pinia-${store.$id}`

  // 1. 初始化时恢复状态
  get(key).then((data) => {
    if (data) {
      store.$patch(data)
    }
  })

  // 2. 自动持久化状态变化
  store.$subscribe((_mutation, state) => {
    const stateToCache = {}

    for (const key in state) {
      // 排除规则:
      // - 私有属性 (_开头)
      // - $indexedDB.exclude 配置的属性
      if (Object.hasOwn(state, key)
        && !key.startsWith("_")
        && !excludeSet.has(key)) {
        stateToCache[key] = state[key]
      }
    }

    set(key, stateToCache)
  })
}
```

**在 Store 中配置**:

```typescript
// stores/status.ts
export const useStatusStore = defineStore("status", () => {
  // 配置不持久化的字段
  const $indexedDB = {
    exclude: [
      "mainLeftDrawerVisible",  // UI 状态不持久化
      "loginPopupVisible",      // 弹窗状态不持久化
    ],
  }

  // 需要持久化的状态
  const iosPwaGuideSheetVisible = ref(false)
  const loginPopupType = ref(0)

  return {
    $indexedDB,
    iosPwaGuideSheetVisible,
    loginPopupType,
  }
})
```

---

### 4. Cookie 持久化

#### 用户认证 Token

```typescript
// stores/user.ts
const token = useCookie("token", {
  default: () => "",
  secure: false,      // Web 环境不需要 HTTPS
  sameSite: "lax",    // 允许第三方 GET 请求发送
  maxAge: 60 * 60 * 24 * 7, // 7 天过期
})
```

#### 语言偏好

```typescript
// stores/app.ts
const cookieLocale = useCookie("lang")

const setLocale = (language: string) => {
  locale.value = language
  cookieLocale.value = language // 持久化
}
```

---

### 5. 完整的数据持久化流程

```
数据源
  ↓
Pinia Store (内存)
  ↓
  ├→ piniaIndexedDBPlugin 监听变化
  │   ↓
  │   IndexedDB 存储 (持久化)
  │
  ├→ Cookie 存储 (认证令牌、语言)
  │
  ├→ localStorage 存储 (主题、配置)
  │
  └→ 内存缓存 (运行时临时数据)

应用重启
  ↓
  ├→ IndexedDB 恢复 Pinia 状态
  │
  ├→ Cookie 自动恢复
  │
  ├→ localStorage 恢复主题
  │
  └→ 应用就绪
```

---

### 6. 过期时间配置

定义在 [enums/time.ts](enums/time.ts):

```typescript
export const EXPIRATION_TIME = {
  MINUTE: 60 * 1000,                    // 60 秒
  HOUR: 60 * 60 * 1000,                 // 1 小时
  DAY: 24 * 60 * 60 * 1000,             // 24 小时
  WEEK: 7 * 24 * 60 * 60 * 1000,        // 7 天
  MONTH: 30 * 24 * 60 * 60 * 1000,      // 30 天
} as const
```

**使用示例**:

```typescript
import { EXPIRATION_TIME } from '@/enums/time'

// 保存数据,1 天后过期
await set("cache:data", data, EXPIRATION_TIME.DAY)
```

---

### 7. 主要特性

| 特性 | 实现 | 说明 |
|-----|-----|------|
| **过期时间管理** | IndexedDB | 支持秒、时、天、周、月级别 |
| **自动清理** | useIndexedDBCleanup | 每小时自动清理过期数据 |
| **选择性持久化** | piniaIndexedDBPlugin | `$indexedDB.exclude` 配置 |
| **私有属性保护** | piniaIndexedDBPlugin | 下划线开头的属性不持久化 |
| **分类缓存** | cache.ts | 按类型分类管理内存缓存 |
| **懒加载** | getOrSetCache | 不存在时才创建 |
| **类型安全** | 所有模块 | 使用 TypeScript 泛型 |
| **事务管理** | IndexedDB | 确保数据一致性 |
| **自动恢复** | 各 plugin | 应用启动时自动恢复 |

---

## 启动与构建

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 开发模式

#### Web 开发

```bash
# CSR (客户端渲染)
npm run dev:csr

# SSR (服务端渲染)
npm run dev
npm run dev:ssr
```
# nuxt.config.ts 配置 devServer 设置开发服务器
开发服务器启动在 `http://0.0.0.0:4000`

#### iOS 开发

```bash
# 仅运行 (需要先 build)
npm run ios

# 构建 + 同步 + 运行 (推荐)
npm run ios:sync
```

**要求**:
- macOS
- Xcode 已安装
- iOS 模拟器或真机

#### Android 开发

```bash
# 仅运行 (需要先 build)
npm run android

# 构建 + 同步 + 运行 (推荐)
npm run android:sync
```

**要求**:
- Android Studio 已安装
- Android SDK 已配置
- Android 模拟器或真机

### 生产构建

```bash
# Web 构建 (CSR)
npm run build

# Web 构建 (SSR)
npm run build:ssr

# Web 构建 + Capacitor 同步
npm run build:csr
```

构建输出位于 [dist/](dist/) 目录。

### 代码检查

```bash
# 检查代码
npm run lint

# 自动修复
npm run lint:fix
```

---

## 项目统计

- **页面总数**: 49 个
- **通用组件**: 16 个
- **业务组件**: 10 个
- **状态管理**: 12 个 Store
- **工具函数**: 16 个模块
- **枚举定义**: 13 个文件
- **国际化语言**: 7 种语言
- **支持主题**: 20+ 主题
- **原生平台**: iOS + Android

---