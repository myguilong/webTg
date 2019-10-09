import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Category from './views/category.vue'
import Profle from './views/profle.vue'
import Cart from './views/cart.vue'
import commites from './views/commitesInfo.vue'
import Login from './views/login.vue'
import regist from './views/regist.vue'
import createHeader from './views/headerCreate.vue'
import selectHeader from './views/selectHeader.vue'
import orderStatus from './views/orderStatus.vue'
import headerOrder from './views/headerOrder.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      meta:{
        menuShow:true,
        keepAlive: true
      }
    },
    {
      path:'/category',
      name:'Category',
      component:Category,
      meta:{
        menuShow:true,
        keepAlive: true
      }
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart,
      meta:{
        menuShow:true,
        keepAlive: false
      }
    },
    {
      path:'/profle',
      name:'Profle',
      component:Profle,
      meta:{
        menuShow:true,
        keepAlive: false
      }
    },
    {
      path:'/commites/:id',
      component:commites,
      props:true,
      meta:{
        menuShow:false,
        keepAlive: false
      }
    },
    {
      path:'/Login',
      name:'login',
      component:Login,
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/regist',
      name:'regist',
      component:regist,
      meta:{
        keepAlive: false
      }
    },
    {
      path:"/createHeader",
      name:'createHeader',
      component:createHeader,
      meta:{
        keepAlive: false
      }
    },{
      path:'/selectHeader',
      name:'selectHeader',
      component:selectHeader,
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/orderStatus',
      name:'orderStatus',
      component:orderStatus,
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/headerOrder',
      name:'headerOrder',
      component:headerOrder,
      meta:{
        keepAlive: false
      }
    }
  ]
})
