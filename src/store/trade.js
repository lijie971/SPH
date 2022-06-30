import { reqAddressInfo, reqOrderInfo } from '@/api/index.js'

//trade模块的小仓库

import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//准备actions,用于响应组件中的动作
const actions = {
    //获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqAddressInfo()
        // console.log(result)
        if (result.code == 200) {
            commit('GETUSERADDRESS', result.data)
        }
    },
    //获取商品清单数据
    async getOrderInfo({ commit }) {
        let result = await reqOrderInfo()
        // console.log(result)
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    },
}

//准备mutations,用于操作数据(state)
const mutations = {
    GETUSERADDRESS(state, address) {
        state.address = address
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
}

//准备state,用于存储数据
const state = {
    address: [],
    orderInfo: {}
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