<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in mygoods.bannerlist" :key="thumb">
        <img :src="thumb" />
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ mygoods.name }}&nbsp;&nbsp;&nbsp;{{mygoods.specifications}}</div>
        <div class="goods-price">{{ formatPrice(mygoods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="14">剩余：{{ mygoods.stock }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" />
    </van-cell-group>
    <van-row>
      <van-col span="24" class="htmltext" v-html="mygoods.content"></van-col>
    </van-row>
    <!-- <div v-html="mygoods.content">
    </div>-->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">客服</van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">购物车</van-goods-action-icon>
      <van-goods-action-button type="warning" @click="addtoCart">加入购物车</van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">立即购买</van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      goods: {
        title: "美国伽力果（约680g/3个）",
        price: 2680,
        express: "免运费",
        remain: 19,
        thumb: [
          "https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg",
          "https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg"
        ]
      },
      mygoods: {}
    };
  },
  methods: {
    formatPrice() {
      return "¥" + this.mygoods.price;
    },
    onClickCart() {
      this.$router.push("cart");
    },
    sorry() {
      Toast("暂无后续逻辑~");
    },
    async addtoCart() {
      console.log(this.mygoods);
      let res = await this.$http.post("/cart/addCart", {
        userid: this.$store.state.users.user.id,
        commitesid: this.mygoods._id
      });
      this.$notify(res.data.msg);
    }
  },
  created() {
    this.$isLogin(this).then(res => {
      this.$http
        .get("/rest/comities/getInfo", {
          params: {
            id: this.id
          }
        })
        .then(res => {
          console.log(res);
          this.mygoods = res.data.data;
        });
    });
    console.log(this.id, "id");
  }
};
</script>

<style lang="less">
.htmltext {
  img {
    width: 100%;
  }
}
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
}
</style>