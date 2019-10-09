<template>
  <div>
    <van-checkbox-group v-model="result">
      <van-swipe-cell v-for="(item, index) in goods" :key="index" class="wrap">
        <van-checkbox class="checkbox" :key="item._id" :name="item._id"></van-checkbox>
        <van-card
          class="cartDetil"
          :title="item.commites.name"
          :desc="item.commites.specifications"
          :num="item.number"
          :price="item.commites.price"
          :thumb="item.commites.bannerlist[0]"
        />
        <template slot="right">
          <van-button class="delBtn" square type="danger" text="删除" @click="delCart(item._id)" />
        </template>
      </van-swipe-cell>
    </van-checkbox-group>
    <van-submit-bar
      :price="totalPrice*100"
      :disabled="!checkedGoods.length"
      :button-text="submitBarText"
      @submit="onSubmit"
    />
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      checkedGoods: ["1", "2", "3"],
      goods: [],
      result: [],
      totalPrice: "0"
    };
  },
  computed: {
    submitBarText() {
      return `结算(${this.result.length})`;
    }
  },
  watch: {
    result() {
      // this.goods.map(item=>{
      //   console.log(item)
      // })
      let arr = [];
      if (this.result.length == 0) {
        this.totalPrice = 0;
        return;
      }
      this.result.map(item => {
        this.goods.map(i => {
          if (i._id == item) {
            arr.push(i.commites.price * i.number);
          }
        });
      });
      this.totalPrice = arr.reduce((toal, item) => {
        return toal + item;
      });
    }
  },
  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    async onSubmit() {
      let data = localStorage.getItem("selectHeader");
      data = JSON.parse(data);
      let res = await this.$http.post("/order/create", {
        foodsList: this.result,
        userid: this.$store.state.users.user.id,
        headerId: data.userId
      });
      console.log(res);
      if (res.data.data.DDNO) {
        //订单号生成成功，去支付
        Dialog.confirm({
          title: "支付",
          message: "将从你的额度中扣除相应的金额"
        })
          .then(() => {
             this.$http.post('/order/pay',{
               orderNo:res.data.data.DDNO,
               userid:this.$store.state.users.user.id
             })
             this.fetchCart()
             this.$router.push('/orderStatus')
          })
          .catch(() => {
            console.log("取消");
          });
      }
    },
    async fetchCart() {
      let res = await this.$http.get(
        `/cart/getCart?userid=${this.$store.state.users.user.id}`
      );
      console.log(res);
      this.goods = res.data.data;
    },
    async delCart(value) {
      let res = await this.$http.get(`/rest/cart/delete?id=${value}`);
      console.log(res);
      this.$notify("删除成功");
      this.fetchCart();
    }
  },
  created() {},
  mounted() {
    // console.log(this.$store.state.users.user.id,'状态,用户的——id')
    this.$isLogin(this).then(res => {
      this.fetchCart();
    });
  }
};
</script>

<style lang="less">
.wrap {
  position: relative;
}
.checkbox {
  width: 20px;
  position: absolute;
  z-index: 500;
  top: 50px;
  left: 4px;
}
.delBtn {
  height: 115px;
}
.cartDetil {
  width: 355px;
  float: left;
  padding-left: 26px;
}
.card-goods {
  padding: 10px 0;
  background-color: #fff;
  &__item {
    position: relative;
    background-color: #fafafa;
    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }
    .van-card__price {
      color: #f44;
    }
  }
}
.van-submit-bar {
  position: fixed;
  bottom: 51px;
  left: 0;
  z-index: 100;
  width: 100%;
  background-color: #fff;
  -webkit-user-select: none;
  user-select: none;
}
</style>