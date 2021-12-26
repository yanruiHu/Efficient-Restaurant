<template>
  <el-container class="out-container">
    <el-aside :class="isCollapse?'el-aside-close':'el-aside-open'">
      <el-menu default-active="1" class="el-menu-vertical-demo"
      :collapse="isCollapse">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人信息</span>
          </template>
          <el-menu-item-group title="姓名">
            <el-menu-item index="1-1">
              {{ name }}
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="工号">
            <el-menu-item index="1-2">
              {{ staffAccount }}
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="职位">
            <el-menu-item index="1-3">
              {{ position }}
            </el-menu-item>
          </el-menu-item-group>
          <el-button type="danger" size="small"
          @click="showDialog = true">
            退出登录
          </el-button>
        </el-submenu>
        <el-menu-item index="2" 
        v-if="position!=='chef'" @click="toFloorPlanBar()">
          <i class="el-icon-view"></i>
          <span>餐桌平面图</span>
        </el-menu-item>
        <el-menu-item index="3" 
        v-if="position==='chef'" @click="toCookAssign()">
          <i class="el-icon-tickets"></i>
          <span>出菜分配表</span>
        </el-menu-item>
         <el-menu-item index="4" @click="showTask()">
          <el-badge is-dot :hidden="!onTask()">
            <i class="el-icon-bell"></i>
          </el-badge>
          <span>任务</span>
        </el-menu-item>
      </el-menu>
      <el-dialog title="提示" width="30%"
      :visible.sync="showDialog" :append-to-body="true">
        <span>确定退出登录？</span>
        <template #footer>
          <span class="dialog-footer">
            <el-button
            @click="showDialog = false">
              取 消
            </el-button>
            <el-button type="primary"
            @click="toStaffLogin()">
              确 定
            </el-button>
          </span>
        </template>
      </el-dialog>
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
        isCollapse: false,
        staffAccount: '',
        restaurant: '',
        name: '',
        newTask: false,
        position: '',
        showDialog: false,
        task: {}
      }
    },
    mounted() {
      this.staffAccount = JSON.parse(localStorage.getItem('account'))
      this.position = JSON.parse(localStorage.getItem('position'))
      this.name = JSON.parse(localStorage.getItem('name'))
      this.restaurant = JSON.parse(localStorage.getItem('restaurant'))
      if(document.documentElement.clientWidth < 800){
          this.isCollapse = true
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
            staff_account: this.staffAccount,
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
                this.task = mydata.doc
                this.$db.collection('table')
                .where({
                  restaurant: this.restaurant,
                  table_id: mydata.doc.table_id
                })
                .update({
                  on_task: this.staffAccount
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
        this.showDialog = false
        this.$router.push('/')
        localStorage.clear()
        location.reload()
      },
      showTask() {
        if(this.newTask){
          var msg = '请为' + this.task.table_id + '号桌' + this.task.task
          this.$alert(msg, '任务', {
            confirmButtonText: '确定',
            callback:() => {
              this.$message({
                type: 'info',
                message: msg
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
  .out-container {
    border-top: 1px solid #eee;
    background-color: white;
    opacity: 0.95;
    height: 80%;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 170px;
  }
  .el-aside-open {
    width: 180px !important;
  }
  .el-aside-close {
    width: 70px !important;
  }
  .el-button {
    margin-top: 5px;
    margin-left: 45px;
  }
  .el-main {
    padding: 0;
  }
  .span-task {
    color: #F56C6C;
  }
  .el-badge {
    line-height: 30px;
  }
</style>
