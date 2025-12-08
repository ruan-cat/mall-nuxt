<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { getSubCategoryAPI, getSubCategoryListAPI } from "@/apis/category";

// 定义API响应类型
interface ApiResponse {
	code: string;
	msg: string;
	result: any;
}

// 获取路由参数
const route = useRoute();
const categoryId = computed(() => route.params.id as string);

// 面包屑导航数据
const subCategoryInfo = ref<any>({});
const getSubCategory = async (id: string) => {
	try {
		const res = (await getSubCategoryAPI(id)) as unknown as ApiResponse;
		subCategoryInfo.value = res.result;
	} catch (error) {
		console.error("获取子分类数据失败", error);
	}
};

// 商品列表数据
const goodsList = ref<any[]>([]);
const reqData = ref({
	categoryId: categoryId.value,
	page: 1,
	pageSize: 20,
	sortField: "publishTime",
});

// 获取商品列表
const getGoodsList = async () => {
	try {
		const res = (await getSubCategoryListAPI(reqData.value)) as unknown as ApiResponse;
		goodsList.value = res.result.items;
	} catch (error) {
		console.error("获取商品列表失败", error);
	}
};

// Tab切换处理
const tabChange = () => {
	reqData.value.page = 1;
	getGoodsList();
};

// 无限加载功能
const disabled = ref(false);
const load = async () => {
	try {
		// 获取下一页数据
		reqData.value.page++;
		const res = (await getSubCategoryListAPI(reqData.value)) as unknown as ApiResponse;
		// 拼接数据
		goodsList.value = [...goodsList.value, ...res.result.items];
		// 判断是否加载完毕
		if (res.result.items.length === 0) {
			disabled.value = true;
		}
	} catch (error) {
		console.error("加载更多商品失败", error);
	}
};

// 监听路由变化
watch(
	() => categoryId.value,
	(newId) => {
		if (newId) {
			reqData.value.categoryId = newId;
			reqData.value.page = 1;
			getSubCategory(newId);
			getGoodsList();
			disabled.value = false;
		}
	},
	{ immediate: true },
);

// 初始化
onMounted(() => {
	if (categoryId.value) {
		getSubCategory(categoryId.value);
		getGoodsList();
	}
});
</script>

<template>
	<div class="container">
		<!-- 面包屑 -->
		<div class="bread-container">
			<el-breadcrumb separator=">">
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: `/category/${subCategoryInfo.parentId}` }">
					{{ subCategoryInfo.parentName }}
				</el-breadcrumb-item>
				<el-breadcrumb-item>{{ subCategoryInfo.name }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>

		<!-- 商品列表 -->
		<div class="sub-container">
			<el-tabs v-model="reqData.sortField" @tab-change="tabChange">
				<el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
				<el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
				<el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
			</el-tabs>

			<div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
				<GoodsItem v-for="good in goodsList" :key="good.id" :good="good" />
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.bread-container {
	padding: 25px 0;
	color: #666;
}

.sub-container {
	padding: 20px 10px;
	background-color: #fff;

	.body {
		display: flex;
		flex-wrap: wrap;
		padding: 0 10px;
		gap: 10px;
	}

	.pagination-container {
		margin-top: 20px;
		display: flex;
		justify-content: center;
	}
}
</style>
