<script setup lang="ts">
interface Props {
	good: {
		id?: string | number;
		name?: string;
		desc?: string;
		price?: number | string;
		picture?: string;
	};
}

// 直接解构defineProps，Vue会自动保持响应性
const { good } = defineProps<Props>();
</script>

<template>
	<NuxtLink :to="`/detail/${good.id}`" class="goods-item">
		<NuxtImg :src="good.picture" width="160" height="160" loading="lazy" alt="" />
		<p class="name ellipsis">{{ good.name }}</p>
		<p class="desc ellipsis">{{ good.desc }}</p>
		<p class="price">&yen;{{ good.price }}</p>
	</NuxtLink>
</template>

<style lang="scss" scoped>
.goods-item {
	display: block;
	width: 220px;
	padding: 20px 30px;
	text-align: center;
	transition: all 0.5s;

	&:hover {
		transform: translate3d(0, -3px, 0);
		box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
	}

	p {
		padding-top: 10px;
	}

	.name {
		font-size: 16px;
	}

	.desc {
		color: #999;
		height: 29px;
	}

	.price {
		color: $priceColor;
		font-size: 20px;
	}
}
</style>
