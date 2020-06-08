<template>
	<div class="customer">
		<el-table
	      :data="customers.list"
	      style="width: 100%">
	      <el-table-column
	        prop="username"
	        label="用户名"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="realname"
	        label="真实姓名"
	        width="180">
	      </el-table-column>
	      <el-table-column
	        prop="telephone"
	        label="电话号码">
	      </el-table-column>
	      <el-table-column
	        prop="status"
	        label="状态">
	      </el-table-column>
	      <el-table-column label="操作">
	      	<template v-slot='slot'>
	      		<a href="" @click.prevent='deleteHandler(slot.row)'>删除</a>
	      		<a href="" @click.prevent='detailHandler(slot.row)'>查看详情</a>
	      		<a href="" @click.prevent='editHandler(slot.row)'>编辑</a>
	      	</template>
	      </el-table-column>
	    </el-table>
	</div>
</template>

<script>
	import {mapActions,mapState} from 'vuex'

	export default {
		data(){
			return {
				params:{
					page:0,
					pageSize:10
				}
			}
		},
		computed:{
			...mapState('customer',['customers'])
		},
		created(){
			this.findAllCustomer(this.params)
		},
		methods:{
			...mapActions('customer',['findAllCustomer']),
			// 删除
			deleteHandler(row){
				console.log(row)
			},
			// 详情
			detailHandler(){

			},
			// 编辑
			editHandler(){

			}
		}
	}
</script>

