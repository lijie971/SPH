import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api/index.js'

//home模块的小仓库

import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//准备actions,用于响应组件中的动作
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        // console.log(result)
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
    //获取Home轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGetBannerList()
        // console.log(result)
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data)
        }
    },
    //获取floor的数据
    async getFloorList({ commit }) {
        let result = await reqFloorList()
        // console.log(result)
        if (result.code == 200) {
            commit('GETFLOORLIST', result.data)
        }
    },
}

//准备mutations,用于操作数据(state)
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}

//准备state,用于存储数据
const state = {
    //state中的数据默认初始值不要瞎写,看服务器返回的是什么(对象或者数组)
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor的数据
    floorList: []
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