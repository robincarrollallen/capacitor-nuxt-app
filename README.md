# Project Documentation  [简体中文](README.zh-CN.md)

#### Web Preview: https://robincarrollallen.github.io/capacitor-nuxt-app

## Technology Stack Overview

This project is a hybrid mobile application framework based on **Nuxt 3 + Capacitor 6**, supporting iOS/Android native development and Web deployment. The project adopts an enterprise-level architecture design with complete multilingual, multi-theme, state management, and data persistence capabilities, suitable for multi-tenant mobile application scenarios such as gaming, social, and finance.

### 1. Package Manager

- Recommended: `bun` package manager for dependency management and script execution.
- Also supports: `npm`, `yarn`, `pnpm` - any mainstream package manager.

### Core Features

- 🚀 **Cross-platform Support**: Unified development for Web + iOS + Android
- 🎨 **Multi-theme System**: Supports 20+ predefined themes with dynamic switching
- 🌍 **Internationalization**: 7 languages out of the box
- 💾 **Complete Persistence**: IndexedDB + localStorage + Cookie multi-layer storage
- 📱 **Mobile Optimization**: Vant UI + responsive design
- 🔐 **Type Safety**: Comprehensive TypeScript support
- ⚡ **High Performance**: Optional SSR/CSR, automatic routing, component lazy loading

### 2. Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Nuxt 3** | ^3.19.3 | Full-stack Vue framework, supports SSR/SSG |
| **Vue 3** | ^3.5.22 | Reactive component development |
| **Capacitor** | ^6.0.0 | Cross-platform native bridge |
| **Pinia** | ^3.0.3 | State management |

### 3. UI Component Library

| Technology | Version | Purpose |
|------------|---------|---------|
| **Vant** | ^4.9.21 | Mobile component library |
| **Tailwind CSS** | ^6.12.0 | Utility-first CSS |
| **LESS** | ^4.4.2 | CSS preprocessor |

### Utility Libraries

| Technology | Version | Purpose |
|------------|---------|---------|
| **@nuxtjs/i18n** | ^10.1.0 | Internationalization |
| **dayjs** | ^1.11.18 | Date manipulation |
| **swiper** | ^12.0.2 | Carousel component |
| **DOMPurify** | ^3.3.0 | HTML sanitization |
| **clipboard-polyfill** | ^4.1.1 | Clipboard operations |
| **ua-parser-js** | ^2.0.6 | User agent parsing |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **TypeScript** | ^5.4.5 | Type system |
| **ESLint** | ^9.4.0 | Code linting |
| **@antfu/eslint-config** | ^2.20.0 | ESLint configuration |

### 6. Other Technologies & Tools

- **Micro App**: Micro-frontend support (`@micro-zoe/micro-app`) for system splitting and independent deployment.

## Directory Structure & Usage

