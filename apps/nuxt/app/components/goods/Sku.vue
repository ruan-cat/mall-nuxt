<script setup lang="ts">
import { ref, watchEffect } from "vue";
import getPowerSet from "@/utils/power-set";

// 规格值类型
interface SpecValue {
	name: string;
	picture?: string;
	disabled?: boolean;
	selected?: boolean;
}

// 规格类型
export interface SkuSpec {
	name: string;
	values: SpecValue[];
}

// SKU数据类型
export interface SkuData {
	id: string;
	skuId: string;
	price: string;
	oldPrice: string;
	inventory: number;
	specs: {
		name: string;
		valueName: string;
	}[];
}

// 组件Props类型
interface Props {
	goods: Record<string, any>;
	skus?: SkuData[];
	specs?: any[];
	skuId?: string;
}

// 接收Props
const props = defineProps<Props>();
const emit = defineEmits(["change"]);

// 分隔符
const spliter = "★";

// 创建路径字典
const getPathMap = (skus: SkuData[]) => {
	const pathMap: Record<string, string[]> = {};
	if (skus && skus.length > 0) {
		skus.forEach((sku) => {
			// 1. 过滤出有库存有效的sku
			if (sku.inventory) {
				// 2. 得到sku属性值数组
				const specs = sku.specs.map((spec) => spec.valueName);
				// 3. 得到sku属性值数组的子集
				const powerSet = getPowerSet(specs);
				// 4. 设置给路径字典对象
				powerSet.forEach((set: string[]) => {
					const key = set.join(spliter);
					// 如果没有就先初始化一个空数组
					if (!pathMap[key]) {
						pathMap[key] = [];
					}
					pathMap[key].push(sku.id);
				});
			}
		});
	}
	return pathMap;
};

// 初始化禁用状态
const initDisabledStatus = (specs: any[], pathMap: Record<string, any>) => {
	if (specs && specs.length > 0) {
		specs.forEach((spec) => {
			spec.values.forEach((val: any) => {
				// 设置禁用状态
				val.disabled = !pathMap[val.name];
			});
		});
	}
};

// 得到当前选中规格集合
const getSelectedArr = (specs: any[]) => {
	const selectedArr: (string | undefined)[] = [];
	specs.forEach((spec, index) => {
		const selectedVal = spec.values.find((val: any) => val.selected);
		if (selectedVal) {
			selectedArr[index] = selectedVal.name;
		} else {
			selectedArr[index] = undefined;
		}
	});
	return selectedArr;
};

// 更新按钮的禁用状态
const updateDisabledStatus = (specs: any[], pathMap: Record<string, any>) => {
	// 遍历每一种规格
	specs.forEach((item, i) => {
		// 拿到当前选择的项目
		const selectedArr = getSelectedArr(specs);
		// 遍历每一个按钮
		item.values.forEach((val: any) => {
			if (!val.selected) {
				selectedArr[i] = val.name;
				// 去掉undefined之后组合成key
				const key = selectedArr.filter((value) => value).join(spliter);
				val.disabled = !pathMap[key];
			}
		});
	});
};

// 存储路径字典
let pathMap = ref<Record<string, any>>({});

// 监听商品和SKU变化
watchEffect(() => {
	// 判断是否使用传入的skus或者商品的skus
	const skusToUse = props.skus && props.skus.length ? props.skus : props.goods.skus;
	// 判断是否使用传入的specs或者商品的specs
	const specsToUse = props.specs && props.specs.length ? props.specs : props.goods.specs;

	// 得到所有字典集合
	pathMap.value = getPathMap(skusToUse || []);
	// 组件初始化的时候更新禁用状态
	initDisabledStatus(specsToUse || [], pathMap.value);
});

// 处理规格点击
const clickSpecs = (item: any, val: any) => {
	if (val.disabled) return false;

	// 选中与取消选中逻辑
	if (val.selected) {
		val.selected = false;
	} else {
		item.values.forEach((bv: any) => {
			bv.selected = false;
		});
		val.selected = true;
	}

	// 使用传入的specs或商品的specs
	const specsToUse = props.specs && props.specs.length ? props.specs : props.goods.specs;
	const skusToUse = props.skus && props.skus.length ? props.skus : props.goods.skus;

	// 点击之后再次更新选中状态
	updateDisabledStatus(specsToUse, pathMap.value);

	// 把选择的sku信息传出去给父组件
	const selectedArr = getSelectedArr(specsToUse).filter((value) => value);

	// 如果选中得规格数量和传入得规格总数相等则传出完整信息(都选择了)
	// 否则传出空对象
	if (selectedArr.length === specsToUse.length) {
		// 从路径字典中得到skuId
		const skuId = pathMap.value[selectedArr.join(spliter)][0];
		const sku = skusToUse.find((sku: any) => sku.id === skuId);

		// 传递数据给父组件
		emit("change", {
			skuId: sku.id,
			price: sku.price,
			oldPrice: sku.oldPrice,
			inventory: sku.inventory,
			specsText: sku.specs.reduce((p: string, n: any) => `${p} ${n.name}：${n.valueName}`, "").trim(),
		});
	} else {
		emit("change", {});
	}
};
</script>

<template>
	<div class="goods-sku">
		<dl v-for="item in props.specs && props.specs.length ? props.specs : props.goods.specs" :key="item.id">
			<dt>{{ item.name }}</dt>
			<dd>
				<template v-for="val in item.values" :key="val.name">
					<img
						:class="{ selected: val.selected, disabled: val.disabled }"
						@click="clickSpecs(item, val)"
						v-if="val.picture"
						:src="val.picture"
						:title="val.name"
					/>
					<span :class="{ selected: val.selected, disabled: val.disabled }" @click="clickSpecs(item, val)" v-else>
						{{ val.name }}
					</span>
				</template>
			</dd>
		</dl>
	</div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin {
	border: 1px solid #e4e4e4;
	// margin-right: 10px;
	// margin-bottom: 10px;
	cursor: pointer;

	&.selected {
		border-color: $xtxColor;
	}

	&.disabled {
		opacity: 0.6;
		border-style: dashed;
		cursor: not-allowed;
	}
}

.goods-sku {
	padding-left: 10px;
	padding-top: 20px;

	width: 100%;
	max-width: 100%;
	box-sizing: border-box;
	overflow: hidden;

	dl {
		display: flex;
		padding-bottom: 20px;
		align-items: center;

		dt {
			width: 50px;
			color: #999;
		}

		dd {
			flex: 1;
			color: #666;

			min-width: 0;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			row-gap: 10px;
			column-gap: 10px;

			> img {
				width: 50px;
				height: 50px;
				// margin-bottom: 4px;
				@include sku-state-mixin;
				flex-shrink: 0;
			}

			> span {
				display: inline-flex;
				height: 30px;
				padding: 0 20px;
				// margin-bottom: 4px;
				@include sku-state-mixin;

				line-height: 1;
				flex-shrink: 0;
				align-items: center;
				justify-content: center;
			}
		}
	}
}
</style>
