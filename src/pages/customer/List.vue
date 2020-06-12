<template>
  <div class="detail">
    <el-page-header title="返回" @back="goBack" />
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="first">
		  {{customerDetail}}
	  </el-tab-pane>
      <el-tab-pane label="订单信息" name="second">
		  {{customerOrder}}
	  </el-tab-pane>
      <el-tab-pane label="服务地址" name="third">
		  {{customerAddress}}
	  </el-tab-pane>
    </el-tabs>
    <!-- {{$route.query.customerId}} -->
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  computed:{
	  ...mapState('customer', ['customerDetail','customerOrder','customerAddress'])
  },
  created() {
	// this.$route.query.customerId是浏览器地址栏上携带的参数
	// 根据id查询顾客基本信息
	this.findCustomerById(this.$route.query.customerId)
	// 根据id查询顾客的订单信息
	this.findOrderById(this.$route.query.customerId)
	// 根据id查询顾客的地址信息
	this.findAddressById(this.$route.query.customerId)
  },
  methods: {

    ...mapActions('customer', ['findCustomerById','findOrderById','findAddressById']),

    handleClick() {

    },
    // 返回上一级
    goBack() {
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