```
capacitor-nuxt-app/
├── pages/                  # Nuxt auto-routing - Application pages (49 pages)
│   ├── (main)/            # Main app group (bottom Tabbar navigation area)
│   │   ├── home/         # Home - supports dynamic themes and multiple styles
│   │   │   └── modules/  # Home sub-modules (banner/jackpot/marquee/navBar/rank/sign, etc.)
│   │   ├── profile/      # Profile page
│   │   ├── activity/     # Activity list
│   │   └── deposit/      # Deposit page
│   ├── activity/          # Activity detail pages
│   │   ├── invite/       # Invite activity (segments)
│   │   ├── Agency/       # Agency activity (modules)
│   │   └── share/        # Share activity
│   ├── game/             # Game-related
│   │   └── search/       # Game search
│   ├── record/           # Records page
│   ├── security/         # Security-related
│   └── withdraw/         # Withdrawal-related
│
├── components/            # Common reusable components (16 components)
│   ├── AnimatedNumber/   # Animated number display
│   ├── Button/           # Button component
│   ├── CalendarPicker/   # Calendar picker
│   ├── DynamicLayout/    # Dynamic layout
│   ├── Flag/             # Flag component
│   ├── Icon/             # Icon component
│   ├── Image/            # Image component
│   ├── Input/            # Input field
│   ├── Marquee/          # Marquee
│   ├── NavigateBar/      # Navigation bar
│   ├── Navigation/       # Navigation component
│   ├── PasswordInput/    # Password input
│   ├── RollList/         # Rolling list
│   ├── Select/           # Selector
│   ├── SliderTabs/       # Slider tabs
│   └── VipTag/           # VIP tag
│
├── widgets/              # Business-specific large components (10 modules)
│   ├── gameCard/         # Game card
│   ├── gameWrap/         # Game wrapper
│   ├── iosPwaGuideSheet/ # iOS PWA guide
│   ├── languageDialog/   # Language selection dialog
│   ├── loginPopup/       # Login popup
│   ├── sidebar/          # Sidebar (with banner sub-module)
│   ├── svg/              # SVG-related components
│   ├── tabbar/           # Bottom Tabbar
│   ├── verticalInfiniteScrollProps/ # Vertical infinite scroll
│   └── vipWrap/          # VIP wrapper
│
├── stores/               # Pinia state management (12 Stores)
│   ├── user.ts           # User info, auth, token
│   ├── activity.ts       # Activity-related data
│   ├── app.ts            # App global state
│   ├── agent.ts          # Agent info
│   ├── device.ts         # Device info
│   ├── game.ts           # Game list and state
│   ├── layout.ts         # Layout state (tabbar height, etc.)
│   ├── status.ts         # App status (SSR, loading, etc.)
│   ├── system.ts         # System info
│   ├── tenant.ts         # Tenant info and theme config
│   ├── vip.ts            # VIP-related
│   └── plugins/          # Store plugins (IndexedDB persistence)
│
├── composables/          # Vue Composables - state logic reuse
│   ├── useAuth.ts        # Auth-related hooks
│   ├── useDevice.ts      # Device-related hooks
│   ├── useLazyObserver.ts # Lazy load observer
│   ├── message.ts        # Message hooks
│   └── options.ts        # Option config hooks
│
├── api/                  # API request layer
│   ├── request.ts        # Core HTTP request function
│   ├── types.ts          # API type definitions
│   └── user/             # User-related API endpoints
│
├── utils/                # Utility function library (16 modules)
│   ├── cache.ts          # Cache management
│   ├── dialog.ts         # Dialog popups
│   ├── event/            # Event system
│   ├── format/           # Formatting tools (number/string)
│   ├── language.ts       # Language-related
│   ├── library.ts        # Third-party library integration
│   ├── navigation.ts     # Navigation routing
│   ├── purify.ts         # HTML sanitization
│   ├── share.ts          # Share functionality
│   ├── time.ts           # Time utilities
│   ├── util.ts           # General utilities
│   └── validate.ts       # Validation functions
│
├── enums/                # Enum definitions (13 files)
│   ├── activity.ts       # Activity types
│   ├── country.ts        # Countries
│   ├── currency.ts       # Currencies
│   ├── device.ts         # Device types
│   ├── icon.ts           # Icon enums
│   ├── key.ts            # Cache keys
│   ├── language.ts       # Languages
│   ├── path.ts           # Route paths
│   ├── regular.ts        # Regular expressions
│   ├── time.ts           # Time enums
│   └── index.ts          # Export entry
│
├── i18n/                 # Internationalization config
│   ├── config.ts         # i18n configuration
│   ├── libs/             # i18n libraries/components
│   │   └── activity.ts   # Activity name multilingual library
│   └── locales/          # Language files (7 languages)
│       ├── en_US.json    # English
│       ├── zh_CN.json    # Chinese
│       ├── pt_BR.json    # Portuguese
│       ├── id_ID.json    # Indonesian
│       ├── hi_IN.json    # Hindi
│       ├── vi_VN.json    # Vietnamese
│       └── en_PH.json    # Filipino English
│
├── theme/                # Theme system
│   ├── index.ts          # ThemeManager theme manager
│   ├── type.ts           # Theme type definitions (20+ themes)
│   ├── assets.ts         # Asset configuration (images, icons)
│   ├── components.ts     # Dynamic component config
│   ├── sprite.ts         # Sprite sheets
│   ├── componentConfig/  # Component config presets
│   └── variables/        # CSS variables
│       ├── color.ts      # Color variables
│       └── style_*.css   # Theme CSS variable files
│
├── storage/              # Storage management
│   └── indexdb/          # Complete IndexedDB encapsulation
│       ├── indexedDB.ts  # Core management class
│       ├── useIndexedDB.ts # Composable API
│       └── useIndexedDBCleanup.ts # Expired data cleanup
│
├── plugins/              # Nuxt plugins
│   ├── app.client.ts     # App initialization
│   ├── indexdb.client.ts # IndexedDB initialization
│   ├── pinia-indexdb.client.ts # Pinia + IndexedDB plugin
│   └── site-info.global.ts # Global site info
│
├── middleware/           # Route middleware
│   └── redirect.global.ts # Global redirect
│
├── layouts/              # Page layout templates
├── server/               # Nuxt Server API endpoints
├── types/                # TypeScript type definitions
│   ├── global.d.ts       # Global types
│   ├── i18n.d.ts         # i18n types
│   └── vant.d.ts         # Vant component types
│
├── assets/               # Static assets
│   ├── css/              # Global styles
│   │   ├── global.css    # Global styles
│   │   ├── animate.css   # Animations
│   │   └── root.css      # CSS variable root definitions
│   ├── svg/              # SVG icons (categorized by function)
│   │   ├── tabbar/       # Tabbar icons
│   │   ├── home/         # Home icons
│   │   └── sort/         # Sort icons
│   └── icons/            # Other icon resources
│
├── public/               # Public static assets
│   └── data/
│       └── tenantInfo.json # Tenant configuration (default language/theme)
│
├── ios/                  # iOS Capacitor project
├── android/              # Android Capacitor project
├── dist/                 # Build output directory
│
├── nuxt.config.ts        # Nuxt core configuration
├── capacitor.config.ts   # Capacitor native configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json          # Project dependencies
```

