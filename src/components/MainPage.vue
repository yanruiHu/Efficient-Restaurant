<template>
  <el-container>
    <el-aside>
      <el-menu default-active="1" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人信息</span>
          </template>
          <el-menu-item-group title="工号">
            <el-menu-item index="1-1">{{ id }}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="职位">
            <el-menu-item index="1-2">{{ position }}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2" v-if="position!='cooker'" @click="toFloorPlanBar">
          <i class="el-icon-view"></i>
          <span slot="title">餐桌平面图</span>
        </el-menu-item>
        <el-menu-item index="3" v-if="position==='cooker'" @click="toDishesList">
          <i class="el-icon-tickets"></i>
          <span slot="title">出菜分配表</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-bell"></i>
          <span slot="title">任务！</span>
          <el-badge :value="newTask" />
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
        id: '',
        db: '',
        timer: '',
        newTask: '',
        position: '',
      }
    },
    methods: {
      toFloorPlanBar() {
        this.$router.push('/mainpage/floorplanbar')
      },
      toDishesList() {
        
      },
      toNewTask() {
        this.db.collection('task')
          .where({
            waiter_id: this.db.command.eq(this.id)
          })
          .watch({
            onChange: (snapshot) => {
              this.newTask = snapshot.docs[0].task
            },
            onError: () => {
              this.newTask = ''
            }
          })
      }
    },
    async mounted() {
      this.db = this.$app.database()
      this.timer = setInterval(this.toNewTask, 3000)
      this.id = JSON.parse(localStorage.getItem('account'))
      this.position = JSON.parse(localStorage.getItem('position'))
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-aside {
    width: 210px !important;
  }
</style>