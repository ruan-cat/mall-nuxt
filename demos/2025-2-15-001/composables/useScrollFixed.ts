import type { Ref, ComputedRef } from "vue";
import { useScroll } from "@vueuse/core";

export function useScrollFixed() {
	// 在 client 端才能访问 window
	const { y } = useScroll(process.client ? window : null);
	const isFixed = computed(() => y.value > 78);

	return {
		isFixed,
		y,
	};
}
