<template>
  <div>
    <div class='input-box' >
      <p>管理员注册</p>
      <el-input v-model="account" placeholder="账号"></el-input>
      <p></p>
      <el-input v-model="password" placeholder="密码"></el-input>
      <p></p>
      <el-input v-model="comfirm" placeholder="验证密码"></el-input>
      <p></p>
      <button>注册</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Manageregister',
    data() {
      return {
        account: null,
        password: null,
        comfirm: null
      }
    },
  }
</script>

<style>
    body {
    background-color: whitesmoke;
  }

  .input-box {
    width: 180px;
    position: absolute;
    left: 50%;
    top:40%;
    transform: translate(-50%,-50%);
    border-color: black;
    background-color: lightslategray;
    padding: 25px;
  }

</style>
