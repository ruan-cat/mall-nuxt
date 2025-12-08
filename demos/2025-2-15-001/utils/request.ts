import type { UseFetchOptions } from "#app";

export const fetchConfig: UseFetchOptions<any> = {
	baseURL: "/api",
	headers: {
		"Content-Type": "application/json",
	},
	onRequest({ options }) {
		const userStore = useUserStore();
		if (userStore.userInfo.token) {
			const headers = options.headers as Record<string, string>;
			headers.Authorization = `Bearer ${userStore.userInfo.token}`;
		}
	},
	onResponseError({ response }) {
		if (response.status === 401) {
			const userStore = useUserStore();
			userStore.clearUserInfo();
			navigateTo("/login");
		}
	},
};

export function useHttp<T = any>(url: string, opts?: UseFetchOptions<T>) {
	return useFetch<T>(url, {
		...fetchConfig,
		...opts,
		key: url,
	});
}
