//这个方法用来判断用户是否登录
 export default function isLogin(_this){
    // eslint-disable-next-line no-console
     return new Promise((resolve) => {
        if(_this.$store.state.users.name){
            //状态为已经登录
        }else{
            _this.$http.get('/users/getuser').then(res=>{
                // eslint-disable-next-line no-empty
                if(res.data.name){
                    _this.$store.commit('setUser',res.data)
                    resolve('1')
                }else{
                    _this.$notify('您未登录');
                    _this.$router.push('/login')
                }
            })
        }
     });
}