#### 4. site-info.global.ts

**Purpose**: Global site information and theme/language initialization

**Features**:
- Load tenant configuration from `tenantInfo.json`
- Restore user language preference (Cookie → Tenant default → English)
- Restore user theme preference (localStorage → Tenant default → STYLE_25)

**Priority**:
```
Language: Cookie > tenantInfo.appDefaultLanguage > English
Theme: localStorage > tenantInfo.skinTwoType > STYLE_25
```

### Vant Plugin

Automatically integrated via `@vant/nuxt`:

```typescript
// nuxt.config.ts
modules: [
  '@vant/nuxt',
]
```

**Features**:
- Auto-import Vant components
- On-demand loading, reduces bundle size
- Supports locale switching (linked with i18n)

### i18n Plugin

Automatically integrated via `@nuxtjs/i18n`:

```typescript
// nuxt.config.ts
i18n: {
  locales: [...],
  defaultLocale: 'en-US',
  strategy: 'no_prefix',
  detectBrowserLanguage: false,
}
```

**Features**:
- Multi-language support
- Language switching
- Lazy loading of translation files

---

## Multilingual Implementation

### Technical Approach

Uses the standard **@nuxtjs/i18n + vue-i18n** combination:

```typescript
// nuxt.config.ts
i18n: {
  locales: [
    { code: 'en-US', name: 'English', iso: 'en-US', file: 'en_US.json' },
    { code: 'zh-CN', name: '中文', iso: 'zh-CN', file: 'zh_CN.json' },
    // ... other languages
  ],
  defaultLocale: 'en-US',
  strategy: 'no_prefix',              // No URL prefix
  langDir: 'locales/',
  vueI18n: 'config.ts',
  detectBrowserLanguage: false,       // Disable browser language detection
  compilation: {
    strictMessage: false,
    escapeHtml: true,                 // Escape HTML tags
  },
}
```

### Supported Languages

| Language Code | Language Name | File Size |
|--------------|---------------|-----------|
| en-US | English | 85 KB |
| zh-CN | 中文 | 76.5 KB |
| pt-BR | Português | 91.7 KB |
| id-ID | Bahasa Indonesia | 89.5 KB |
| hi-IN | हिंदी | 153.7 KB |
| vi-VN | Tiếng Việt | 100 KB |
| en-PH | English (Philippines) | 0.3 KB |

