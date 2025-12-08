import { createRouter, createWebHashHistory } from "vue-router";
import { routes as autoRoutes, handleHotUpdate } from "vue-router/auto-routes";

/** 项目原本就有的路由 */
const originRoutes = [
	{
		path: "/",
		component: () => import("@/views/index.vue"),
		children: [
			{
				path: "",
				component: () => import("@/views/Home/index.vue"),
			},
			// 已使用类型化路由完成自动替换
			// {
			// 	path: "category/:id",
			// 	component: () => import("@/views/category/[id].vue"),
			// },
			{
				path: "category/sub/:id",
				component: () => import("@/views/SubCategory/index.vue"),
			},
			{
				path: "detail/:id",
				component: () => import("@/views/Detail/index.vue"),
			},
			{
				path: "cartlist",
				component: () => import("@/views/CartList/index.vue"),
			},
			{
				path: "checkout",
				component: () => import("@/views/Checkout/index.vue"),
			},
			{
				path: "pay",
				component: () => import("@/views/Pay/index.vue"),
			},
			{
				path: "paycallback", // 注意路径，必须是paycallback
				component: () => import("@/views/Pay/PayBack.vue"),
			},
			{
				path: "member",
				component: () => import("@/views/Member/index.vue"),
				children: [
					{
						path: "",
						component: () => import("@/views/Member/components/UserInfo.vue"),
					},
					{
						path: "order",
						component: () => import("@/views/Member/components/UserOrder.vue"),
					},
				],
			},
		],
	},
	{
		path: "/login",
		component: () => import("@/views/Login/index.vue"),
	},
];

const routes = [...originRoutes, ...autoRoutes];

// console.log(" 看看最终的路由生成了什么？ ", routes);

const router = createRouter({
	/**
	 * @see https://blog.csdn.net/KimBing/article/details/130085256
	 */
	history: createWebHashHistory(),

	// 刷新时，滚动条位置还原
	scrollBehavior: () => ({ left: 0, top: 0 }),

	// https://uvr.esm.is/introduction.html#migrating-an-existing-project
	routes,
});

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
	handleHotUpdate(router);
}

export default router;
