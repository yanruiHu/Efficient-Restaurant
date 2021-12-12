<template>
  <div>
    <div class="vip">
      <el-button @click="waiterloginClick">
        员工登录
      </el-button>
      <el-button @click="VIP" style="color:red">
        VIP通道: 无需密码即可以管理员身份进入(仅供开发人员测试)
      </el-button>
    </div>
    <div>
      <el-form class="login-box">
        <h3 class="login-title">管理员登录</h3>
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
          @click="Login">
            登录
          </el-button>
          <el-button type="primary" 
          @click="toRegister">
            注册
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ManageLogin',
    data() {
      return {
        account: null,
        password: null,
      }
    },
    methods: {
      toRegister() {
        this.$router.push('/manageregister')
      },
      Login() {
        this.$db.collection("manage")
          .where({
            account: this.account,
            password: this.password,
          })
          .get()
          .then((res) => {
            console.log(res)
            if (res.data.length == 1) {
              console.log(res.data)
              localStorage.setItem('restaurant', JSON.stringify(res.data[0].restaurant))
              localStorage.setItem('account', JSON.stringify(res.data[0].account))
              localStorage.setItem('address', JSON.stringify(res.data[0].address))
              localStorage.setItem('head', JSON.stringify(res.data[0].head))
              localStorage.setItem('position', JSON.stringify('manager'))
              this.$app
                .getTempFileURL({
                  fileList: [res.data[0].head]
                })
                .then((res) => {
                  localStorage.setItem('head', JSON.stringify(res.fileList[0].tempFileURL))
                });
              this.$router.push('./managehome')
            }
            else {
              alert("账号或密码错误")
            }
          })
      },
      waiterloginClick() {
        this.$router.push('/stafflogin');
      },
      VIP() {
        this.$router.push('./managehome')
      }
    },
    mounted() {
    },
  }
</script>

<style scoped>
  .login-box {
    width: 250px;
    margin: 100px auto;
    border: 1px solid #DCDFE6;
    padding: 20px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    border-radius: 8px;
    box-shadow: 0 0 30px #DCDFE6;
  }

  .login-title {
    text-align: center;
  }

  .vip {
    text-align: center;
  }

  .el-form-item {
    text-align: center;
  }
</style>
