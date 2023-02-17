export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('token')
    const user = useCookie('user')
    if (!token.value || !user.value) {
      return navigateTo('/login')
    }
  })
  