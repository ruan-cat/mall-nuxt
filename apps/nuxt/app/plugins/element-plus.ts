import ElementPlus from "element-plus";
import { ElInfiniteScroll } from "element-plus";

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(ElementPlus);
	nuxtApp.vueApp.directive("infinite-scroll", ElInfiniteScroll);
});
