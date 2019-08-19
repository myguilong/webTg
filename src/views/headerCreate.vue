<template>
  <div>
    <van-nav-bar title="申请团长" />
    <van-cell-group>
      <van-field
        v-model="headerName"
        clearable
        label="姓名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('用户名')"
      />

      <van-field v-model="phone" type="text" label="手机号" placeholder="请输入手机号" required />
      <!-- <van-field v-model="city" type="text" label="城市" placeholder="请输入城市" required /> -->

      <van-cell icon="location-o" :title="address">
        <van-button type="primary" size="small" @click="geo">获取当前位置</van-button>
      </van-cell>
      <van-field v-model="unAddress" type="text" label="详细地址" placeholder="请输入详细地址" required />
      <van-uploader v-model="fileList" :after-read="afterRead" multiple :max-count="1" />
      <van-cell title="上传头像"></van-cell>
      <van-button type="primary" size="large" @click="toCreate">申请团长</van-button>
    </van-cell-group>
  </div>
</template>
<script>
import OSS from "ali-oss";
import MapLoader from "@/assets/js/AMap.js";
import getPosition from "../plugins/geo";
export default {
  data() {
    return {
      fileList: [],
      headerName: "",
      phone: "",
      city: "",
      imgstr: "",
      address: "",
      longtitude: "",
      latitude: "",
      unAddress:''
    };
  },
  created(){
        MapLoader();
  },
  methods: {
    async toCreate(){
           let res = await this.$http.post('/header/create',{
             longitude:this.longtitude,
             latitude:this.latitude,
             address:this.address,
             city:this.city,
             unaddress:this.unAddress,
             imgSrc:this.imgstr,
             phone:this.phone,
             name:this.headerName
           })
    },
    async afterRead(file) {
      const clinet = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "LTAIDaT373YHmkTC",
        accessKeySecret: "ndTGswjQlWA2uz1m4Du3Drd73ULN13",
        bucket: "mycz"
      });
      let res = await this.$http.get("/users/getuser");
      const name = res.data._id + file.file.name;
      console.log(file.file);
      clinet.multipartUpload(name, file.file).then(res => {
        const imgstr = clinet.signatureUrl(res.name, { expires: 315360000 });
        console.log(this);
        this.imgstr = imgstr;
      });
    },
    geo() {
      getPosition()
        .then(result => {
          console.log(result);
          let queryData = {
            longtitude: String(result.longitude).match(/\d+\.\d{0,6}/)[0],
            latitude: String(result.latitude).match(/\d+\.\d{0,6}/)[0]
          };
          this.longtitude = queryData.longtitude;
          this.latitude = queryData.latitude;
          console.log(queryData);
         this.$http.get(`https://restapi.amap.com/v3/geocode/regeo?output=json&location=${queryData.longtitude},${queryData.latitude}&key=87699791f29eda4e402ac9e471a4376a&radius=1000&extensions=all`).then(res=>{
             console.log(res.data.regeocode.formatted_address)
             console.log(res,'地址')
             this.city = res.data.regeocode.addressComponent.city
             this.address = res.data.regeocode.formatted_address
         })
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang='less'>
</style>