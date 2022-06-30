//当前的这个模块:API进行统一管理
import requests from './ajax.js'
import mockRequests from './mockajax.js'

//三级联动接口/api/product/getBaseCategoryList   GET 无参数
//发请求:axios发请求,返回的结果是promise对象
export const reqCategoryList = () => {

   return requests({ url: '/product/getBaseCategoryList', method: 'get' })

}

//获取banner(Home首页轮播图的接口)
export const reqGetBannerList = () => {
   return mockRequests({ url: '/banner', method: 'get' })
}

//获取floor
export const reqFloorList = () => {
   return mockRequests({ url: '/floor', method: 'get' })
}

//获取搜索模块的数据   /api/list  post  需要带参
export const reqGetSearchInfo = (params) => {
   return requests({ url: '/list', method: 'post', data: params })
}

//获取产品详情信息的接口  /api/item/{ skuId }   get 带skuId参数
export const reqGoodsInfo = (skuId) => {
   return requests({ url: `/item/${skuId}`, method: 'get' })
}

//将产品添加到购物车中(获取更新某一个产品的个数)  
//   /api/cart/addToCart/{ skuId }/{ skuNum }   post请求
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
   return requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
}

//获取购物车列表数据接口     /api/cart/cartList  get请求
export const reqCartList = () => {
   return requests({ url: '/cart/cartList', method: 'get' })
}

//获取删除购物车商品接口  /api/cart/deleteCart/{skuId}   DELETE请求
export const reqDeleteCartById = (skuId) => {
   return requests({ url: `/cart/deleteCart/${skuId} `, method: 'delete' })
}

//切换商品选中状态接口    /api/cart/checkCart/{skuId}/{isChecked}  get请求
export const reqUpdateCheckedById = (skuId, isChecked) => {
   return requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
}

//获取验证码的接口  /api/user/passport/sendCode/{phone}   get请求
export const reqGetCode = (phone) => {
   return requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
}

//注册用户接口   /api/user/passport/register   POST请求  带参请求
export const reqUserRegister = (data) => {
   return requests({ url: '/user/passport/register', method: 'post', data })
}

//登录接口  /api/user/passport/login  post请求  带参请求
export const reqUserLogin = (data) => {
   return requests({ url: '/user/passport/login', method: 'post', data })
}

//获取用户的信息(需要带着用户的token向服务器要信息)   
//       /api/user/passport/auth/getUserInfo     get请求
export const reqUserInfo = () => {
   return requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
}

//退出登录接口   /api/user/passport/logout  get请求
export const reqLogout = () => {
   return requests({ url: '/user/passport/logout', method: 'get' })
}

//获取用户地址信息  /api/user/userAddress/auth/findUserAddressList 
export const reqAddressInfo = () => {
   return requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
}


//获取商品清单接口     /api/order/auth/trade   get请求
export const reqOrderInfo = () => {
   return requests({ url: '/order/auth/trade', method: 'get' })
}


//提交订单接口   /api/order/auth/submitOrder?tradeNo={tradeNo}   post请求
export const reqSubmitOrder = (tradeNo, data) => {
   return requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
}

//获取订单支付信息     /api/payment/weixin/createNative/{orderId}   get请求
export const reqPayInfo = (orderId) => {
   return requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
}

//查询支付订单状态    /api/payment/weixin/queryPayStatus/{orderId}   get请求
export const reqPayStatus = (orderId) => {
   return requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
}

//获取个人中心的数据     /api/order/auth/{page}/{limit}     get请求
export const reqMyOrderList = (page, limit) => {
   return requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
}