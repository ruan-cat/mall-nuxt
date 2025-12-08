import "@/styles/common.scss";

import { createApp } from "vue";
import pinia from "./stores/index.js";

import App from "./App.vue";
import router from "./router/index.js";
// 自定义指令导入
import { lazyPlugin } from "./directives/lazyPlugin.js";

// 暂时不使用全量导入的方式
// import ElementPlus from "element-plus";
// import "element-plus/dist/index.css";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
// 全局指令注册
app.use(lazyPlugin);

// 暂时不使用全量导入的方式
// app.use(ElementPlus);
