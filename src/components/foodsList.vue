<template>
  <div>
    <van-card class="info"
      v-for="(item, index) in list" :key="index"
      :price="item.price"
      :desc="item.specifications"
      :title="item.name"
      :thumb="item.bannerlist[0]"
      @click="toFoodsInfo(item._id)"
    >
      <div slot="tags" style="margin-top:8px;">
        <van-tag type="danger">次日达</van-tag>
        
        <van-tag type="danger" v-if="item.limit">
          限购商品
        </van-tag>
      </div>
      <div slot="footer">
        <van-button type="primary" size="mini">购买</van-button>
      </div>
    </van-card>
  </div>
</template>
<script>
export default {
  props: ["categoryid"],
  data() {
    return {
      list: []
    };
  },
  methods: {
    async fetchFoodlist() {
      this.$http.get(`/rest/comities/list?id=${this.categoryid}`).then(res => {
        this.list = res.data.data;
      });
    },
    toFoodsInfo(toFoodsInfo){
     this.$router.push(`/commites/${toFoodsInfo}`)
    }
  },
  created() {
    this.fetchFoodlist();
  }
};
</script>
<style lang='less'>
.van-card__thumb {
    position: relative;
    -webkit-box-flex: 0;
    -webkit-flex: none;
    flex: none;
    width: 3.8rem;
    height: 2.4rem;
    margin-right: 0.21333rem;
}
.info{
    font-size: 16px;
    line-height: 20px;
}
.van-card__desc {
    max-height: 0.53333rem;
    color: #7d7e80;
    margin-top: 5px;
}
.van-card__price {
    display: inline-block;
    color: #f44;
    font-weight: 500;
    margin-top: 3px;
}
</style>