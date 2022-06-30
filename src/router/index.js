//该文件专门用于创建整个应用的路由器

import VueRouter from 'vue-router'

import routes from './routes.js'

//引入store
import store from '@/store/index.js'

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
//重写replace方法
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


//创建一个路由器
const router = new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        //vue2用y
        //vue3用top
        return { y: 0 }
    }
})

//全局守卫  ：前置守卫
router.beforeEach(async (to, from, next) => {
    //to:可以获取到你要跳转到那个路由的信息
    //from:可以获取到你从那个路由来的信息
    //next:放行函数
    // next()
    //用户登录了 才会有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    if (token) {
        //用户已经登录了就不能去login页面了
        if (to.path == '/login' || to.path == '/register') {
            next('/home')
        } else {
            //登录了,但是去的不是login,都放行
            //如果用户名已经有
            if (name) {
                next()
            } else {
                //没有用户信息
                //获取用户信息在首页展示
                try {
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    //token失效了,获取不到用户信息
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //未登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})

export default router;