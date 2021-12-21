<template>
  <el-form>
    <el-form-item label="账号" prop="name">
      <el-input type="text" placeholder="请输入用户名" v-model="account">
      </el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" placeholder="请输入密码" v-model="password">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" 
      @click="Login()">
        登录
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'StaffLogin',
    data() {
      return {
        account: null,
        password: null,
      }
    },
    methods: {
      Login(){
        this.$db.collection("staff")
          .where({
            account: this.account,
            password: this.password,
          })
          .get()
          .then((res) => {
            if (res.data.length === 1) {
              localStorage.setItem('account', JSON.stringify(res.data[0].account))
              localStorage.setItem('position', JSON.stringify(res.data[0].position))
              localStorage.setItem('restaurant', JSON.stringify(res.data[0].restaurant))
              localStorage.setItem('name', JSON.stringify(res.data[0].name))
              this.$router.push('./staffhome')
            }
            else {
              alert("账号或密码错误")
            }
          })
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>
  .el-form {
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
