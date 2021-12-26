<template>
  <el-form>
    <el-form-item label="餐厅" prop="restaurant">
      <el-input type="text" placeholder="请输入餐厅名" v-model="restaurant">
      </el-input>
    </el-form-item>
    <el-form-item label="账号" prop="name">
      <el-input type="text" placeholder="请输入账号" v-model="account">
      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type=password placeholder="请输入密码" v-model="password">
      </el-input>
    </el-form-item>
    <el-form-item label="验证密码" prop="confirm">
      <el-input type=password placeholder="请再次输入密码" v-model="confirm">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" 
      @click="Register">
        注册
      </el-button>
      <el-button type="primary" 
      @click="Back">
        返回
      </el-button>
    </el-form-item>
  </el-form>
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
      }
    },
    methods: {
      async Register() {
        if(this.restaurant==null||this.account==null||this.password==null){
          this.$message("请填完注册信息!")
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
        await this.$db.collection("manage")//查看数据库中申请账号是否已存在。
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
        await this.$db.collection("manage")
          .add({
            account: this.account,
            password: this.password,
            restaurant: this.restaurant
          })
          .then(()=>{
            this.$message("创建用户成功!")
            this.$router.push('/managelogin')
          })
        this.$db.collection("restaurant")
          .add({
            name: this.restaurant
          })
      },
      Back() {
        this.$router.go(-1)
      }
    },
    mounted() {
    },
  }
</script>

<style scoped>
  .el-form {
    width: 350px;
    height: 450px;
    background-color: white;
    opacity: 0.95;
    border: 0;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .el-form-item {
    height: 60px;
  }
  .el-button {
    margin-top: 25px;
  }
</style>
