<script setup lang="ts">
defineProps<{
	error: {
		statusCode: number;
		message: string;
	};
}>();
</script>

<template>
	<div class="error-page">
		<h1>{{ error.statusCode }}</h1>
		<div class="error-desc">{{ error.message }}</div>
		<NuxtLink to="/" class="error-btn">返回首页</NuxtLink>
	</div>
</template>

<style scoped lang="scss">
.error-page {
	text-align: center;
	padding: 100px 0;

	h1 {
		font-size: 100px;
		color: $priceColor;
	}

	.error-desc {
		font-size: 24px;
		margin: 20px 0;
	}

	.error-btn {
		display: inline-block;
		padding: 10px 30px;
		background: $xtxColor;
		color: #fff;
		border-radius: 4px;
	}
}
</style>
