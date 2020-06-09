import {get,post,post_array} from '@/http/axios'

export default {
  namespaced:true,
  state:{
    customers:[],
	  customerDetail:[],
	  customerOrder:[],
	  customerAddress:[]
  },
  mutations:{
    refreshCustomer(state,customers) {
      state.customers = customers
    },
    refreshCustomerDetail(state,customerDetail) {
      state.customerDetail = customerDetail
    },
    refreshCustomerOrder(state,customerOrder){
      state.customerOrder = customerOrder
    },
    refreshCustomerAddress(state,customerAddress){
      state.customerAddress = customerAddress
    }
  },
  actions:{
    // 批量删除
    async batchDelete(context,params) {
      let res = await post_array('/customer/batchDelete',{ids:params})
      // context.commit('refreshCustomer',res.data)
      return res
    },
    // 分页查询所有顾客
    async findAllCustomer(context,params) {
      let res = await post('/customer/query',params)
      context.commit('refreshCustomer',res.data)
    },
    // 根据id查询顾客信息
    async findCustomerById(context,id) {
      let res = await get('/customer/findCustomerById',{id})
      context.commit('refreshCustomerDetail',res.data)
	  },
	  // 根据id查询顾客的订单
    async findOrderById(context,id) {
		  let res = await get('/order/queryBasic',{customerId:id})
		  context.commit('refreshCustomerOrder',res.data)
	  },
	  // 根据id查询顾客的地址
    async findAddressById(context,id) {
		  let res = await get('/address/findByCustomerId',{id})
		  context.commit('refreshCustomerAddress',res.data)
	  },
    // 修改顾客信息
    async saveOrUpdate(context,params) {
      let res = await post('/customer/saveOrUpdate',params)
    },

  }
}