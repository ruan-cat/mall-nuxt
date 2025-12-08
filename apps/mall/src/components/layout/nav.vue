<script setup>
import { useUserStore } from "@/stores";

const userStroe = useUserStore();
const router = useRouter();

function toLayoutHome() {
	router.push({
		// FIXME: 具名路由的名称不够语义化
		name: "",
		// name: "/",
		// 确实可以跳转到用户信息页面
		// path: "",
	});
}

const confirm = () => {
	// 1。清除用户数据
	userStroe.clearUserInfo();
	// 跳转到登录页
	router.push("/login");
};
</script>

<template>
	<nav class="app-topnav">
		<div class="container">
			<ul>
				<template v-if="userStroe.userInfo.token">
					<li>
						<a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStroe.userInfo.nickname }}</a>
					</li>
					<li>
						<el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消" @confirm="confirm">
							<template #reference>
								<a href="javascript:;">退出登录</a>
							</template>
						</el-popconfirm>
					</li>
					<li><a href="javascript:;">我的订单</a></li>
					<li>
						<RouterLink :to="'/member'">会员中心</RouterLink>
						<!-- <a href="javascript:;" @click="router.push('/member')">会员中心</a> -->
					</li>
				</template>
				<template v-else>
					<li>
						<RouterLink :to="'/login'">请先登录</RouterLink>
						<ElButton @click="toLayoutHome()"> 跳转到别的地方 </ElButton>
					</li>
					<li><a href="javascript:;">帮助中心</a></li>
					<li><a href="javascript:;">关于我们</a></li>
				</template>
			</ul>
		</div>
	</nav>
</template>

<style scoped lang="scss">
.app-topnav {
	background: #333;
	ul {
		display: flex;
		height: 53px;
		justify-content: flex-end;
		align-items: center;
		li {
			a {
				padding: 0 15px;
				color: #cdcdcd;
				line-height: 1;
				display: inline-block;

				i {
					font-size: 14px;
					margin-right: 2px;
				}

				&:hover {
					color: $xtxColor;
				}
			}

			~ li {
				a {
					border-left: 2px solid #666;
				}
			}
		}
	}
}
</style>
