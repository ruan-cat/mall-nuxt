<script setup lang="ts">
// 布局组件的逻辑
</script>

<template>
	<div class="mall-container">
		<LayoutFixed />
		<LayoutNav />
		<LayoutHeader />
		<main class="main-content">
			<slot />
		</main>
		<LayoutFooter />
	</div>
</template>

<style scoped lang="scss">
.mall-container {
	min-width: 1240px;
	display: flex;
	flex-direction: column;
	min-height: 100vh;

	// 即 #app 选择器的样式，实现全局背景为灰白色
	background: #f5f5f5;
	user-select: none;
}

.main-content {
	flex: 1;
	padding-top: 0;
}

.container {
	width: 1240px;
	margin: 0 auto;
	position: relative;
}
</style>
