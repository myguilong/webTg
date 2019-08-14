<template>
  <div>
    <van-cell-group>
      <div class="bg">
        <h3>社区团购</h3>
      </div>
      <van-field v-model="phone" label="手机号" placeholder="请输入手机号" />
      <van-field v-model="password" label="密码" type="password" placeholder="密码" />
    </van-cell-group>
    <van-button @click="fetchlogin" style="margin-top:15px;" type="primary" size="large">登录</van-button>
    <van-button @click="toregist" style="margin-top:15px;" type="danger" size="large">去注册</van-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      password: ""
    };
  },
  methods: {
    async fetchlogin(){
     const res = await this.$http.post('/users/signin',{
                username:this.phone,
                password:this.password
         })
         if(res.data.code==0){
            this.$notify('登录成功');
            let result = await this.$http.get('/users/getuser')
            console.log(result.data)
            this.$store.commit('setUser',result.data)
            this.$router.push('/index')
         }
        
    },
    async toregist(){
        this.$router.push('/regist')
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