<script lang="ts" setup>
const categoryStore = useCategoryStore();
categoryStore.getCategory();
</script>

<template>
	<LayoutFixed></LayoutFixed>
	<LayoutNav></LayoutNav>
	<LayoutHeader></LayoutHeader>

	<!-- <RouterView :key="$route.fullPath"/> -->
	<RouterView />

	<LayoutFooter></LayoutFooter>
</template>
