import { ElMessage, ElMessageBox } from "element-plus";

export function useMessage() {
	return {
		success: (message: string) => ElMessage.success(message),
		warning: (message: string) => ElMessage.warning(message),
		error: (message: string) => ElMessage.error(message),
		confirm: (message: string, title = "提示") =>
			ElMessageBox.confirm(message, title, {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			}),
	};
}
