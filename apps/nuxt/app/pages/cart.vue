<script setup lang="ts">
import { useCartStore } from "@/composables/states/use-cart";
import { ElMessage, ElPopconfirm } from "element-plus";

// 获取购物车状态
const cartStore = useCartStore();

// 单选操作
const handleCheck = (skuId: string, selected: boolean) => {
	cartStore.singleCheck(skuId, selected);
};

// 全选操作
const handleAllCheck = (selected: boolean) => {
	cartStore.allCheck(selected);
};

// 修改数量
const handleChangeCount = (skuId: string, count: number) => {
	cartStore.changeCount(skuId, count);
};

// 删除商品
const deleteCart = async (item: any) => {
	try {
		await cartStore.deleteCart(item.skuId);
		ElMessage.success("删除成功");
	} catch (error) {
		ElMessage.error("删除失败");
	}
};

// 跳转结算页
const router = useRouter();
const goCheckout = () => {
	// 检查是否有选中商品
	if (cartStore.selectedCount <= 0) {
		return ElMessage.warning("请选择要结算的商品");
	}
	router.push("/checkout");
};
</script>

<template>
	<div class="xtx-cart-page">
		<div class="container m-top-20">
			<div class="cart">
				<table>
					<thead>
						<tr>
							<th width="120">
								<el-checkbox
									:model-value="cartStore.isAll"
									@change="(val: boolean | string | number) => handleAllCheck(!!val)"
								/>
							</th>
							<th width="400">商品信息</th>
							<th width="220">单价</th>
							<th width="180">数量</th>
							<th width="180">小计</th>
							<th width="140">操作</th>
						</tr>
					</thead>
					<!-- 商品列表 -->
					<tbody>
						<tr v-for="item in cartStore.cartList" :key="item.id">
							<td>
								<el-checkbox
									:model-value="item.selected"
									@change="(val: boolean | string | number) => handleCheck(item.skuId, !!val)"
								/>
							</td>
							<td>
								<div class="goods">
									<NuxtLink :to="`/detail/${item.id}`">
										<NuxtImg
											:src="typeof item.picture === 'string' ? item.picture : item.picture[0]"
											alt=""
											width="100"
											height="100"
											loading="lazy"
										/>
									</NuxtLink>
									<div>
										<p class="name ellipsis">{{ item.name }}</p>
										<p class="attrs" v-if="item.attrsText">{{ item.attrsText }}</p>
									</div>
								</div>
							</td>
							<td class="tc">
								<p>&yen;{{ item.price }}</p>
							</td>
							<td class="tc">
								<el-input-number
									:min="1"
									:model-value="item.count"
									@update:model-value="(count) => handleChangeCount(item.skuId, count as number)"
								/>
							</td>
							<td class="tc">
								<p class="f16 red">&yen;{{ (item.price * item.count).toFixed(2) }}</p>
							</td>
							<td class="tc">
								<p>
									<el-popconfirm
										title="确认删除吗?"
										confirm-button-text="确认"
										cancel-button-text="取消"
										@confirm="deleteCart(item)"
									>
										<template #reference>
											<a href="javascript:;">删除</a>
										</template>
									</el-popconfirm>
								</p>
							</td>
						</tr>
						<tr v-if="cartStore.cartList.length === 0">
							<td colspan="6">
								<div class="cart-none">
									<el-empty description="购物车列表为空">
										<el-button type="primary" @click="$router.push('/')">随便逛逛</el-button>
									</el-empty>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- 操作栏 -->
			<div class="action">
				<div class="batch">
					共 {{ cartStore.allCount }} 件商品，已选择 {{ cartStore.selectedCount }} 件，商品合计：
					<span class="red">¥ {{ cartStore.selectedPrice.toFixed(2) }} </span>
				</div>
				<div class="total">
					<el-button size="large" type="primary" @click="goCheckout">下单结算</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.xtx-cart-page {
	margin-top: 20px;

	.cart {
		background: #fff;
		color: #666;

		table {
			border-spacing: 0;
			border-collapse: collapse;
			line-height: 24px;

			th,
			td {
				padding: 10px;
				border-bottom: 1px solid #f5f5f5;

				&:first-child {
					text-align: left;
					padding-left: 30px;
					color: #999;
				}
			}

			th {
				font-size: 16px;
				font-weight: normal;
				line-height: 50px;
			}
		}
	}

	.cart-none {
		text-align: center;
		padding: 120px 0;
		background: #fff;

		p {
			color: #999;
			padding: 20px 0;
		}
	}

	.tc {
		text-align: center;

		a {
			color: $xtxColor;
		}

		.xtx-numbox {
			margin: 0 auto;
			width: 120px;
		}
	}

	.red {
		color: $priceColor;
	}

	.green {
		color: $xtxColor;
	}

	.f16 {
		font-size: 16px;
	}

	.goods {
		display: flex;
		align-items: center;

		img {
			width: 100px;
			height: 100px;
		}

		> div {
			width: 280px;
			font-size: 16px;
			padding-left: 10px;

			.name {
				font-size: 16px;
			}

			.attrs {
				font-size: 14px;
				color: #999;
			}
		}
	}

	.action {
		display: flex;
		background: #fff;
		margin-top: 20px;
		height: 80px;
		align-items: center;
		font-size: 16px;
		justify-content: space-between;
		padding: 0 30px;

		.batch {
			flex: 1;
			display: flex;
			align-items: center;
		}

		.red {
			font-size: 18px;
			margin-right: 20px;
			font-weight: bold;
		}

		.total {
			width: 120px;
			text-align: center;
		}
	}
}
</style>
