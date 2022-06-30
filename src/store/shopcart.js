import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from '@/api/index.js'

//shopcart模块的小仓库

import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//准备actions,用于响应组件中的动作
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        // console.log(result)
        if (result.code == 200) {
            commit('GETCARTLIST', result.data)
        }
    },
    //删除购物车某个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改购物车某个产品选中的状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        // console.log(result)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        //context:小仓库,commit（提交mutations修改state）...
        //获取购物车中全部的产品
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            if (item.isChecked == 1) {
                let promise = dispatch('deleteCartListBySkuId', item.skuId)
                PromiseAll.push(promise)
            }
        });
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        // console.log(state)
        // console.log(isChecked)
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        //最终返回的结果
        return Promise.all(promiseAll)
    }
}
//准备mutations,用于操作数据(state)
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

//准备state,用于存储数据
const state = {
    cartList: []
}

//getters用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}

export default {
    actions: actions,
    mutations: mutations,
    state: state,
    getters: getters
}