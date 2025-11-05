import { MAIN_PATH } from "@/enums/path"

// Redirect middleware <Middleware is executed every time the route is redirected>
export default defineNuxtRouteMiddleware((to, from) => {
  const statusStore = useStatusStore()
  const userStore = useUserStore()

  if (to.path === "/") {
    return navigateTo(MAIN_PATH.HOME)
  }

  if (!userStore.token && to.meta.auto !== false) {
    statusStore.showLoginPopup(from.path)
    return abortNavigation({
      statusCode: 401,
      statusMessage: 'Unauthorized',  // 简短的 HTTP 状态消息
      message: 'Please login to access this page',  // 详细的错误信息，浏览器会显示给用户
      fatal: false  // false: 可恢复的错误，true: 不可恢复的错误，浏览器会显示错误页面
    })
  }

  // if (import.meta.client) {
  // 	if (!userStore.token && to.meta.auto !== false) {
  // 		statusStore.showLoginPopup()
  // 		if (from.meta.auto !== false) {
  // 			return abortNavigation()
  // 		} else {
  // 			return navigateTo('/main/home')
  // 		}
  // 	}
  // }
})
