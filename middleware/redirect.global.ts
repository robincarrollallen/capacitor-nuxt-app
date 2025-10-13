// Redirect middleware <Middleware is executed every time the route is redirected>
export default defineNuxtRouteMiddleware((to, _from) => {
  // const statusStore = useStatusStore()
  // const { isAuthenticated } = useAuth()

  if (to.path === "/") {
    return navigateTo("/home")
  }

  // if (import.meta.client) {
  // 	if (!isAuthenticated.value && to.meta.auto !== false) {
  // 		statusStore.showLoginPopup()
  // 		if (from.meta.auto !== false) {
  // 			return abortNavigation()
  // 		} else {
  // 			return navigateTo('/main/home')
  // 		}
  // 	}
  // }
})
