<script setup lang="ts">
// 在页面加载时获取分类数据
const categoryStore = useCategoryStore();
categoryStore.getCategory();

definePageMeta({
	layout: "default",
});

const online = useOnline();
</script>

<template>
	<div class="container">
		<HomeCategory />
		<HomeBanner />
	</div>
	<HomeNew />
	<HomeHot />
	<HomeProduct />
</template>

<style scoped lang="scss">
.container {
	width: 1240px;
	margin: 0 auto;
	position: relative;
}
</style>
