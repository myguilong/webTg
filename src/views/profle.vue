<template>
  <div>
    <img class="user-poster" src="../assets/images/8690bb321356070e0b8c4404d087f8fd.png" />
    <van-row class="user-links">
      <van-col span="6">
        <div @click="toStatus()">
           <van-icon name="pending-payment" />待支付
        </div>
      </van-col>
      <van-col span="6">
        <van-icon name="records" />待收货
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />已完成
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />已取消
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell icon="records" v-if="!status" title="申请团长" is-link to="/createHeader" />
      <van-cell icon="records" :title="money" is-link />
    </van-cell-group>
    <van-cell-group>
      <van-cell icon="points" v-if="status" title="团购订单" is-link to='/headerOrder'/>
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="exchange" title="切换团长" is-link />
      <van-cell icon="idcard" title="资质" is-link />
    </van-cell-group>
  </div>
</template>
<script>
export default {
  data() {
    return {
      money:'',
      headerInfo:{

      },
      status:false
    }
  },
 async created(){
  this.$isLogin(this).then(res => {
    console.log(res,'promise状态')
        this.fetchUserMoney()
      });
  },
  methods: {
    toStatus(){
      console.log('跳转到订单状态页面')
      this.$router.push('/orderStatus')
    },
    toCrateHeader(){
     
    },
   async fetchUserMoney(){
     console.log(this.$store.state.users.user.id)
      const res = await this.$http.get(`/webuser/money?id=${this.$store.state.users.user.id}`)
       this.setHeaderInfo()
      this.money = `可用余额${res.data.data.money}`
    },
    async setHeaderInfo(){
      //设置团长信息

         const data = await this.$http.get(`/header/info?id=${this.$store.state.users.user.id}`)
          // localStorage.setItem('header',JSON.stringify(data.data.data))
             console.log(data)
             if(data.data.code == -1){
               this.status = false
             }
             else{
               this.status =true
             }
          //  this.headerInfo = data.data.data
        
      
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