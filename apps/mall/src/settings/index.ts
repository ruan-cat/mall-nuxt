/**
 * 项目设置
 * @description
 * 特指项目的一些配置项，如：项目名称、侧边栏logo、是否需要登录、是否需要进度条等
 *
 * 目前本项目不会全部都使用。
 *
 * @see https://vscode.dev/github/jzfai/vue3-admin-plus/blob/master/typings/basic.d.ts#L41
 */

export interface SettingsConfig {
	/** 项目的浏览器tab栏标题 */
	title: string;
	sidebarLogo: boolean;
	showLeftMenu: boolean;
	ShowDropDown: boolean;
	showHamburger: boolean;
	isNeedLogin: boolean;
	isNeedNprogress: boolean;
	showTagsView: boolean;
	tagsViewNum: number;
	openProdMock: boolean;
	errorLog: string | Array<string>;
	permissionMode: string;
	delWindowHeight: string;
	tmpToken: string;
	showNavbarTitle: boolean;
	showTopNavbar: boolean;
	mainNeedAnimation: boolean;
	viteBasePath: string;
	defaultLanguage: string;
	defaultSize: string;
	defaultTheme: string;
	rememberMe: boolean;
	username: string;
	password: string;
	platformId: number;
}

export const settings: Partial<SettingsConfig> = {
	title: "01星球服装商城项目",
};
