<script setup lang="ts">
import { fetchHotGoodsAPI } from "@/apis/detail";

interface Props {
	// 接受type适配不同类型的热榜数据
	// 1代表24小时热销榜 2代表周热销榜
	type: 1 | 2;
}

// 直接解构defineProps，Vue会自动保持响应性
const { type } = defineProps<Props>();

// 使用Record<number, string>避免隐式any索引错误
const titleMap: Record<number, string> = {
	1: "24小时热榜",
	2: "周热榜",
};
const title = computed(() => titleMap[type]);

// 定义商品类型
interface GoodItem {
	id: string;
	name: string;
	desc: string;
	price: string | number;
	picture: string;
}

// 获取热榜数据
const goodList = ref<GoodItem[]>([]);
const route = useRoute();
const getHotList = async () => {
	try {
		const res = await fetchHotGoodsAPI({
			id: route.params.id as string,
			type: type,
		});
		// 打印返回数据结构，便于调试
		console.log("热榜数据返回结构:", res);

		// 使用类型断言处理返回数据
		const data = res as any;

		// 根据实际返回的数据结构调整
		if (Array.isArray(data)) {
			goodList.value = data;
		} else if (data.result) {
			goodList.value = data.result;
		} else if (data.data) {
			goodList.value = Array.isArray(data.data) ? data.data : data.data.result || [];
		} else {
			goodList.value = [];
			console.error("热榜数据结构不符合预期:", data);
		}
	} catch (error) {
		console.error("获取热榜数据失败", error);
		goodList.value = [];
	}
};

onMounted(() => {
	getHotList();
});
</script>

<template>
	<div class="goods-hot">
		<h3>{{ title }}</h3>
		<!-- 商品区块 -->

		<div class="goods-list">
			<GoodsItem class="goods-item" v-for="item in goodList" :key="item.id" :good="item" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.goods-hot {
	h3 {
		height: 70px;
		background: $helpColor;
		color: #fff;
		font-size: 18px;
		line-height: 70px;
		padding-left: 25px;
		margin-bottom: 10px;
		font-weight: normal;
	}

	.goods-list {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
}

// 单独设置goods-item的样式 使其内容居中
:deep(.goods-list) {
	.goods-item {
		width: 100%;
		background: #fff;

		img {
			display: block;
			width: 160px;
			height: 160px;
			margin: 0 auto;
			object-fit: cover;
		}
	}
}
</style>
