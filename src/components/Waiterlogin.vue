<template>
  <div>
    <div>
      <el-button @click="manageloginClick">管理员登录</el-button>
      <el-button @click="VIP" style="color:red">VIP通道：无需密码即可以员工身份进入(仅供开发人员测试)</el-button>
    </div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" class="login-box">
        <h3 class="login-title">服务员登录</h3>
        <el-form-item label="账号" prop="name">
          <el-input type="text" placeholder="请输入用户名" v-model="account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WaiterLogin',
    data() {
      return {
        account: null,
        password: null,
        rules: {
          name: [
            // { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            // { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push('/floorplanbar')
            alert('submit!')
          } else {
            this.$message.error('用户名或密码错误')
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      manageloginClick() {
        this.$router.push('/managelogin');
      },
      VIP() {
        this.$router.push('./mainpage')
      }
    }
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
    top:40%;
    transform: translate(-50%,-50%);
    border-radius: 8px;
    box-shadow: 0 0 30px #DCDFE6;
  }

  .login-title {
    text-align: center;
  }
</style>