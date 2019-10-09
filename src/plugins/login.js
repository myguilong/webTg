//这个方法用来判断用户是否登录
export default function isLogin(_this) {
    // eslint-disable-next-line no-console
    return new Promise((resolve) => {
        
        const data = localStorage.getItem('webUserinfo')
        // eslint-disable-next-line no-console
        console.log(data)
        if (data) {
            _this.$store.commit('setUser', JSON.parse(data))
            resolve('2')
        } else {
            // eslint-disable-next-line no-console
            console.log('123456')
            resolve('-1')
            _this.$notify('您未登录');
            _this.$router.push('/login')
        }
        // if(_this.$store.state.users.user){
        //     //状态为已经登录
        //     resolve('2')
        // }else{
        //     _this.$http.get('/users/getuser').then(res=>{
        //         // eslint-disable-next-line no-empty
        //         if(res.data.name){
        //             _this.$store.commit('setUser',res.data)
        //             resolve('1')
        //         }else{
        //             _this.$notify('您未登录');
        //             _this.$router.push('/login')
        //         }
        //     })
        // }
    });
}