### Language File Structure

Language files are located in [i18n/locales/](i18n/locales/), using JSON format:

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

### Language Switching Mechanism

#### 1. State Management

Language state is managed by [stores/app.ts](stores/app.ts):

```typescript
export const useAppStore = defineStore("app", () => {
  const locale = ref<LanguageType>(LanguageSupport[0])

  // Set Vant locale
  const setVantLocale = async () => {
    const pack = await import(`vant/es/locale/lang/${locale.value}.mjs`)
    Locale.use(locale.value, pack.default || pack)
  }

  // Set language
  const setLocale = (language: string) => {
    const { $i18n } = useNuxtApp()
    const cookieLocale = useCookie("lang")

    locale.value = LanguageSupport.includes(language)
      ? language
      : LanguageSupport[0]

    setVantLocale()                   // Update Vant UI language
    $i18n.setLocale(locale.value)    // Update vue-i18n language
    cookieLocale.value = locale.value // Persist to Cookie
  }

  return { locale, setLocale }
})
```

#### 2. Initialization Flow

```
1. App startup
   ↓
2. Plugin loading (site-info.global.ts)
   ↓
3. Read language priority
   - Cookie "lang"
   - tenantInfo.appDefaultLanguage
   - Default "en-US"
   ↓
4. Set language
   - appStore.setLocale()
   - Update Vant locale
   - Update vue-i18n locale
```

#### 3. User Language Switching

Via [widgets/languageDialog/](widgets/languageDialog/) component:

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
  appStore.setLocale(language.code) // Switch language and persist
}
</script>
```

### Persistence Mechanism

**Cookie Storage**:
- Cookie name: `lang`
- Expiry: Session-level (default)
- Scope: Global

**Initialization Recovery**:
```typescript
// plugins/site-info.global.ts
const cookieLocale = useCookie("lang")
appStore.setLocale(
  cookieLocale.value ||                        // Prefer Cookie
  siteInfo.value?.appDefaultLanguage ||        // Then tenant config
  LANGUAGE_REVERSE.English                      // Finally default language
)
```

### Usage Examples

#### In Templates

```vue
<template>
  <!-- Simple translation -->
  <h1>{{ $t('label.deposit') }}</h1>

  <!-- Dynamic path -->
  <span>{{ $t(`main.${item.label}`) }}</span>

  <!-- With parameters -->
  <p>{{ $t('message.welcome', { name: userName }) }}</p>
</template>
```

#### In Scripts

```typescript
<script setup>
const { $i18n } = useNuxtApp()

// Get translation
const text = $i18n.t('label.deposit')

// Switch language
$i18n.setLocale('zh-CN')

// Get current language
const currentLocale = $i18n.locale.value
</script>
```

#### Business Activity Names

Use dedicated activity name library [i18n/libs/activity.ts](i18n/libs/activity.ts):

```typescript
import { getRechargeActivityName } from "@/i18n/libs/activity"

const activityName = getRechargeActivityName(
  'zh-CN',  // Language
  'DAILY',  // resetType
  'FIRST'   // rechargeType
)
```

---

## Theme Configuration

### Theme Manager

The theme system is managed by the `ThemeManager` class in [theme/index.ts](theme/index.ts).

#### ThemeManager API

```typescript
class ThemeManager {
  // Set theme
  async setTheme(theme: ThemeType, isInit?: boolean): Promise<void>

  // Preload theme (performance optimization)
  async preloadTheme(theme: ThemeType): Promise<void>

  // Preload all themes
  async preloadAllThemes(): Promise<void>

  // Get current theme
  getCurrentTheme(): ThemeType
}

