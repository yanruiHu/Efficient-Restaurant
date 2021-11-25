<template>
  <div>
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-container>
        <el-aside width="150px">
          <el-tabs :tab-position="tabPosition" style="height: 750px;" @tab-click="tabEvent">
            <el-tab-pane label="员工管理"></el-tab-pane>
            <el-tab-pane label="餐厅界面设置" @click="interfaceSettings">
            </el-tab-pane>
            <el-tab-pane label="菜品设置" @click='setupMenu'></el-tab-pane>
            <el-tab-pane label="个人信息" @click='personalInformation'></el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-main>
          <StaffList v-if="choice==='stafflist'" :staffData=staffData :restaurant=restaurant></StaffList>
          <MenuList v-else-if="choice==='menulist'" :restaurant=restaurant></MenuList>
          <ManageInfo v-else-if="choice==='manageinfo'" :restaurant=restaurant></ManageInfo>
          <FloorPlanBar v-else></FloorPlanBar>
        </el-main>
      </el-container>
    </el-container>
    <div>
    </div>
  </div>
</template>

<script>
import StaffList from "./StaffList.vue";
import FloorPlanBar from "../../components/FloorPlanBar.vue";
import MenuList from "./MenuList.vue";
import ManageInfo from "./ManageInfo.vue";

  export default {
    name: 'ManageHome',
    data() {
      return {
        tabPosition: 'left',
        db: null,
        choice: 'stafflist',
        staffData: [
          {
            position: null,
            name:null,
            right:false
          }
        ],
        restaurant: null
      }
    },
    components: {
      StaffList,
      FloorPlanBar,
      MenuList,
      ManageInfo
    },
    async mounted() {
      this.restaurant = JSON.parse(localStorage.getItem("restaurant"))
      this.db = this.$app.database()
      await this.db.collection("staff")
        .where({
          restaurant: this.restaurant
        })
        .get()
        .then((res) =>{
          this.staffData = res.data
        })
    },
    methods: {
      employeeManagement() {
        this.choice='stafflist'
      },
      interfaceSettings() {
        this.choice='floorplanbar'
      },
      setupMenu() {
        this.choice='menulist'
      },
      personalInformation() {
        this.choice='manageinfo'
      },
      tabEvent(tab){
        if(tab.label==="员工管理"){
          this.employeeManagement()
        }
        else if(tab.label==="餐厅界面设置"){
          this.interfaceSettings()
        }
        else if(tab.label==="菜品设置"){
          this.setupMenu()
        }
        else{
          this.personalInformation()
        }
      }
    },
  }
</script>