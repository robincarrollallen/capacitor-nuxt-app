import type { Pinia } from "pinia"
import { piniaIndexedDBPlugin } from "@/stores/plugins/indexdb"

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = nuxtApp.$pinia as Pinia
  pinia.use(piniaIndexedDBPlugin)
})
