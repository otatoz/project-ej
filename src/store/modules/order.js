import { get, post, post_array } from '@/http/axios'

export default {
  namespaced: true,
  state: {
    orders: [],
    ordersStatus: []
  },
  getters: {
    // 待支付
    orderUnPay(state) {
      const res = state.ordersStatus.filter((item) => {
        return item.status == '待支付'
      })
      return res
    },
    // 待派单
    orderUnSend(state) {
      const res = state.ordersStatus.filter((item) => {
        return item.status == '待派单'
      })
      return res
    }
  },
  mutations: {
    refreshOrder(state, orders) {
      state.orders = orders
    },
    refreshOrderStatus(state, ordersStatus) {
      state.ordersStatus = ordersStatus
    }
  },
  actions: {
    // 分页查询订单
    async findAllOrder(context, params) {
      const res = await post('/order/queryPage', params)
      //   res.data包含了分页信息
      context.commit('refreshOrder', res.data)
    },
    // 查询所有订单
    async findAll(context) {
      const res = await get('/order/findAll')
      context.commit('refreshOrderStatus', res.data)
    }
  }
}
