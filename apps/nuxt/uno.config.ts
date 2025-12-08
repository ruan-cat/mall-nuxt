import { createLocalFontProcessor } from "@unocss/preset-web-fonts/local";
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	shortcuts: [
		[
			"icon-btn",
			"inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600",
		],
	],
	// 排除与项目冲突的选择器，添加.btn到排除列表
	blocklist: [".container", ".btn"],
	// 设置前缀预防冲突
	preflights: [
		{
			getCSS: () => `
				.uno-container {
					width: 100%;
				}
			`,
		},
	],
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			scale: 1.2,
		}),
		presetTypography(),
		presetWebFonts({
			fonts: {
				sans: "DM Sans",
				serif: "DM Serif Display",
				mono: "DM Mono",
			},
			processors: createLocalFontProcessor(),
		}),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
