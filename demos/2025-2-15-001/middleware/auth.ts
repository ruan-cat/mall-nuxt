export default defineNuxtRouteMiddleware((to) => {
	const userStore = useUserStore();

	// 需要登录的路由
	const authRoutes = ["/member", "/cart", "/checkout"];

	if (authRoutes.includes(to.path) && !userStore.userInfo.token) {
		return navigateTo({
			path: "/login",
			replace: true,
			query: {
				redirect: to.fullPath,
			},
		});
	}
});