// Global instance
export const themeManager = new ThemeManager()
```

### Supported Themes

The project supports **20+ predefined themes**, defined in [theme/type.ts](theme/type.ts):

```typescript
export const THEME_TYPE = {
  STYLE_1: "style_1",
  STYLE_2: "style_2",
  // ...
  STYLE_18: "style_18",
  STYLE_25: "style_25",
  // ... up to STYLE_50
} as const
```

**Common Themes**:
- `STYLE_18`: Classic theme
- `STYLE_25`: Default theme (project default)

### Theme Variable System

Each theme has its own CSS variable file:

```
theme/variables/
├── style_1.css
├── style_2.css
├── style_18.css
├── style_25.css
└── ...
```

#### Variable Categories

Themes define **400+ CSS variables**, covering:

**1. Color System (120+ variables)**

```css
/* style_25.css */
:root[data-theme="style_25"] {
  /* Primary colors */
  --theme-color-primary: #ff6b00;
  --theme-color-secondary: #4caf50;
  --theme-color-accent: #2196f3;

  /* Transparency variants */
  --theme-color-primary-light-10: rgba(255, 107, 0, 0.1);
  --theme-color-primary-light-20: rgba(255, 107, 0, 0.2);

  /* Color gradients */
  --theme-color-orange-1: #fff7e6;
  --theme-color-orange-5: #ff6b00;
  --theme-color-orange-9: #b34a00;

  /* Neutral grayscale */
  --theme-color-gray-1: #f5f5f5;
  --theme-color-gray-9: #1a1a1a;
}
```

**2. Size System (20+ variables)**

```css
--theme-space-xs: 4px;
--theme-space-sm: 8px;
--theme-space-md: 16px;
--theme-space-lg: 24px;
--theme-space-xl: 32px;
```

**3. Typography System (10+ variables)**

```css
--theme-font-family: "Roboto", sans-serif;
--theme-font-size-xs: 12px;
--theme-font-size-sm: 14px;
--theme-font-size-md: 16px;
--theme-font-weight-normal: 400;
--theme-font-weight-bold: 700;
```

**4. Spacing System (20+ variables)**

```css
--theme-radius-sm: 4px;
--theme-radius-md: 8px;
--theme-radius-lg: 12px;
--theme-shadow-sm: 0 2px 4px rgba(0,0,0,0.1);
--theme-shadow-md: 0 4px 8px rgba(0,0,0,0.15);
```

**5. Application Variables (80+ variables)**

```css
/* Background colors */
--theme-bg-primary: #ffffff;
--theme-bg-secondary: #f5f5f5;
--theme-bg-tertiary: #e0e0e0;

/* Border colors */
--theme-border-color: #e0e0e0;
--theme-border-color-light: #f0f0f0;

/* Text colors */
--theme-text-primary: #333333;
--theme-text-secondary: #666666;
--theme-text-disabled: #999999;

/* Icon colors */
--theme-icon-color: #666666;
--theme-icon-color-active: #ff6b00;
```

### Component Configuration

In addition to CSS variables, some themes support component-level configuration:

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

### Theme Switching Flow

```
1. User selects theme
   ↓
2. themeManager.setTheme(theme)
   ↓
3. Dynamically import theme CSS file
   - import(`/theme/variables/${theme}.css`)
   ↓
4. Apply theme to DOM
   - document.documentElement.setAttribute('data-theme', theme)
   ↓
5. Persist to localStorage
   - localStorage.setItem('theme', theme)
   ↓
6. Update component config (if needed)
```

### Usage Examples

#### Using Theme Variables in Components

```vue
<template>
  <div class="custom-box">
    <button class="primary-btn">Click me</button>
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

#### Switching Themes

```typescript
<script setup>
import { themeManager, THEME_TYPE } from '@/theme'

// Switch to STYLE_18
const switchTheme = () => {
  themeManager.setTheme(THEME_TYPE.STYLE_18)
}

// Get current theme
const currentTheme = themeManager.getCurrentTheme()
</script>
```

---

## Multi-skin Implementation

### Implementation Principles

The multi-skin system uses **CSS Variables + Dynamic Import** approach:

1. **CSS Variables**: Uses `data-theme` attribute selector for style isolation
2. **Dynamic Import**: Lazy loads theme CSS files on demand
3. **Component-level Styles**: Supports theme-specific component styles

### Core Mechanisms

