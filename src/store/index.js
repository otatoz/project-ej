import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

// 导入登录
import login from './modules/login'
// 导入文章管理
import customer from './modules/customer'
// 导入订单管理
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    login,
    customer,
    order
  },
  getters
})

export default store
