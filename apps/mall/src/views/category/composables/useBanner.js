import { getBannerAPI } from "@/apis/category";
import { ref, onMounted } from "vue";
export const useBanner = () => {
	// 轮播图逻辑
	const bannerList = ref([]);
	const getBanner = async () => {
		const res = await getBannerAPI({ distributionSite: "2" });
		bannerList.value = res.result;
	};
	onMounted(() => getBanner());
	return {
		bannerList,
	};
};
