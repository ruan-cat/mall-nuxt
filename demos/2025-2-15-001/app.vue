<script setup lang="ts">
// import { RouterView } from "vue-router";
// import { useTitle } from "@vueuse/core";
// import { settings } from "@/settings/index";
// useTitle(settings.title);
</script>

<template>
	<!-- 不使用vite的基础根界面 -->
	<!-- <RouterView /> -->

	<!-- 使用nuxt项目提供的基础根界面 -->
	<div>
		<NuxtRouteAnnouncer />
		<NuxtWelcome />
	</div>
</template>

<style scoped></style>
