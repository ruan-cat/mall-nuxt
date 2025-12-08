<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { getTopCategoryAPI, getBannerAPI } from "@/apis/category";

// 定义API响应类型
interface ApiResponse {
	code: string;
	msg: string;
	result: any;
}

// 获取路由参数
const route = useRoute();
const categoryId = computed(() => route.params.id as string);

// 分类数据
const categoryData = ref<any>({});
const getCategoryData = async (id: string) => {
	try {
		const res = (await getTopCategoryAPI(id)) as unknown as ApiResponse;
		categoryData.value = res.result;
	} catch (error) {
		console.error("获取分类数据失败", error);
	}
};

// 轮播图数据
const bannerList = ref<any[]>([]);
const getBanner = async () => {
	try {
		const res = (await getBannerAPI({ distributionSite: "2" })) as unknown as ApiResponse;
		bannerList.value = res.result;
	} catch (error) {
		console.error("获取轮播图数据失败", error);
	}
};

// 监听路由参数变化
watch(
	() => categoryId.value,
	(newId) => {
		if (newId) {
			getCategoryData(newId);
		}
	},
	{ immediate: true },
);

// 初始化
onMounted(() => {
	getBanner();
});
</script>

<template>
	<div class="top-category">
		<div class="container m-top-20">
			<!-- 面包屑 -->
			<div class="bread-container">
				<el-breadcrumb separator=">">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
				</el-breadcrumb>
			</div>

			<!-- 轮播图 -->
			<div class="home-banner">
				<el-carousel height="500px">
					<el-carousel-item v-for="item in bannerList" :key="item.id">
						<NuxtImg :src="item.imgUrl" alt="" width="1240" height="500" format="webp" quality="80" loading="lazy" />
					</el-carousel-item>
				</el-carousel>
			</div>

			<!-- 全部分类 -->
			<div class="sub-list">
				<h3>全部分类</h3>
				<ul>
					<li v-for="item in categoryData.children" :key="item.id">
						<NuxtLink :to="`/category/sub/${item.id}`">
							<NuxtImg :src="item.picture" alt="" width="100" height="100" format="webp" loading="lazy" />
							<p>{{ item.name }}</p>
						</NuxtLink>
					</li>
				</ul>
			</div>

			<!-- 分类商品展示 -->
			<div class="ref-goods" v-for="item in categoryData.children" :key="item.id">
				<div class="head">
					<h3>- {{ item.name }} -</h3>
				</div>
				<div class="body">
					<GoodsItem v-for="good in item.goods" :good="good" :key="good.id" />
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.top-category {
	h3 {
		font-size: 28px;
		color: #666;
		font-weight: normal;
		text-align: center;
		line-height: 100px;
	}

	.sub-list {
		margin-top: 20px;
		background-color: #fff;

		ul {
			display: flex;
			padding: 0 32px;
			flex-wrap: wrap;
			justify-content: flex-start;

			li {
				width: 168px;
				height: 160px;
				display: flex;
				justify-content: center;
				align-items: center;

				a {
					text-align: center;
					display: block;
					font-size: 16px;
					width: 100%;

					img {
						width: 100px;
						height: 100px;
						margin: 0 auto;
					}

					p {
						line-height: 40px;
						text-align: center;
					}

					&:hover {
						color: $xtxColor;
					}
				}
			}
		}
	}

	.ref-goods {
		background-color: #fff;
		margin-top: 20px;
		position: relative;

		.head {
			.xtx-more {
				position: absolute;
				top: 20px;
				right: 20px;
			}

			.tag {
				text-align: center;
				color: #999;
				font-size: 20px;
				position: relative;
				top: -20px;
			}
		}

		.body {
			display: flex;
			justify-content: space-around;
			padding: 0 40px 30px;
			flex-wrap: wrap;
		}
	}

	.bread-container {
		padding: 25px 0;
	}

	.home-banner {
		width: 1240px;
		height: 500px;
		margin: 0 auto;

		img {
			width: 100%;
			height: 500px;
		}
	}
}
</style>
