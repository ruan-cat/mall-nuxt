<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { useCountDown } from "~/composables/useCountDown";
import { getOrderAPI } from "~/apis/order";
// 从#imports导入，这是Nuxt自动导入的API
import { useRequestURL } from "#imports";

// 定义接口返回值类型
interface OrderResult {
	result: {
		id: string;
		createTime: string;
		payType: number;
		orderState: number;
		payLatestTime: string;
		countdown: number;
		payMoney: number;
		skus: any[];
		[key: string]: any;
	};
	code: string;
	msg: string;
}

// 定义订单数据类型
interface PayInfo {
	id: string;
	createTime: string;
	payType: number;
	orderState: number;
	payLatestTime: string;
	countdown: number;
	payMoney: number;
	skus: any[];
	[key: string]: any;
}

// 组合式函数获取支付倒计时
const { formatTime, start } = useCountDown();

// 路由相关
const route = useRoute();
const router = useRouter();

// 订单数据
const payInfo = ref<PayInfo>({
	id: "",
	createTime: "",
	payType: 1,
	orderState: 0,
	payLatestTime: "",
	countdown: 0,
	payMoney: 0,
	skus: [],
});

// 获取订单数据
const getPayInfo = async () => {
	try {
		// 使用类型断言指定返回值类型
		const res = (await getOrderAPI(route.query.id as string)) as unknown as OrderResult;
		// 确保后端返回了有效数据
		if (res && res.result) {
			payInfo.value = res.result;
			// 初始化倒计时
			if (res.result.countdown > 0) {
				start(res.result.countdown);
			}
		}
	} catch (error) {
		console.error("获取订单数据失败", error);
	}
};

// 初始化时获取订单数据
onMounted(() => getPayInfo());

// 构建支付URL (避免服务端渲染时访问window)
const baseURL = "http://pcapi-xiaotuxian-front.itheima.net/";
// 使用Nuxt的useRequestURL()获取当前URL信息，替代window.location
const requestURL = useRequestURL();
// 构建回调URL
const protocol = requestURL.protocol === "https:" ? "https" : "http";
const host = requestURL.host;
const backURL = `${protocol}://${host}/paycallback`;
const redirectUrl = encodeURIComponent(backURL);
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`;
</script>

<template>
	<div class="xtx-pay-page">
		<div class="container">
			<!-- 付款信息 -->
			<div class="pay-info">
				<span class="icon iconfont icon-queren2"></span>
				<div class="tip">
					<p>订单提交成功！请尽快完成支付。</p>
					<p>
						支付还剩 <span>{{ formatTime }}</span
						>, 超时后将取消订单
					</p>
				</div>
				<div class="amount">
					<span>应付总额：</span>
					<span>¥{{ payInfo.payMoney ? payInfo.payMoney.toFixed(2) : "0.00" }}</span>
				</div>
			</div>
			<!-- 付款方式 -->
			<div class="pay-type">
				<p class="head">选择以下支付方式付款</p>
				<div class="item">
					<p>支付平台</p>
					<a class="btn wx" href="javascript:;"></a>
					<a class="btn alipay" :href="payUrl"></a>
				</div>
				<div class="item">
					<p>支付方式</p>
					<a class="btn" href="javascript:;">招商银行</a>
					<a class="btn" href="javascript:;">工商银行</a>
					<a class="btn" href="javascript:;">建设银行</a>
					<a class="btn" href="javascript:;">农业银行</a>
					<a class="btn" href="javascript:;">交通银行</a>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.xtx-pay-page {
	margin-top: 20px;
}

.pay-info {
	background: #fff;
	display: flex;
	align-items: center;
	height: 240px;
	padding: 0 80px;

	.icon {
		font-size: 80px;
		color: #1dc779;
	}

	.tip {
		padding-left: 10px;
		flex: 1;

		p {
			&:first-child {
				font-size: 20px;
				margin-bottom: 5px;
			}

			&:last-child {
				color: #999;
				font-size: 16px;
			}
		}
	}

	.amount {
		span {
			&:first-child {
				font-size: 16px;
				color: #999;
			}

			&:last-child {
				color: $priceColor;
				font-size: 20px;
			}
		}
	}
}

.pay-type {
	margin-top: 20px;
	background-color: #fff;
	padding-bottom: 70px;

	p {
		line-height: 70px;
		height: 70px;
		padding-left: 30px;
		font-size: 16px;

		&.head {
			border-bottom: 1px solid #f5f5f5;
		}
	}

	.btn {
		width: 150px;
		height: 50px;
		border: 1px solid #e4e4e4;
		text-align: center;
		line-height: 48px;
		margin-left: 30px;
		color: #666666;
		display: inline-block;
		background-color: #fff;

		&.active,
		&:hover {
			border-color: $xtxColor;
		}

		&.alipay {
			background: #fff url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat
				center / contain;
		}

		&.wx {
			background: #fff url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat
				center / contain;
		}
	}
}
</style>
