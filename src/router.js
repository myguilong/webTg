import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Category from './views/category.vue'
import Profle from './views/profle.vue'
import Cart from './views/cart.vue'
import commites from './views/commitesInfo.vue'
import Login from './views/login.vue'
import regist from './views/regist.vue'
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
        menuShow:true
      }
    },
    {
      path:'/category',
      name:'Category',
      component:Category,
      meta:{
        menuShow:true
      }
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart,
      meta:{
        menuShow:true
      }
    },
    {
      path:'/profle',
      name:'Profle',
      component:Profle,
      meta:{
        menuShow:true
      }
    },
    {
      path:'/commites/:id',
      component:commites,
      props:true,
      meta:{
        menuShow:false
      }
    },
    {
      path:'/Login',
      name:'login',
      component:Login
    },
    {
      path:'/regist',
      name:'regist',
      component:regist
    }
  ]
})
