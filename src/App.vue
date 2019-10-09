<template>
  <div>
    <keep-alive>
      <router-view  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar route v-show="$route.meta.menuShow">
      <van-tabbar-item  to="/index" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item replace to="/cart" icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item replace to="/profle" icon="contact">我的</van-tabbar-item>
      <!-- <button @click="toPage('/index')">首页</button>
      <button @click="toPage('/index')">分类</button>
      <button >购物车</button>
      <button>我的</button> -->
    </van-tabbar>
  </div>
</template>
<script>
export default {
   
   methods: {
     toPage(value){
        this.$router.push({
          path:value
        })
     }
   }
}
</script>
<style lang="less">
.fixedMenu {
  padding-top: 5px;
  height: 68px;
  border-top: 1px solid rgb(241, 243, 244);
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: white;
  span {
    display: block;
    font-size: 14px;
  }
}
a {
  color: black;
}
.active {
  color: #89c842;
}
</style>
