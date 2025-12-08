<script setup lang="ts">
import { getHotGoodsAPI } from "@/apis/home";

const hotGoodsList = ref([]);
const getHotGoods = async () => {
	const res = await getHotGoodsAPI();
	hotGoodsList.value = res.result;
};
getHotGoods();
</script>

<template>
	<HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
		<template #main>
			<ul class="goods-list">
				<li v-for="item in hotGoodsList" :key="item.id">
					<NuxtLink :to="`/detail/${item.id}`">
						<NuxtImg :src="item.picture" width="306" height="306" loading="lazy" alt="" />
						<p class="name">{{ item.title }}</p>
						<p class="desc">{{ item.alt }}</p>
					</NuxtLink>
				</li>
			</ul>
		</template>
	</HomePanel>
</template>

<style scoped lang="scss">
.goods-list {
	display: flex;
	justify-content: space-between;
	height: 426px;

	li {
		width: 306px;
		height: 406px;
		transition: all 0.5s;

		&:hover {
			transform: translate3d(0, -3px, 0);
			box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
		}

		p {
			font-size: 22px;
			padding-top: 12px;
			text-align: center;
		}

		.desc {
			color: #999;
			font-size: 18px;
		}
	}
}
</style>
