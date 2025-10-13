import { useIndexedDB } from '@/storage/indexdb/useIndexedDB'

export default defineNuxtPlugin(() => {
	// Only execute on client side
	if (import.meta.client) {
		const { cleanup } = useIndexedDB()

		cleanup() // Clean up expired data when app starts
	}
})
