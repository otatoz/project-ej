import { get, post, post_array } from '@/http/axios'

export default {
  namespaced: true,
  state: {
    waiters: []
  },
  mutations: {
    refreshWaiter(state, waiters) {
      state.waiters = waiters
    }
  },
  actions: {
    async findAllWaiter(context) {
      const res = await get('/waiter/findAll')
      context.commit('refreshWaiter', res.data)
    }
  }
}
