<template>
  <div>
    <div>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <el-button v-if="viewDelButton==false">修改</el-button>
            <el-button v-if="viewDelButton==true" @click="viewDelButton=false">完成修改</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button style="border: 0;" @click="viewAddBox = true">添加员工</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button style="border: 0;" @click="viewDelButton = true">删除员工</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <el-table :data="staffData" style="width: 100%">
            <el-table-column prop="position" label="职位" width="150">
            </el-table-column>
            <el-table-column prop="account" label="账号" width="150">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="150">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="120" v-if="viewDelButton == true">
              <template slot-scope="scope">
                <el-button @click.native.prevent="deleteStaff(scope.$index, staffData)" icon="el-icon-delete"
                  type="danger" size="mini">
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </div>

    <div>

      <el-dialog title="请输入员工信息" :visible.sync="viewAddBox" width="50%" :before-close="handleClose" :append-to-body="true">
        <el-form>
          <el-form-item label="员工账号">
            <el-input v-model="newAccount" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工密码">
            <el-input v-model="newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="newName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工电话">
            <el-input v-model="newPhone" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="员工职位">
            <el-select v-model="newPosition" placeholder="请选择员工职位">
              <el-option label="前台" value="host"></el-option>
              <el-option label="服务员" value="waiter"></el-option>
              <el-option label="主厨" value="chef"></el-option>
              <el-option label="厨师" value="cook"></el-option>
              <el-option label="清洁工" value="busboy"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="viewAddBox = false">取 消</el-button>
          <el-button type="primary" @click="addStaff">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'StaffList',
    data() {
      return {
        restaurant: null,
        staffData: [],
        viewAddBox: false,
        viewDelButton: false,
        newAccount: null,
        newName: null,
        newPassword: null,
        newPosition: null,
        newPhone: null,
      }
    },
    async mounted() {
      this.restaurant = await JSON.parse(localStorage.getItem("restaurant"))
      await this.getStaffData()
    },
    methods: {
      getStaffData() {
        this.$db.collection("staff")
        .where({
          restaurant: this.restaurant
        })
        .get()
        .then((res) => {
          this.staffData = res.data
        })
      },
      async addStaff() {
        if (this.newAccount == null) {
          this.$message("账号不能为空")
          return
        }
        if (this.newAccount.length < 8 || this.newAccount.length > 12) {
          this.$message("账号必须为八到十二位")
          return
        }
        if(this.newPassword.length<8||this.newPassword.length>16){
          this.$message("密码必须为八到十六位")
          return
        }
        if (this.newName == null || this.newPosition == null || this.newPhone == null) {
          this.$message("员工基本信息必须填完")
          return
        }
        let isAccountExist = false
        await this.$db.collection("staff")
          .where({
            account: this.newAccount
          })
          .get()
          .then((res) => {
            if (res.data.length != 0) {
              this.$message("该账号已注册过")
              isAccountExist = true
            }
          })
        if (isAccountExist) {
          return
        }
        this.$db.collection("staff")
          .add({
            restaurant: this.restaurant,
            account: this.newAccount,
            password: this.newPassword,
            phone: this.newPhone,
            name: this.newName,
            position: this.newPosition
          })
          .then(()=>{
            this.$message.success("创建员工成功！")
            this.viewAddBox = false
          })
        this.getStaffData()
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => { });
      },
      async deleteStaff(index, data) {
        await this.$confirm('此操作将永久删除' + data[index].name + '用户，是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$db.collection("staff")
            .where({
              account: data[index].account
            })
            .remove()
            .then(() => {
              this.$message({
                type:'success',
                message:"删除成功！"
              })
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        this.getStaffData()
      }
    },
  }
</script>

<style>
</style>
