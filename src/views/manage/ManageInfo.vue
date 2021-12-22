<template>
  <div>
    <p>个人信息</p>
    <el-avatar :size="80" :src="head">
    </el-avatar>
    <p></p>
    <p></p>
    <el-descriptions>
      <el-descriptions-item label="账号">{{account}}</el-descriptions-item>
      <el-descriptions-item label="餐馆">{{restaurant}}</el-descriptions-item>
      <el-descriptions-item label="餐馆地址">{{address}}</el-descriptions-item>
    </el-descriptions>
    <el-button size="small" @click="isViewAlterBox = true">信息设置</el-button>
    <el-button size="small" @click="isViewAlpassBox = true">修改密码</el-button>
    <el-button size="small" type="danger" @click="dialogVisible = true">退出登录</el-button>
    <el-dialog :visible.sync="dialogVisible" :append-to-body="true">
      <span>确定退出登录？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toManageLogin">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog :visible.sync="isViewAlterBox" :append-to-body="true">
      <el-form>
        <el-form-item label="修改头像"></el-form-item>
        <a type="button" class="layui-btn layui-btn-primary">
          <input class="" type="file" multiple="multiple" id="alter-head" />
        </a>
        <el-form-item label="餐馆地址">
          <el-input v-model="address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="isViewAlterBox = false">取 消</el-button>
        <el-button type="primary" @click="alterInfo">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="isViewAlpassBox" :append-to-body="true">
      <el-form>
        <el-form-item label="原密码">
          <el-input v-model="oldPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="newPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
          <el-input v-model="confirmPassword" type="password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isViewAlpassBox = false">取 消</el-button>
        <el-button type="primary" @click="alterPassword">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ManageInfo",
    data() {
      return {
        address: null,
        head_id: null,
        dialogVisible: false,
        isViewAlterBox: false,
        isViewAlpassBox: false,
        oldPassword: null,
        newPassword: null,
        confirmPassword: null,
        account: null,
        head: null
      }
    },
    props: {
      restaurant: null,
    },
    methods: {
      async getHead() {
        await this.$db.collection("manage")
          .where({
            account: this.account
          })
          .get()
          .then((res) => {
            this.head_id = res.data[0].head
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
      getAddress() {
        this.$db.collection("restaurant")
          .where({
            name: this.restaurant
          })
          .get()
          .then((response) => {
            this.address = response.data[0].address
          })
      },
      async updatePage() {
        await  this.getHead()
        this.getAddress()
      },
      toManageLogin() {
        this.dialogVisible = false
        this.$router.push('/')
        localStorage.clear()
      },
      async alterInfo() {
        var file = await document.getElementById("alter-head").files[0];
        let fileId = null;
        if (file !== undefined) {
          await this.$app
            .uploadFile({
              cloudPath: file.name,
              filePath: file
            })
            .then((res) => {
              fileId = res.fileID;
            });
          this.$db.collection("manage")
            .where({
              account: this.account
            })
            .update({
              head: fileId
            })
          this.$app
            .deleteFile({
              fileList: [this.head_id]
            })
        }
        this.$db.collection("restaurant")
          .where({
            name: this.restaurant
          })
          .update({
            address: this.address
          })
        this.updatePage()
        this.isViewAlterBox = false
      },
      async alterPassword() {
        let isRigth = false
        await this.$db.collection("manage")
          .where({
            account: this.account,
            password: this.oldPassword
          })
          .get()
          .then((res) => {
            if (res.data.length == 1) {
              isRigth = true
            }
          })
        if (!isRigth) {
          this.$message("输入原密码错误！")
          return
        }
        if (!this.oldPassword < 8 || this.newPassword < 8 || this.confirmPassword < 8) {
          this.$message("密码不小于八位！")
          return
        }
        if (this.newPassword !== this.confirmPassword) {
          this.$message("两次输入密码不相同！")
        }
        this.db.collection("manage")
          .where({
            account: this.account
          })
          .update({
            password: this.newPassword
          })
          .then(() => {
            this.$message("修改密码成功！")
          })
        this.isViewAlpassBox = false
      },
    },
    async mounted() {
      if (localStorage.getItem("account") !== null || localStorage.getItem("account") !== undefined) {
        this.account = JSON.parse(localStorage.getItem("account"))
      }
      this.updatePage()
    },
  }
</script>