#### 1. Theme CSS Lazy Loading

```typescript
// theme/index.ts
class ThemeManager {
  private loadedThemes = new Set<ThemeType>()

  private async loadThemeCSS(theme: ThemeType): Promise<boolean> {
    if (this.loadedThemes.has(theme)) {
      return true // Already loaded, return directly
    }

    try {
      // Dynamically import theme CSS
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

#### 2. DOM Attribute Switching

```typescript
private applyTheme(theme: ThemeType): void {
  document.documentElement.setAttribute('data-theme', theme)
}
```

#### 3. Style Isolation

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

### Component-level Multi-skin

Some components support theme-specific style files:

```
pages/(main)/home/modules/banner/
├── style_18/
│   ├── index.vue
│   └── index.less
├── style_25/
│   ├── index.vue
│   └── index.less
└── index.vue  (dynamically loads corresponding version based on theme)
```

**Dynamic Component Loading**:

```vue
<!-- pages/(main)/home/index.vue -->
<template>
  <component :is="BannerComponent" />
</template>

<script setup>
const tenantStore = useTenantStore()
const theme = computed(() => tenantStore.theme)

const BannerComponent = computed(() => {
  // Load corresponding component based on theme
  return defineAsyncComponent(() =>
    import(`./modules/banner/${theme.value}/index.vue`)
  )
})
</script>
```

### Preload Optimization

To avoid flickering during theme switching, preloading is supported:

```typescript
// Preload single theme
await themeManager.preloadTheme(THEME_TYPE.STYLE_18)

// Preload all themes (during homepage idle time)
await themeManager.preloadAllThemes()
```

### Theme Persistence

Uses **localStorage** to persist user choice:

```typescript
// theme/index.ts
async setTheme(theme: ThemeType, isInit = false): Promise<void> {
  const success = await this.loadThemeCSS(theme)

  if (success) {
    this.currentTheme = theme
    this.applyTheme(theme)

    if (!isInit) {
      // Only save when user actively switches
      localStorage.setItem("theme", theme)
    }
  }
}
```

### Tenant Configuration

Supports configuring tenant default theme via [public/data/tenantInfo.json](public/data/tenantInfo.json):

```json
{
  "skinTwoType": "style_25",
  "appDefaultLanguage": "en-US"
}
```

### Complete Switching Flow

```
User triggers switch
   ↓
themeManager.setTheme(newTheme)
   ↓
Check if theme is already loaded
   ├─ Loaded → Apply directly
   └─ Not loaded → Dynamically import CSS
       ↓
   Successfully loaded → Add to loadedThemes
       ↓
Apply to DOM
   - setAttribute('data-theme', newTheme)
       ↓
Persist
   - localStorage.setItem('theme', newTheme)
       ↓
Update Pinia state
   - tenantStore.theme = newTheme
       ↓
Components reactively update
   - Dynamic components reload
   - CSS variables automatically take effect
```

---

## Cache & Persistence Encapsulation

The project adopts a **multi-layer, multi-level** storage solution to meet different scenario requirements.

### Storage Solution Overview

| Storage Type | Use Cases | Implementation Location | Features |
|--------------|-----------|------------------------|----------|
| **IndexedDB** | State persistence, data cache | [storage/indexdb/](storage/indexdb/) | Supports expiration time, auto cleanup |
| **localStorage** | Theme, language, config | [theme/index.ts](theme/index.ts) | Persists key configurations |
| **Cookie** | User auth, language preference | [stores/user.ts](stores/user.ts) | Supports auto expiration, cross-domain config |
| **Memory Cache** | Runtime temporary data | [utils/cache.ts](utils/cache.ts) | Categorized management, fast queries |
| **Pinia State** | App state | [stores/](stores/) | Reactive, auto inference |

---

### 1. Complete IndexedDB Encapsulation

Located in [storage/indexdb/](storage/indexdb/), provides enterprise-level IndexedDB management.

#### Core Files

**a) indexedDB.ts - Core Management Class**

```typescript
class IndexedDBManager {
  // Database config
  dbName: string
  version: number
  storeName: string

