<template>
  <div>
    <img class="user-poster" src="../assets/images/8690bb321356070e0b8c4404d087f8fd.png">
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待支付
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待收货
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        已完成
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已取消
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="申请团长" is-link to="/createHeader" />
       <van-cell icon="records" :title="money" is-link />
    </van-cell-group>

    <van-cell-group>
      <!-- <van-cell icon="points" title="我的积分" is-link /> -->
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="exchange" title="切换团长" is-link />
      <van-cell icon="idcard" title="资质" is-link />
    </van-cell-group>
  </div>
</template>
<script>
import { constants } from 'crypto';
export default {
  data() {
    return {
      money:''
    }
  },
 async created(){
  this.$isLogin(this).then(res => {
        this.fetchUserMoney()
      });
     
  },
  methods: {
    toCrateHeader(){
      console.log('456')
    },
   async fetchUserMoney(){
     console.log(this.$store.state.users._id)
       const res = await this.$http.get(`/webuser/money?id=${this.$store.state.users._id}`)
      console.log(res)
      this.money = `可用余额${res.data.data.money}`
    }
  }
}
</script>

<style lang="less">
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>