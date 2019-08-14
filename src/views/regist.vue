<template>
  <div>
    <van-cell-group>
      <div class="bg">
        <h3>社区团购</h3>
      </div>
       <van-field v-model="name" label="称号" placeholder="请输入称号" />
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="password" label="密码" type="password" placeholder="密码" />
      <van-field v-model="aginpassword" label="密码" type="password" placeholder="确认密码" />
    </van-cell-group>
    <van-button @click="toregist" style="margin-top:15px;" type="danger" size="large">注册</van-button>
    <van-button @click="tologin" style="margin-top:15px;" type="primary" size="large">去登录</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name:"",
      phone: "",
      password: "",
      aginpassword:""
    };
  },
  methods: {
    async tologin(){
        this.$router.push('/login')
    },
    async toregist(){
      if(this.password==''){
        // this.$notify('密码不可以为空');
          this.$notify(`$密码不可为空`);
         return false
      }
     if(this.password !=this.aginpassword){
        this.$notify('两次密码不一致');
         return false
     }
     let res = await this.$http.post('/users/regist',{
           pintai:'web',
           name:this.name,
           username:this.phone,
           password:this.password
       })
        this.$notify(`${res.data.msg},跳转到登录页`);
        if(res.data.code ==0){
            setTimeout(() => {
                this.$router.push('/login')
            }, 100);
        }
    }
  }
};
</script>
<style lang='less'>
.bg {
  background: url("../assets/images/8690bb321356070e0b8c4404d087f8fd.png") center no-repeat;
  background-size: 100%;
  width: 100vw;
  height: 200px;
  h3 {
    font-size:50px;
    color: #07C160;
    text-shadow: 4px 4px 0px #fff, 10px 10px 0px #cbcbcd;
    text-align: center;
    line-height: 200px;
  }
}
</style>