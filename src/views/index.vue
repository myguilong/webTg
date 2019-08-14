<template>
  <div>
    <!-- <p>{{this.$store.state.users}}</p> -->
    <van-search placeholder="请输入搜索关键词" @focus="toSearch" />
    <div class="line"></div>
    <van-row class="headerInfo">
      <van-col :span="15" class="info">
        <van-image round width="50px" height="50px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div>
          <p>明智之举</p>
          <p>
            <van-icon name="location-o" size="3px"></van-icon>安华汇北塔写字楼
          </p>
          <p>"团购名字"</p>
        </div>
      </van-col>
      <van-col :span="4" style="text-align:center;">
        <van-icon name="share" size="25"></van-icon>
        <span style="display:block;font-size:13px;">分享</span>
      </van-col>
      <van-col :span="4" style="text-align:center;">
        <van-icon name="user-o" size="25"></van-icon>
        <span style="display:block;font-size:13px;">附近团长</span>
      </van-col>
    </van-row>
    <van-swipe :autoplay="3000" style="height: 150px;" indicator-color="white" class="swipe">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img width="100%" :src="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="foodslist">
      <van-row>
        <van-col :span="6" class="time">
          <van-icon name="fire"></van-icon>
          <span>今日团购</span>
          <p>距结束</p>
        </van-col>
        <van-col :span="6" class="fzButton">
          <van-button round plain hairline type="primary">复制拼团</van-button>
        </van-col>
      </van-row>
      <van-tabs background="#F7F7F7" sticky animated color="#7DCC21" title-active-color="#7DCC21"   @scroll="scroll"
          @click="fetchCategory">
        <van-tab
          v-for="(item,index) in categoryList"
          :title="item.name"
          :key="index"
          :name="item.index"
        >
         <!-- 放子组件 -->
         <foodsList :categoryid='item.name'/>
        </van-tab>
      </van-tabs>
    
    </div>
  </div>
</template>
<script>
import foodsList from '../components/foodsList'
export default {
  data() {
    return {
      images: [
        "https://img.yzcdn.cn/vant/apple-1.jpg",
        "https://img.yzcdn.cn/vant/apple-2.jpg"
      ],
      categoryList: [
        {
          name: "热卖",
          index:2
        },
        {
          name: "蔬菜水果",
           index:5
        },
        {
          name: "水产冰冻",
          index:7
        },
        {
          name: "休闲食品",
          index:8
        },
        {
          name: "休闲食品",
          index:9
        },
        {
          name: "水产冰冻",
          index:10
        },
        {
          name: "休闲食品",
          index:11
        }
      ]
    };
  },
  components: {
      foodsList
  },
  methods: {
    toSearch() {
      console.log("1234");
    },
    scroll(scrollTop, isFixed) {
      console.log(scrollTop);
    },
    fetchCategory(name,title){
        console.log(name,title)
    }
  },
  created(){
   
    }
};
</script>
<style lang='less'>
.line {
  margin-top: 2px;
  width: 100vw;
  height: 2px;
  background: #f9f9f9;
}
.swipe {
  margin-top: 10px;
  width: 90%;
  margin-left: 5%;
  border-radius: 15px;
}
.headerInfo {
  margin-top: 5px;
  .info {
    padding-left: 20px;
    margin-top: 13px;
    display: flex;
    font-size: 15px;
    p {
      margin: 0;
      padding: 0;
      line-height: 19px;
      text-indent: 5px;
    }
    p:nth-child(2) {
      color: #89c842;
      text-indent: 1px;
    }
    p:nth-child(3) {
      color: #9c9c9c;
    }
  }
}
.foodslist {
  margin-top: 10px;
  background: #f7f7f7;
  margin-bottom: 80px;
  .time {
    padding-top: 12px;
    font-size: 16px;
    padding-left: 5px;
    i {
      color: #feb247;
    }
    span {
      font-weight: bold;
    }
    p {
      margin: 0;
      padding: 0;
      font-size: 13px;
    }
  }
  .fzButton {
    float: right;
    button {
      height: 28px;
      line-height: 30px;
    }
  }
}
</style>