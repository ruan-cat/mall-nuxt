import { createPinia } from "pinia";
import persist from "pinia-plugin-persistedstate";
const pinia = createPinia();
// 自动本地存储
pinia.use(persist);

export default pinia;

export * from "./modules/layout";
export * from "./modules/user";
export * from "./modules/cart";
