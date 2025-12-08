import { dirname, resolve } from "node:path";
import { fileURLToPath, URL } from "node:url";
import * as fs from "node:fs";

import { upperFirst } from "lodash-es";
import { type UserConfig, type ConfigEnv, loadEnv, defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/**
 * 用全量导入的方式 获取类型
 * 这些类型不能写成export导入的形式，会导致全局类型声明失效
 *
 * 也可以等效地用 三斜线表达式 实现全量导入
 * <reference types="./types/env.shim.d.ts" />
 */
import "./types/env.shim.d.ts";

import { getRouteName } from "@ruan-cat/utils/unplugin-vue-router";

// 引入插件
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import VueRouter from "unplugin-vue-router/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import { createPlugin, getName } from "vite-plugin-autogeneration-import-file";

const { autoImport } = createPlugin();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
function pathResolve(dir: string) {
	const resPath = resolve(__dirname, ".", dir);
	return resPath;
}

// https://vitejs.dev/config/
export default defineConfig(function ({ mode }: ConfigEnv): UserConfig {
	// 提供类型声明 便于得到使用提示
	const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv;

	const VITE_proxy_prefix = env.VITE_proxy_prefix;
	const VITE_APP_API_URL = env.VITE_base_url;
	const VITE_app_port = env.VITE_app_port;

	return {
		server: {
			// 允许IP访问
			host: "0.0.0.0",
			// 应用端口 (默认:3000)
			port: Number(VITE_app_port),
			// 运行是否自动打开浏览器
			open: true,
			proxy: {
				/**
				 * VITE_APP_BASE_API: /dev-api
				 */
				[VITE_proxy_prefix]: {
					changeOrigin: true,
					// 接口地址
					target: VITE_APP_API_URL,
					rewrite: (path) => path.replace(new RegExp("^" + VITE_proxy_prefix), ""),
				},
			},
		},

		plugins: [
			/**
			 * 类型化路由插件
			 * @description
			 * 其定义位置必须在 `@vitejs/plugin-vue` 插件之前。
			 *
			 * @see https://uvr.esm.is/introduction.html#installation
			 */
			VueRouter({
				dts: "./types/typed-router.d.ts",
				routesFolder: [
					{
						/**
						 * 在我们项目中，页面放在 views 文件夹下。
						 *
						 * 文档建议是写在pages内
						 * src: "src/pages",
						 */
						src: "src/views",
						// 下面的配置暂时不使用
						// override globals
						// exclude: (excluded) => excluded,
						// filePatterns: (filePatterns) => filePatterns,
						// extensions: (extensions) => extensions,
					},
				],
				getRouteName,
			}),

			/**
			 * 打包体积分析插件
			 * @description
			 * 项目跑不起来 暂时不需要分析工具
			 */
			// visualizer({
			// 	filename: "./dist/visualizer/index.html",
			// 	title: "visualizer打包分析报告",
			// 	template: "network",
			// }),

			vue(),

			/**
			 * 自动生成类型声明文件插件
			 */
			autoImport([
				{
					pattern: ["**/*.vue"],

					// 监听的文件夹
					dir: pathResolve("src/components"),

					// 生成的文件
					// FIXME: 当不包含文件路径时，就出现错误 如果没有预先准备好文件夹，就会生成失败。
					toFile: pathResolve("types/components-instance.d.ts"),

					// 文件生成模板
					template: fs.readFileSync(pathResolve("template/components.template.d.ts"), "utf-8"),

					codeTemplates: [
						{
							key: "//typeCode",
							template: 'type {{name}}Instance = InstanceType<typeof import("{{path}}")["default"]>;\n  ',
						},
					],

					/**
					 * 组件名命名规则支持字符串模板和函数
					 * @description
					 * 设置首字母为大写
					 */
					name(fileName) {
						const resFileName = getName(fileName);
						const upperFirstFileName = upperFirst(resFileName);
						// console.log(" in name", upperFirstFileName);
						return upperFirstFileName;
					},
				},
			]),

			// 配置插件
			AutoImport({
				imports: [
					VueRouterAutoImports,
					"vue",
					"@vueuse/core",
					"pinia",

					// TODO: 尝试手动实现第三方包的api导入，发现配置起来很难受 故暂时不考虑手动逐步地添加api
					// 疑似有性能问题 项目启动慢
					{
						imports: ["debounce", "throttle"],
						from: "lodash-es",
						// 该配置会生成typescript类型，不符合我们的期望
						// type: true,
					},
					// {
					// 	"lodash-es": ["debounce", "throttle"],
					// },
					{
						"@ruan-cat/utils": ["isConditionsEvery", "isConditionsSome"],
					},
					{
						"@vueuse/integrations/useAxios": [
							"useAxios",
							// ["UseAxiosOptions", "UseAxiosOptionsaAlias"],
							// ["UseAxiosReturn", "UseAxiosReturnAlias"],
						],
					},
					{
						from: "@vueuse/integrations/useAxios.d.ts",
						type: true,
						imports: [
							// "UseAxiosOptions", "UseAxiosReturn",
							{
								name: "UseAxiosOptions",
								as: "UseAxiosOptionsaAlias",
							},
							{
								name: "UseAxiosReturn",
								as: "UseAxiosReturnAlias",
							},
						],
					},
				],

				ignore: ["vue-router"],
				dirs: ["src/**/*"],
				dts: "./types/auto-imports.d.ts",
				vueTemplate: true,
				resolvers: [ElementPlusResolver()],
			}),

			Components({
				version: 3,
				dirs: ["src/components", "src/views"],
				dts: "./types/components.d.ts",
				directoryAsNamespace: true,
				resolvers: [
					// 配置额，elementPlus采取sass样式配色系统
					ElementPlusResolver({ importStyle: "sass" }),
				],
			}),

			/**
			 * 开发调试插件
			 * @description
			 * vueDevTools 必须在 createHtmlPlugin 的前面导入
			 *
			 * @see https://github.com/vuejs/devtools-next/issues/278#issuecomment-2021745201
			 *
			 * 项目跑不起来 暂时不使用
			 *
			 * FIXME: 该内容导致项目无法启动
			 */
			vueDevTools(),

			// 按需定制主题配置
			ElementPlus({
				useSource: true,
			}),
		],

		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				components: fileURLToPath(new URL("./src/components", import.meta.url)),
				types: fileURLToPath(new URL("./src/types", import.meta.url)),
				views: fileURLToPath(new URL("./src/views", import.meta.url)),
				apis: fileURLToPath(new URL("./src/apis", import.meta.url)),
				stores: fileURLToPath(new URL("./src/stores", import.meta.url)),
				router: fileURLToPath(new URL("./src/router", import.meta.url)),
				utils: fileURLToPath(new URL("./src/utils", import.meta.url)),
				models: fileURLToPath(new URL("./src/models", import.meta.url)),
			},
		},

		css: {
			preprocessorOptions: {
				scss: {
					// 自动导入定制化样式文件进行样式覆盖
					additionalData: `
							@use "@/styles/element/index.scss" as *;
							@use "@/styles/var.scss" as *;
						`,
				},
			},
		},
	};
});
