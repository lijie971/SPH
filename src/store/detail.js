import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api/index.js'
import {getUUID} from '@/utils/uuid_token.js'

//detail模块的小仓库

import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

Vue.use(Vuex)

//准备actions,用于响应组件中的动作
const actions = {
    //获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId)
        // console.log(result)
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //服务器写入数据成功,并且没有返回其他的数据,只是返回了code=200,代表这次操作成功
        //因为服务器没有返回其他数据,因此不需要vuex三连环存储数据
        //返回的是Promise
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // console.log(result)
        //代表服务器加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else {
            //代表服务器加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    },
}

//准备mutations,用于操作数据(state)
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo = goodsInfo
    }
}

//准备state,用于存储数据
const state = {
    goodsInfo: {},
    //游客的临时身份
    uuid_token: getUUID()
}

//getters用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //当前计算出来的categoryView属性值,至少是个空对象
        return state.goodsInfo.categoryView || {}
    },
    //产品的信息简化数据
    skuInfo(state) {
        return state.goodsInfo.skuInfo || {}
    },
    //产品的售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList || []
    }
}

export default {
    actions: actions,
    mutations: mutations,
    state: state,
    getters: getters
}