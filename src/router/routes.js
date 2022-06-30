//引入一级路由组件
import Login from '@/pages/Login/Login.vue'
// import Home from '@/pages/Home/Home.vue'

//路由懒加载(以Home举例)
const foo = () => {
    return import('@/pages/Home/Home.vue')
}

import Register from '@/pages/Register/Register.vue'
// import Search from '@/pages/Search/Search.vue'
import Detail from '@/pages/Detail/Detail.vue'
import AddCartSuccess from '@/pages/AddCartSuccess/AddCartSuccess.vue'
import ShopCart from '@/pages/ShopCart/ShopCart.vue'
import Trade from '@/pages/Trade/Trade.vue'
import Pay from '@/pages/Pay/Pay.vue'
import PaySuccess from '@/pages/PaySuccess/PaySuccess.vue'
import Center from '@/pages/Center/Center.vue'

//引入二级路由组件
import MyOrder from '@/pages/Center/MyOrder/MyOrder.vue'
import GroupOrder from '@/pages/Center/GroupOrder/GroupOrder.vue'

//路由配置信息
export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        //二级路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            //重定向
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        },
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/home',
        component: foo,
        meta: { show: true }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/search/:keyword?',
        name: 'search',
        //这里也是路由懒加载写法
        component: () => import('@/pages/Search/Search.vue'),
        meta: { show: true },

        //路由组件能不能传递props数据
        //第一种:布尔值写法
        // props: true,
        // 第二种写法:对象写法
        // props:{keyword:1}
        // 第三种函数写法
        props($route) {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    //重定向,在项目跑起来的时候, 当访问/ 时立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]