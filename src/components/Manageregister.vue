<template>
  <div>
    <div>
      <el-button @click="waiterloginClick">服务员登录</el-button>
    </div>
    <div>
      <el-form class="login-box">
        <h3 class="login-title">管理员注册</h3>

        <el-form-item label="餐厅" prop="restaurant">
          <el-input type="text" placeholder="请输入餐厅名" v-model="restaurant"></el-input>
        </el-form-item>

        <el-form-item label="账号" prop="name">
          <el-input type="text" placeholder="请输入账号" v-model="account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type=password placeholder="请输入密码" v-model="password"></el-input>
        </el-form-item>

        <el-form-item label="验证密码" prop="confirm">
          <el-input type=password placeholder="请再次输入密码" v-model="confirm"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="Register">注册</el-button>
          <el-button type="primary" @click="Back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Manageregister',
    data() {
      return {
        restaurant: null,
        account: null,
        password: null,
        confirm: null,
        // db: null
      }
    },
    methods: {
      waiterloginClick() {
        this.$router.push("/waiterlogin")
      },
      async Register() {
        if(this.restaurant==null||this.account==null||this.password==null){
          this.$message("请填完注册信息！")
          return
        }
        let isRestaurantExist = false
        await this.$db.collection("restaurant")
          .where({
            name: this.restaurant
          })
          .get()
          .then((res) => {
            if(res.data.length!==0){
              this.$message("餐厅名已存在")
              isRestaurantExist = true;
            }
          })
        if(isRestaurantExist===true){
          return
        }
        if(this.account.length<8||this.account.length>16){
          this.$message("用户账号必须大于八位小于十六位")
          return
        }
        if(this.password.length<8){
          this.$message("用户密码必须大于八位")
          return
        }
        if(this.password!==this.confirm){
          this.$message("两次输入密码不相同")
          return
        }
        let isAccountExist
        isAccountExist = await this.$db.collection("manage")//查看数据库中申请账号是否已存在。
          .where({
            account: this.account
          })
          .get()
          .then((res) => {
            if(res.data.length!==0){
              this.$message("用户名已存在")
              isAccountExist=true;
            }
          })
        if(isAccountExist===true){
          return
        }
        this.$db.collection("manage")
          .add({
            account: this.account,
            password: this.password,
            restaurant: this.restaurant
          })
          .then(()=>{
            this.$message("创建用户成功！")
            this.$router.push('/managelogin')
          })
        this.$db.collection("restaurant")
          .add({
            name: this.restaurant
          })
      },
      Back() {
        this.$router.push("/managelogin")
      }
    },
    mounted() {
      // this.db = this.$app.database();
    },
  }
</script>

<style scoped>

  .login-box{
    width: 250px;
    margin: 100px auto;
    border: 1px solid #DCDFE6;
    padding: 20px;
    position: absolute;
    left: 50%;
    top:40%;
    transform: translate(-50%,-50%);
    border-radius: 8px;
    box-shadow: 0 0 30px #DCDFE6;
  }

  .login-title{
    text-align: center;
  }


</style>
