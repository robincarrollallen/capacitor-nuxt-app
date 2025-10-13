import { piniaIndexedDBPlugin } from '@/stores/plugins/indexdb'
import type { Pinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
	const pinia = nuxtApp.$pinia as Pinia
	pinia.use(piniaIndexedDBPlugin)
})
