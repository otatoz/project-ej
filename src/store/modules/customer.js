import {get,post} from '@/http/axios'

export default {
	namespaced:true,
	state:{
		customers:[]
	},
	mutations:{
		refreshCustomer(state,customers){
			state.customers = customers
		}
	},
	actions:{
		// 分页查询所有顾客
		async findAllCustomer(context,params){
			let res = await post('/customer/query',params)
			context.commit('refreshCustomer',res.data)
		},
		// 根据id查询顾客信息
		async findCustomerById(context,id){
			let res = await get('/customer/findCustomerById',{id})
			console.log(res.data)
		}
	}
}