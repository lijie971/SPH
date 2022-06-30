import { reqGetSearchInfo } from '@/api/index.js'
//search模块的小仓库

import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//准备actions,用于响应组件中的动作
const actions = {
    async getSearchList({ commit }, params = {}) {
        //当前这个reqGetSearchInfo这个函数调用获取服务器数据的时候，至少传递一个参数(空对象)
        //params形参:是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        let result = await reqGetSearchInfo(params)
        // console.log(result)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }
    }
}

//准备mutations,用于操作数据(state)
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}

//准备state,用于存储数据
const state = {
    //search的数据
    searchList: {}
}

//getters用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    //当前这个state不是大仓库中的state,是我们这个当前仓库的state
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
}

export default {
    actions: actions,
    mutations: mutations,
    state: state,
    getters: getters
}