/**
 * 求数组的子集
 * @param arr - 原始数组
 * @returns 所有子集数组
 */
export default function getPowerSet<T>(arr: T[]): T[][] {
	const result: T[][] = [[]];
	if (arr && arr.length > 0) {
		arr.forEach((item) => {
			const tempResult = [...result];
			tempResult.forEach((subArr) => {
				result.push([...subArr, item]);
			});
		});
	}
	return result;
}
