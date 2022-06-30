//该文件用于创建Vuex中最为核心的store

import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'

import home from './home.js'
import search from './search.js'
import detail from './detail.js'
import shopcart from './shopcart.js'
import user from './user.js'
import trade from './trade.js'

Vue.use(Vuex)


//创建store
const store = new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
})

//暴露store
export default store