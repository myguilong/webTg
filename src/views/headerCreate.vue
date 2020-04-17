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
    
   let  mapObj = new AMap.Map('iCenter');
        mapObj.plugin('AMap.Geolocation', function () {
           let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            mapObj.addControl(geolocation);
            geolocation.getCurrentPosition();
           
            AMap.event.addListener(geolocation, 'complete', (res)=>{
               console.log(res)
            });//返回定位信息
            AMap.event.addListener(geolocation, 'error',err=>{
              console.log(err)
            });      //返回定位出错信息
        });

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
        accessKeyId: "",
        accessKeySecret: "",
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
