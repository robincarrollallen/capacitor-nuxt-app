import type { ModuleOptions } from "@nuxtjs/i18n"

declare module "nuxt/schema" {
  interface NuxtConfig { i18n?: ModuleOptions }
  interface NuxtOptions { i18n?: ModuleOptions }
}
