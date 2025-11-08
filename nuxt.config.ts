import { LANGUAGE_REVERSE, LANGUAGE_TYPE } from "./enums"

export default defineNuxtConfig({
  // @ts-expect-error - ssr option type issue
  ssr: process.env.NUXT_SSR === "true",

  devtools: { enabled: false },

  nitro: {
    output: { publicDir: "dist" },
    prerender: {
      routes: [],
      crawlLinks: false,
      failOnError: false,
      ignore: ["/"],
    },
  },

  spaLoadingTemplate: false,

  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@nuxtjs/i18n", "@pinia/nuxt", "@vant/nuxt"],

  eslint: { config: { standalone: false } },

  tailwindcss: { viewer: false },

  devServer: {
    port: 4000, // 开发服务器端口
    host: "0.0.0.0", // 开发服务器主机
    https: false, // 开发服务器是否使用 HTTPS
  },

  i18n: {
    locales: Object.entries(LANGUAGE_TYPE).map(([code, name]) => ({
      code,
      name,
      iso: code,
      file: `${code.split("-")[0]}_${code.split("-")[1].toUpperCase()}.json`,
    })),
    defaultLocale: LANGUAGE_REVERSE.English,
    strategy: "no_prefix", // 路由策略
    langDir: "locales/", // 语言文件目录
    vueI18n: "config.ts", //
    detectBrowserLanguage: false, // 检测浏览器语言
    compilation: {
      strictMessage: false, // 不严格检查消息格式
      escapeHtml: true, // 转义 HTML 标签
    },
  },

  vant: {
    lazyload: {
      lazyComponent: true,
    },
  },

  css: ["swiper/css", "swiper/css/autoplay", "swiper/css/pagination"],

  runtimeConfig: {
    public: {
      apiBase: "", // 对应 NUXT_PUBLIC_API_BASE
      ssr: process.env.NUXT_SSR === "true",
    },
  },

  app: {
    head: {
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
        },
      ],
    },
  },
})
