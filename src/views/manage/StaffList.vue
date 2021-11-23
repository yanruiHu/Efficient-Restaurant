<template>
  <div>
    <div>
      <el-table :data="staffData" style="width: 100%">
        <el-table-column prop="position" label="职位" width="180">
        </el-table-column>
        <el-table-column prop="account" label="账号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column prop="right" label="权限">
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-button @click="viewAddBox = true">添加员工</el-button>

      <el-dialog title="请输入员工信息" :visible.sync="viewAddBox" width="50%" :before-close="handleClose">
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
              <el-option label="服务员" value="waiter"></el-option>
              <el-option label="厨师" value="cooker"></el-option>
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
    props: {
      restaurant: String,
      staffData: Array
    },
    data() {
      return {
        db: null,
        viewAddBox: false,
        newAccount: null,
        newName: null,
        newPassword: null,
        newPosition: null,
        newPhone: null,
      }
    },
    mounted() {
      this.db = this.$app.database()
    },
    methods: {
      async addStaff() {
        if(this.newAccount==null){
          this.$message("账号不能为空")
          return
        }
        if(this.newAccount.length<8||this.newAccount.length>12){
          this.$message("账号必须为八到十二位")
          return
        }
        if(this.newPassword.length<8||this.newPassword.length>16){
          this.$message("账号必须为八到十六位")
          return
        }
        if(this.newName==null||this.newPosition==null||this.newPhone==null){
          this.$message("员工基本信息必须填完")
          return
        }
        let isAccountExist = false
        await this.db.collection("staff")
          .where({
            account: this.newAccount
          })
          .get()
          .then((res) => {
            if(res.data.length!==0){
              this.$message("该账号已注册过")
              isAccountExist = true
            }
          })
        if(isAccountExist){
          return
        }
        this.db.collection("staff")
          .add({
            restaurant: "1",
            account: this.newAccount,
            password: this.newPassword,
            phone: this.newPhone,
            name: this.newName,
            position: this.newPosition
          })
          .then(()=>{
            this.$message("创建员工成功！")
            this.viewAddBox = false
          })
          location.reload()
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => { });
      }
    },
  }
</script>

<style>
</style>