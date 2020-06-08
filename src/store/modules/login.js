import {post_json,get} from '@/http/axios'
export default {
    // 命名空间
    namespaced:true,
    state:{
        token:'',
        userInfo:''
    },
    getters:{},
    mutations:{
        // 登录的突变
        refreshToken(state,token){
            state.token = token
        },
        // 用于控制登录完之后页面自动跳转
        initToken(state){
            let token = localStorage.getItem('token')
            state.token = token;
        },
        // 用户信息的突变
        refreshInfo(state,userInfo){
            state.userInfo = userInfo
        }
    },
    actions:{
        // 登录
        async login(context,params){
            let res = await post_json('/user/login',params)
            // 将token设置到浏览器
            localStorage.setItem('token', res.data.token)
            // 将token设置到state中
            context.commit('refreshToken',res.data.token)
            
            // 调用info方法
            context.dispatch('info')

            // 将请求结果返回，以便在then中使用
            return res
        },
        // 根据token换取用户信息
        async info(context){
            console.log(111)
            let token = localStorage.getItem('token')
            let res = await get('/user/info',{token})
            // 将用户信息放入浏览器
            localStorage.setItem('userInfo',JSON.stringify(res.data))
            // 将用户信息放入state
            context.commit('refreshInfo',res.data)
        }
    }
}