<template>
  <div>
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <div>
          <div class="top">订单编号:{{item.orderNo}}</div>
          <div class="center">
            <div class="left">
              <van-image
                v-for="(i, index) in item.list"
                :key="index"
                width="65"
                height="65"
                :src="i.thumbe"
              />
            </div>
            <div class="right">
              金额:{{item.money}}
              <van-button v-show="item.status==0" type="default" @click="topay(item.orderNo)">支付</van-button>
            </div>
          </div>
          <div class="bottom"></div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { constants } from "crypto";
import { Dialog } from "vant";
export default {
  props: ["status"],
  data() {
    return {
      list: []
    };
  },
  created() {
    this.$isLogin(this).then(res => {});
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      this.$http
        .get(
          `/order/getOrder?userid=${this.$store.state.users.user.id}&status=${this.status}`
        )
        .then(res => {
          this.list = res.data.data;
        });
    },
    async topay(value) { 
        //订单号生成成功，去支付
        Dialog.confirm({
          title: "支付",
          message: "将从你的额度中扣除相应的金额"
        }).then(() => {
            this.$http.post("/order/pay", {
              orderNo: value,
              userid: this.$store.state.users.user.id
            }).then(res=>{
              console.log(res)
              if(res.data.code==0){
                alert('支付成功，等待商家发货')
                 this.$router.push("/orderStatus");
              }
              else{
                alert('支付错误')
              }
            });
          })
          .catch(() => {
            console.log("取消");
          });     
    }
  }
};
</script>
<style lang='less'>
.top {
  font-size: 18px;
  width: 96%;
  margin-left: 2%;
  border-bottom: 1px solid black;
  line-height: 28px;
  margin-top: 9px;
}
.center {
  padding: 5px;
}
.right {
  font-size: 18px;
  height: 30px;
  border-bottom: 1px solid black;
  button {
    float: right;
    height: 25px;
    line-height: 25px;
  }
}
</style>