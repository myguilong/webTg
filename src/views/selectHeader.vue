<template>
  <div>
    <van-nav-bar title="选择团长" />
    <van-row v-for="(item, index) in list" :key="index" class="list" >
        <div @click="selectHeader(item)">
      <van-col span="16">
         <div class="wrap">
            <van-image round width="71px" height="71px" :src="item.imgSrc" />
            <div style="padding-top:20px;text-indent: 15px;">{{item.name}}</div>
        </div>
        <p class="address">小区名称:{{item.address}}</p>
      </van-col>
      <van-col span="8">
        <span>距离你{{item.distance}}</span>
      </van-col>
      </div>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.fetchHeaderList();
  },
  methods: {
    async fetchHeaderList() {
      //获取当前位置的团长列表
      let data = await this.$http.get(
        "/header/find?longitude=113.3102&latitude=23.262"
      );
      console.log(data);
      this.list = data.data.data;
    },
    selectHeader(value){
        console.log(value)
        //数值
        localStorage.setItem('selectHeader',JSON.stringify(value))
        this.$router.push('/index')
    }
  }
};
</script>
<style lang='less'>
.list {
  position: relative;
  border-top: 4px solid #F6F6F6;
  border-bottom: 4px solid #F6F6F6;
  padding-bottom: 5px;
  padding-top: 5px;
  padding-left: 6px;
  .wrap{
      display: flex;
      font-size: 16px;
   
  }
  .address {
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
  span {
    font-size: 15px;
    position: absolute;
    display: block;
    width: 130px;
    background: orange;
    color: white;
    text-align: center;
    border-radius: 10px 0 0 10px;
    top: 30px;
  }
}
</style>