  // Core methods
  async set<T>(key: string, value: T, expiresIn?: number): Promise<void>
  async get<T>(key: string): Promise<T | null>
  async delete(key: string): Promise<void>
  async clear(): Promise<void>
  async keys(): Promise<string[]>
  async has(key: string): Promise<boolean>
  async size(): Promise<number>
  async cleanup(): Promise<void> // Clean expired data
  close(): void
}
```

**Storage Structure**:
```typescript
interface StorageItem<T = any> {
  value: T                    // Actual stored value
  timestamp: number           // Storage timestamp
  expiresAt?: number         // Expiration timestamp (optional)
}
```

**b) useIndexedDB.ts - Composable API**

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

**c) useIndexedDBCleanup.ts - Expired Data Cleanup**

```typescript
export function useIndexedDBCleanup() {
  const startCleanup = ()  // Start cleanup timer (every hour)
  const stopCleanup = ()   // Stop cleanup timer
  const manualCleanup = () // Manual cleanup

  return { startCleanup, stopCleanup, manualCleanup }
}
```

#### Usage Examples

```typescript
<script setup>
import { useIndexedDB } from '@/storage/indexdb'

const { set, get, remove } = useIndexedDB()

// Save data (expires in 1 hour)
await set('user:profile', userData, 60 * 60 * 1000)

// Read data
const profile = await get('user:profile')

// Delete data
await remove('user:profile')
</script>
```

---

### 2. Memory Cache Tool

Located in [utils/cache.ts](utils/cache.ts), provides high-performance categorized memory cache.

#### API Interface

```typescript
// Basic operations
export function setCache<T>(type: string, key: string, value: T): void
export function getCache<T>(type: string, key: string): T | undefined
export function getOrSetCache<T>(
  type: string,
  key: string,
  factory: () => T
): T

// Batch operations
export function getCacheKeysByType(type: string): string[]
export function getCacheValuesByType<T>(type: string): T[]
export function getCacheEntriesByType<T>(type: string): Array<[string, T]>

// Management functions
export function hasCache(type: string, key: string): boolean
export function deleteCache(type: string, key: string): boolean
export function deleteCacheByType(type: string): boolean
export function clearCacheByType(type: string): void
export function clearCache(): void

// Statistics
export function getCacheStats(): {
  totalTypes: number
  totalItems: number
  types: Record<string, number>
}
```

#### Usage Examples

```typescript
import { setCache, getCache, getOrSetCache } from '@/utils/cache'

// Cache user data
setCache('user', 'profile', userProfile)

// Read cache
const profile = getCache('user', 'profile')

// Lazy load cache (create only if doesn't exist)
const config = getOrSetCache('app', 'config', () => ({
  theme: 'style_25',
  language: 'en-US',
}))

