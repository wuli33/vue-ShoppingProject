// 当前模块，API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

// 三级联动接口   // axios发请求返回结果是Promise对象
//     地址：api/product/getBaseCategoryList  方式：get       无参数
export const reqCategoryList = ()=>requests({url:'/product/getBaseCategoryList',method:'get'});

// 获取banner
export const reqGetBannerList = ()=>mockRequests.get('/banner')

// 获取floor数据
export const reqFloorList = ()=>mockRequests.get('/floor')

// 获取搜索模块数据 地址：/api/list  方式：post 
// 当前这个接口给服务器传递一个默认的参数 参数至少是一个空对象
export const reqGetSearchInfo = (params)=>requests({url:'/list',method:'post',data:params})

// 获取产品详情信息的接口 地址：/api/item/{ skuId }    方式：get  必须带参数skuId
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车中 或者更新某一个产品的个数   地址：/api/cart/addToCart/{ skuId }/{ skuNum }  必须带参数skuId、skuNum
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
	
//  获取购物车列表     地址：/api/cart/cartList  GET
export const reqCartList =()=>requests({url:'/cart/cartList',method:'get'})

// 删除购物车商品    地址：/api/cart/deleteCart/{skuId}   method:DELETE
export const reqDeleteById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

//切换商品选中状态           地址：/api/cart/checkCart/{skuId}/{isChecked}   方式：get
export const reqUpdateCheckedById = (skuId,isChecked)=>requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})


// 获取验证码      地址：/api/user/passport/sendCode/{phone}     method ：get
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'})


// 16.注册用户       地址： /api/user/passport/register     post     phone code password 
export const reqUserRegister =(data)=>requests({url:"/user/passport/register",data,method:'post'})


// 2.登录             /api/user/passport/login    post  phone   password
export const reqUserLogin = (data)=>requests({url:"/user/passport/login",data,method:'post'})

//获取用户信息   需要带着用户的token向服务器要用户信息    method ：get     /api/user/passport/auth/getUserInfo
export const reqUserInfo = ()=>requests({url:"/user/passport/auth/getUserInfo",method:'get'})

//退出登陆       /api/user/passport/logout   GET
export const reqLoginout = ()=>requests({url:"/user/passport/logout",method:'get'})


//获取用户地址信息     /api/user/userAddress/auth/findUserAddressList    get
export const reqAddressInfo = ()=>requests({url:"/user/userAddress/auth/findUserAddressList",method:'get'})

// 获取订单交易页信息    /api/order/auth/trade    get
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

// 12.提交订单     /api/order/auth/submitOrder?tradeNo={tradeNo}                 POST
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:"post"})

//获取支付信息         /api/payment/weixin/createNative/{orderId}   get
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 查询支付订单状态     /api/payment/weixin/queryPayStatus/{orderId}     get
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 11.获取我的订单列表    /api/order/auth/{page}/{limit}      GET
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})