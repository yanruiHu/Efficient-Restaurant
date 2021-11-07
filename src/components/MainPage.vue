<template>
  <el-container>
    <el-aside>
      <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人信息</span>
          </template>
          <el-menu-item-group title="工号">
            <el-menu-item index="1-1">123456</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="状态">
            <el-menu-item index="1-3">工作中</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2" @click="toFloorPlanBar">
          <i class="el-icon-view"></i>
          <span slot="title">餐桌平面图</span>
        </el-menu-item>
        <el-menu-item index="3" @click="toDishesList">
          <i class="el-icon-tickets"></i>
          <span slot="title">出菜分配表</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-bell"></i>
          <!-- <span slot="title">任务！</span> -->
          <el-badge value="新任务" v-if="toNewTask() === true" />
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: 'MainPage',
    data() {
      return {
        id: '12345678',
        db: '',
        newTask: '',
      }
    },
    props: {
      employeeId: String
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      toFloorPlanBar() {
        this.$router.push('/mainpage/floorplanbar')
      },
      toDishesList() {
        
      },
      //没成功
      toNewTask() {
        var ifNewTask = false
        this.db.collection('task')
          .where({
            waiter_id: this.db.command.eq(this.id)
          })
          .watch({
            onChange: function(snapshot) {
              this.newTask = snapshot.docs[0].task
              ifNewTask = true
              console.log(snapshot)
            },
            onError: function(err) {
              console.error(err)
            }
          })
        return ifNewTask
      }
    },
    mounted() {
      this.db = this.$app.database() 
    }
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  
</style>