import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api/index.js'
import { setToken, getToken, removeToken } from '@/utils/token.js'
//登录与注册的模块的小仓库

import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//准备actions,用于响应组件中的动作
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        // console.log(result)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user)
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登录业务
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // console.log(result)
        //服务器下发的token是用户唯一标识符(跟uuid像)
        //将来经常通过带token找服务器要用户信息进行展示
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        // console.log(result)
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //退出登录
    async userLogout({ commit }) {
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
//准备mutations,用于操作数据(state)
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    //清除本地数据
    CLEAR(state) {
        state.token = ""
        state.userInfo = {}
        removeToken()
    }
}

//准备state,用于存储数据
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}

//getters用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {

}

export default {
    actions: actions,
    mutations: mutations,
    state: state,
    getters: getters
}