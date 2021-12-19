<template>
  <div>
    <el-container style="height: 200%; border: 1px solid #eee">
      <el-container>
        <el-aside width="150px">
          <el-tabs :tab-position="tabPosition" style="height: 600px;" @tab-click="tabEvent">
            <el-tab-pane label="员工管理"></el-tab-pane>
            <el-tab-pane label="餐厅界面设置" @click="interfaceSettings">
            </el-tab-pane>
            <el-tab-pane label="菜品设置" @click='setupMenu'></el-tab-pane>
            <el-tab-pane label="个人信息" @click='personalInformation'></el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-main>
          <StaffList v-if="choice==='stafflist'" :staffData=staffData :restaurant=restaurant></StaffList>
          <MenuList v-else-if="choice==='menulist'" :restaurant=restaurant :menu=menu :imageArray=imageArray></MenuList>
          <ManageInfo v-else-if="choice==='manageinfo'" :restaurant=restaurant :head=head></ManageInfo>
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
        account: null,
        choice: 'stafflist',
        head_id: null,
        staffData: [
          {
            position: null,
            name: null,
            right: false
          }
        ],
        restaurant: null,
        menu: [],
        imageArray: [],
        head: null,
      }
    },
    components: {
      StaffList,
      FloorPlanBar,
      MenuList,
      ManageInfo
    },
    async mounted() {
      this.restaurant = await JSON.parse(localStorage.getItem("restaurant"))
      this.account = await JSON.parse(localStorage.getItem("account"))
      await this.$db.collection("manage")
        .where({
          account: this.account
        })
        .get()
        .then((res) => {
          this.head_id = res.data[0].head
        })
      // this.db = this.$app.database()
      await this.$db.collection("staff")
        .where({
          restaurant: this.restaurant
        })
        .get()
        .then((res) => {
          this.staffData = res.data
        })
      await this.$db.collection("restaurant")
        .where({
          name: this.restaurant
        })
        .get()
        .then((response) => {
          localStorage.setItem('address', JSON.stringify(response.data[0].address))
        })
      if (this.head_id !== undefined) {
        await this.$app
          .getTempFileURL({
            fileList: [this.head_id]
          })
          .then((response) => {
            this.head = response.fileList[0].tempFileURL
          });
      }
    },
    methods: {
      employeeManagement() {
        this.choice = 'stafflist'
      },
      interfaceSettings() {
        this.choice = 'floorplanbar'
      },
      async setupMenu() {
        await this.$db.collection("dish_list")
          .where({
            restaurant: this.restaurant
          })
          .get()
          .then((res) => {
            this.menu = res.data
          })
        for (let item = 0; item < this.menu.length; item++) {
          if (this.menu[item].image === undefined) {
            continue
          }
          this.$app
            .getTempFileURL({
              fileList: [this.menu[item].image]
            })
            .then((res) => {
              this.imageArray[item] = res.fileList[0].tempFileURL
            });
        }
        this.choice = 'menulist'
      },
      personalInformation() {
        this.choice = 'manageinfo'
      },
      tabEvent(tab) {
        if (tab.label === "员工管理") {
          this.employeeManagement()
        }
        else if (tab.label === "餐厅界面设置") {
          this.interfaceSettings()
        }
        else if (tab.label === "菜品设置") {
          this.setupMenu()
        }
        else {
          this.personalInformation()
        }
      }
    },
  }
</script>
