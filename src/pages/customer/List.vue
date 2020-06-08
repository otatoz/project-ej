<template>
	<div class="detail">
		<el-page-header @back="goBack" title='返回'>
		</el-page-header>
		<el-tabs v-model="activeName" @tab-click="handleClick">
		    <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
		    <el-tab-pane label="订单信息" name="second">订单信息</el-tab-pane>
		    <el-tab-pane label="服务地址" name="third">服务地址</el-tab-pane>
		</el-tabs>
		<!-- {{$route.query.customerId}} -->
	</div>
</template>
<script>
	import {mapActions,mapState} from 'vuex'
	export default {
		data(){
			return {
				activeName: 'first'
			}
		},
		
		created(){
			// this.$route.query.customerId是浏览器地址栏上携带的参数
			this.findCustomerById(this.$route.query.customerId)
		},
		methods:{

			...mapActions('customer',['findCustomerById']),

			handleClick(){

			},
			// 返回上一级
			goBack(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped>
	.detail{
		margin:1em;
	}
</style>