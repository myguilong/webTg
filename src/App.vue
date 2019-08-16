<template>
  <div>
    <router-view></router-view>
    <van-tabbar route v-show="$route.meta.menuShow">
    <van-tabbar-item
      replace
      to="/index"
      icon="home-o"
    >
     首页
    </van-tabbar-item>
    <van-tabbar-item
      replace
      to="/category"
      icon="apps-o"
    >
      分类
    </van-tabbar-item>
      <van-tabbar-item
      replace
      to="/cart"
      icon="cart-o"
    >
      购物车
    </van-tabbar-item>
     <van-tabbar-item
      replace
      to="/profle"
      icon="contact"
    >
      我的
    </van-tabbar-item>
  </van-tabbar>
    <!-- <van-row class="fixedMenu" v-show="$route.meta.menuShow">
      <van-col span="6">
        <router-link to="/index" :class="$route.path=='/index'?'active':''">
          <van-icon name="wap-home" size="27px" />
          <span>首页</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/category" :class="$route.path=='/category'?'active':''">
          <van-icon name="apps-o" size="27px" />
          <span>分类</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/cart" :class="$route.path=='/cart'?'active':''">
          <van-icon name="cart-o" size="27px" />
          <span>购物车</span>
        </router-link>
      </van-col>
      <van-col span="6">
        <router-link to="/profle" :class="$route.path=='/profle'?'active':''">
          <van-icon name="contact" size="27px" />
          <span>我的</span>
        </router-link>
      </van-col>
    </van-row> -->
  </div>
</template>
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
a{
  color: black;
}
.active {
  color: #89c842;
}
</style>
