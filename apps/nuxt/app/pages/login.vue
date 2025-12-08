<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, computed } from "vue";

// 表单校验对象
const userInfo = ref({
	account: "12056258283",
	password: "hm#qd@23!",
	agree: true,
});

// 规则数据对象
const rules = {
	account: [{ required: true, message: "请输入手机号", trigger: "blur" }],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur" },
		{ min: 6, max: 16, message: "长度在 6 到 16 个字符", trigger: "blur" },
	],
	agree: [
		{
			validator: (rule: any, val: boolean, callback: any) => {
				return val ? callback() : new Error("请先同意协议");
			},
		},
	],
};

// 登录逻辑
const formRef = ref<any>();
const router = useRouter();
const userStore = useUserStore();
const route = useRoute();

const redirectUrl = computed(() => {
	return (route.query.redirectUrl as string) || "/";
});

const doLogin = () => {
	// 提交表单进行预校验
	formRef.value.validate(async (valid: boolean) => {
		if (valid) {
			// 通过校验
			const { account, password } = userInfo.value;
			try {
				await userStore.getUserInfo({ account, password });
				// 提示用户
				ElMessage.success("登录成功");
				// 跳转到之前想要访问的页面
				router.replace({ path: redirectUrl.value });
			} catch (error) {
				ElMessage.error("登录失败，请检查账号密码");
			}
		}
	});
};

// 设置页面元数据
definePageMeta({
	layout: false,
});
</script>

<template>
	<div class="login-page">
		<header class="login-header">
			<div class="container">
				<h1 class="logo">
					<NuxtLink to="/">小兔鲜</NuxtLink>
				</h1>
				<NuxtLink class="entry" to="/">
					进入网站首页
					<i class="iconfont icon-angle-right"></i>
					<i class="iconfont icon-angle-right"></i>
				</NuxtLink>
			</div>
		</header>
		<section class="login-section">
			<div class="wrapper">
				<nav>
					<a href="javascript:;">账户登录</a>
				</nav>
				<div class="account-box">
					<div class="form">
						<el-form
							label-position="right"
							label-width="60px"
							status-icon
							ref="formRef"
							:model="userInfo"
							:rules="rules"
						>
							<el-form-item label="账户" prop="account">
								<el-input v-model="userInfo.account" />
							</el-form-item>
							<el-form-item label="密码" prop="password">
								<el-input v-model="userInfo.password" type="password" />
							</el-form-item>
							<el-form-item label-width="22px">
								<el-checkbox size="large" v-model="userInfo.agree"> 我已同意隐私条款和服务条款 </el-checkbox>
							</el-form-item>
							<el-button size="large" class="subBtn" @click="doLogin">点击登录</el-button>
						</el-form>
					</div>
				</div>
			</div>
		</section>

		<footer class="login-footer">
			<div class="container">
				<p>
					<a href="javascript:;">关于我们</a>
					<a href="javascript:;">帮助中心</a>
					<a href="javascript:;">售后服务</a>
					<a href="javascript:;">配送与验收</a>
					<a href="javascript:;">商务合作</a>
					<a href="javascript:;">搜索推荐</a>
					<a href="javascript:;">友情链接</a>
				</p>
				<p>CopyRight &copy; 小兔鲜儿</p>
			</div>
		</footer>
	</div>
</template>

<style scoped lang="scss">
.login-page {
	min-width: 1240px;
	background: #f5f5f5;
	height: 100vh;
	display: flex;
	flex-direction: column;
}

.login-header {
	background: #fff;
	border-bottom: 1px solid #e4e4e4;

	.container {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
	}

	.logo {
		width: 200px;

		a {
			display: block;
			height: 132px;
			width: 100%;
			text-indent: -9999px;
			background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
		}
	}

	.sub {
		flex: 1;
		font-size: 24px;
		font-weight: normal;
		margin-bottom: 38px;
		margin-left: 20px;
		color: #666;
	}

	.entry {
		width: 120px;
		margin-bottom: 38px;
		font-size: 16px;

		i {
			font-size: 14px;
			color: $xtxColor;
			letter-spacing: -5px;
		}
	}
}

.login-section {
	background: url("@/assets/images/login-bg.png") no-repeat center / cover;
	height: 488px;
	position: relative;

	.wrapper {
		width: 380px;
		background: #fff;
		position: absolute;
		left: 50%;
		top: 54px;
		transform: translate3d(100px, 0, 0);
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

		nav {
			font-size: 14px;
			height: 55px;
			margin-bottom: 20px;
			border-bottom: 1px solid #f5f5f5;
			display: flex;
			padding: 0 40px;
			text-align: right;
			align-items: center;

			a {
				flex: 1;
				line-height: 1;
				display: inline-block;
				font-size: 18px;
				position: relative;
				text-align: center;
			}
		}
	}
}

.login-footer {
	padding: 30px 0 50px;
	background: #fff;

	p {
		text-align: center;
		color: #999;
		padding-top: 20px;

		a {
			line-height: 1;
			padding: 0 10px;
			color: #999;
			display: inline-block;

			~ a {
				border-left: 1px solid #ccc;
			}
		}
	}
}

.account-box {
	.toggle {
		padding: 15px 40px;
		text-align: right;

		a {
			color: $xtxColor;

			i {
				font-size: 14px;
			}
		}
	}

	.form {
		padding: 0 20px 20px 20px;

		&-item {
			margin-bottom: 28px;

			.input {
				position: relative;
				height: 36px;

				> i {
					width: 34px;
					height: 34px;
					background: #cfcdcd;
					color: #fff;
					position: absolute;
					left: 1px;
					top: 1px;
					text-align: center;
					line-height: 34px;
					font-size: 18px;
				}

				input {
					width: 100%;
					height: 100%;
					padding-left: 44px;
					border: 1px solid #cfcdcd;

					&.error {
						border-color: $priceColor;
					}

					&.active,
					&:focus {
						border-color: $xtxColor;
					}
				}

				.icon-show {
					display: none;
				}

				.icon-hide {
					display: block;
				}
			}

			> .error {
				position: absolute;
				font-size: 12px;
				line-height: 28px;
				color: $priceColor;

				i {
					font-size: 14px;
					margin-right: 2px;
				}
			}
		}

		.agree {
			a {
				color: #069;
			}
		}

		.btn {
			display: block;
			width: 100%;
			height: 40px;
			color: #fff;
			text-align: center;
			line-height: 40px;
			background: $xtxColor;

			&.disabled {
				background: #cfcdcd;
			}
		}

		.subBtn {
			background: $xtxColor;
			width: 100%;
			color: #fff;
			&:hover {
				background: lighten($xtxColor, 10%);
			}
		}
	}

	.subBtn {
		background: $xtxColor;
		width: 100%;
		color: #fff;
	}
}
</style>