// Clear specific type cache
clearCacheByType('user')
```

---

### 3. Pinia State Persistence

#### Pinia IndexedDB Plugin

Located in [stores/plugins/indexdb.ts](stores/plugins/indexdb.ts), automatically persists Pinia state.

**How it works**:

```typescript
export function piniaIndexedDBPlugin({ store }: PiniaPluginContext) {
  const config = store.$indexedDB || {}
  const excludeSet = new Set(config.exclude || [])
  const { get, set } = useIndexedDB()
  const key = `pinia-${store.$id}`

  // 1. Restore state on initialization
  get(key).then((data) => {
    if (data) {
      store.$patch(data)
    }
  })

  // 2. Auto-persist state changes
  store.$subscribe((_mutation, state) => {
    const stateToCache = {}

    for (const key in state) {
      // Exclusion rules:
      // - Private properties (starting with _)
      // - Properties in $indexedDB.exclude config
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

**Configure in Store**:

```typescript
// stores/status.ts
export const useStatusStore = defineStore("status", () => {
  // Configure fields not to persist
  const $indexedDB = {
    exclude: [
      "mainLeftDrawerVisible",  // UI state not persisted
      "loginPopupVisible",      // Popup state not persisted
    ],
  }

  // State to persist
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

### 4. Cookie Persistence

#### User Authentication Token

```typescript
// stores/user.ts
const token = useCookie("token", {
  default: () => "",
  secure: false,      // HTTPS not required for Web
  sameSite: "lax",    // Allow third-party GET requests
  maxAge: 60 * 60 * 24 * 7, // Expires in 7 days
})
```

#### Language Preference

```typescript
// stores/app.ts
const cookieLocale = useCookie("lang")

const setLocale = (language: string) => {
  locale.value = language
  cookieLocale.value = language // Persist
}
```

---

### 5. Complete Data Persistence Flow

```
Data Source
  ↓
Pinia Store (Memory)
  ↓
  ├→ piniaIndexedDBPlugin listens for changes
  │   ↓
  │   IndexedDB storage (persistent)
  │
  ├→ Cookie storage (auth token, language)
  │
  ├→ localStorage storage (theme, config)
  │
  └→ Memory cache (runtime temporary data)

App Restart
  ↓
  ├→ IndexedDB restores Pinia state
  │
  ├→ Cookie auto-restores
  │
  ├→ localStorage restores theme
  │
  └→ App ready
```

---

### 6. Expiration Time Configuration

Defined in [enums/time.ts](enums/time.ts):

```typescript
export const EXPIRATION_TIME = {
  MINUTE: 60 * 1000,                    // 60 seconds
  HOUR: 60 * 60 * 1000,                 // 1 hour
  DAY: 24 * 60 * 60 * 1000,             // 24 hours
  WEEK: 7 * 24 * 60 * 60 * 1000,        // 7 days
  MONTH: 30 * 24 * 60 * 60 * 1000,      // 30 days
} as const
```

**Usage Example**:

```typescript
import { EXPIRATION_TIME } from '@/enums/time'

// Save data, expires in 1 day
await set("cache:data", data, EXPIRATION_TIME.DAY)
```

---

### 7. Key Features

| Feature | Implementation | Description |
|---------|---------------|-------------|
| **Expiration Time Management** | IndexedDB | Supports second, hour, day, week, month levels |
| **Auto Cleanup** | useIndexedDBCleanup | Auto-cleans expired data every hour |
| **Selective Persistence** | piniaIndexedDBPlugin | `$indexedDB.exclude` config |
| **Private Property Protection** | piniaIndexedDBPlugin | Properties starting with _ not persisted |
| **Categorized Cache** | cache.ts | Manages memory cache by type |
| **Lazy Loading** | getOrSetCache | Creates only when doesn't exist |
| **Type Safety** | All modules | Uses TypeScript generics |
| **Transaction Management** | IndexedDB | Ensures data consistency |
| **Auto Recovery** | Various plugins | Auto-restores on app startup |

---

## Startup & Build

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development Mode

#### Web Development

```bash
# CSR (Client-side rendering)
npm run dev
npm run dev:csr

# SSR (Server-side rendering)
npm run dev:ssr
```

# nuxt.config.ts / devServer Setting up the development server
Development server starts at `http://0.0.0.0:4000`

#### iOS Development

```bash
# Run only (requires prior build)
npm run ios

# Build + Sync + Run (recommended)
npm run ios:sync
```

**Requirements**:
- macOS
- Xcode installed
- iOS Simulator or physical device

#### Android Development

```bash
# Run only (requires prior build)
npm run android

# Build + Sync + Run (recommended)
npm run android:sync
```

**Requirements**:
- Android Studio installed
- Android SDK configured
- Android Emulator or physical device

### Production Build

```bash
# Web build (CSR)
npm run build

# Web build (SSR)
npm run build:ssr

# Web build + Capacitor sync
npm run build:csr
```

Build output is in the [dist/](dist/) directory.

### Code Linting

```bash
# Check code
npm run lint

# Auto-fix
npm run lint:fix
```

---

## Project Statistics

- **Total Pages**: 49
- **Common Components**: 16
- **Business Components**: 10
- **State Management**: 12 Stores
- **Utility Functions**: 16 modules
- **Enum Definitions**: 13 files
- **i18n Languages**: 7 languages
- **Supported Themes**: 20+ themes
- **Native Platforms**: iOS + Android

---
