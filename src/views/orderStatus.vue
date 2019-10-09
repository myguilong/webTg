<template>
  <div>
<van-tabs v-model="active">
  <van-tab title="全部">
    <order-status status='200'></order-status>
  </van-tab>
  <van-tab title="待支付">
     <order-status status='0'></order-status>
  </van-tab>
  <van-tab title="已支付">
     <order-status status='1'></order-status>
  </van-tab>
  <van-tab title="已完成">
    <order-status status='2'></order-status>
  </van-tab>
</van-tabs>

  </div>
</template>
<script>
import orderStatus from '../components/orderStatusList'
export default {
  components:{
      orderStatus
  },
  data() {
    return {
      active: 0
    };
  },
  created(){

  },
  methods: {
       statusSet(){
      //传入的路由值去修改当前的数值,将状态传入子组件
        }
  },
}
</script>
<style lang=''>
     
</style>