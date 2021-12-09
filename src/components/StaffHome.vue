<template>
  <el-container>
    <el-aside>
      <el-menu :default-active="activeIndex" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人信息</span>
          </template>
          <el-menu-item-group title="姓名">
            <el-menu-item index="1-1">{{ name }}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="工号">
            <el-menu-item index="1-2">{{ staffId }}</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="职位">
            <el-menu-item index="1-3">{{ position }}</el-menu-item>
          </el-menu-item-group>
          <el-button type="danger" size="small"
          @click="dialogVisible = true">
            退出登录
          </el-button>
          <el-dialog :visible.sync="dialogVisible">
            <span>确定退出登录？</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">
                  取 消
                </el-button>
                <el-button type="primary" @click="toStaffLogin()">
                  确 定
                </el-button>
                </span>
              </template>
            </el-dialog>
        </el-submenu>
        <el-menu-item index="2" v-if="position!=='chef'" 
        @click="toFloorPlanBar()">
          <i class="el-icon-view"></i>
          <span>餐桌平面图</span>
        </el-menu-item>
        <el-menu-item index="3" v-if="position==='chef'" 
        @click="toCookAssign()">
          <i class="el-icon-tickets"></i>
          <span>出菜分配表</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-bell"></i>
          <span v-if="onTask()">任务！</span>
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
    name: 'StaffHome',
    data() {
      return {
        staffId: '',
        restaurant: '',
        name: '',
        newTask: false,
        position: '',
        activeIndex: '1',
        dialogVisible: false
      }
    },
    methods: {
      toFloorPlanBar() {
        this.$router.push('/staffhome/floorplanbar')
      },
      toCookAssign() {
        this.$router.push('/staffhome/cookassign')
      },
      onTask() {
        this.$db.collection('task')
          .where({
            staff_id: this.staffId,
            state: true
          })
          .watch({
            onChange: (snapshot) => {
              console.log(snapshot)
              var mydata = snapshot.docChanges[0]
              if(mydata==null){
                return
              }
              else if(mydata.dataType == 'init' || mydata.dataType == 'add'){
                this.newTask = true
                this.$db.collection('table')
                .where({
                  restaurant: this.restaurant,
                  table_id: mydata.doc.table_id
                })
                .update({
                  on_task: this.staffId
                })
              }
              else{
                this.newTask = false
              }
            },
            onError: () => {
              console.log('watch error!')
            }
          })
        return this.newTask
      },
      toStaffLogin() {
        this.dialogVisible = false
        this.$router.push('/')
        localStorage.clear()
        location.reload()
      }
    },
    mounted() {
      this.staffId = JSON.parse(localStorage.getItem('account'))
      this.position = JSON.parse(localStorage.getItem('position'))
      this.name = JSON.parse(localStorage.getItem('name'))
      this.restaurant = JSON.parse(localStorage.getItem('restaurant'))
    },
  }
</script>

<style scoped>
  .el-container {
    border: 1.5px solid #eee;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 700px;
  }
  .el-aside {
    width: 210px !important;
  }
  .el-button {
    margin-top: 5px;
    margin-left: 40px;
  }
</style>
