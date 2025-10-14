declare module "nuxt/schema" {
  interface NuxtConfig { i18n?: ModuleOptions }
  interface NuxtOptions { i18n?: ModuleOptions }
  interface RuntimeConfig { public: { ssr: boolean } }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $t: Composer["t"]
  }
}
