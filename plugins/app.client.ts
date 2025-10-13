// Execute immediately when the plugin starts
export default defineNuxtPlugin(() => {
	const systemStore = useSystemStore()

	// Execute the logic that needs to wait for Nuxt to be fully initialized here
	onNuxtReady(() => {
		systemStore.updateScreenSize()
		window.addEventListener('resize', systemStore.updateScreenSize)
	})
})
