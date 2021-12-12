<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <el-button v-if="viewOptButton===false">修改</el-button>
          <el-button v-if="viewOptButton===true" @click="viewOptButton=false, viewAlter=false">退出修改</el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button style="border: 0;" @click="viewAddBox = true">添加菜品</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button style="border: 0;" @click="viewAlter=true,viewOptButton=true">修改/删除菜品</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main v-if="menu.length>0">
        <div class="dish-box" v-for="(item,index) in menu" :key="index">
          <el-card style="border: 1px;">
            <el-container>
              <el-aside width="80px">
                <div class="demo-type">
                  <div class="block">
                    <el-avatar shape="square" :size="80" :src="imageList[index]" class="avatar">
                    </el-avatar>
                  </div>
                </div>
              </el-aside>
              <el-main>
                <el-descriptions>
                  <el-descriptions-item label="菜名">{{item.name}}</el-descriptions-item>
                  <el-descriptions-item label="单价">{{item.price}}元</el-descriptions-item>
                  <el-descriptions-item label="原料">无记录</el-descriptions-item>
                  <el-descriptions-item label="热度">无记录{{index}}</el-descriptions-item>
                </el-descriptions>
              </el-main>
              <el-aside v-if="viewAlter===true">
                <el-button @click="viewAlterDish(item)">修改</el-button>
                <el-button @click="delDish(item)">删除</el-button>
              </el-aside>
            </el-container>
          </el-card>
        </div>
      </el-main>
    </el-container>

    <div>
      <el-dialog title="请输菜品信息" :visible.sync="viewAddBox" width="50%" :before-close="handleClose">
        <el-form>
          <a type="button" class="layui-btn layui-btn-primary">
            <input class="" type="file" multiple="multiple" id="up-img" />
          </a>
          <el-form-item label="菜名">
            <el-input v-model="newName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="newPrice" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="viewAddBox = false">取 消</el-button>
          <el-button type="primary" @click="addDish">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="修改菜品信息" :visible.sync="viewAlterBox" width="50%" :before-close="handleCloseAlter">
        <el-form>
          <el-form-item label="图片"></el-form-item>
          <a type="button" class="layui-btn layui-btn-primary">
            <input class="" type="file" multiple="multiple" id="alter-img" />
          </a>
          <el-form-item label="菜名">
            <el-input v-model="altdish.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="altdish.price" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="viewAlterBox = false">取 消</el-button>
          <el-button type="primary" @click="alterDish">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MenuList",
    props: {
      restaurant: String,
      menu: Array,
      imageArray: Array
    },
    data() {
      return {
        viewAddBox: false,
        newName: null,
        imageUrl: null,
        newPrice: null,
        viewOptButton: false,
        viewAlter: false,
        altdish: [],
        viewAlterBox: false,
        imageList: [],
        file: null,
      }
    },
    methods: {
      delAll() {
        var f = document.getElementById("files");
        console.log(f.files[0]);
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      async addDish() {
        var file = document.getElementById("up-img").files[0];
        let fileId = null;
        await this.$app
          .uploadFile({
            // 云存储的路径
            cloudPath: file.name,
            // 需要上传的文件，File 类型
            filePath: file
          })
          .then((res) => {
            // 返回文件 ID
            console.log(res.fileID);
            fileId = res.fileID;
          });
        this.$db.collection("dish_list")
          .add({
            name: this.newName,
            price: this.newPrice,
            restaurant: this.restaurant,
            image: fileId
          })
          .then(() => {
            this.$message("添加菜品成功!")
            this.viewAddBox = false
            location.reload(true)
          })
      },
      async delDish(dish) {
        await this.$confirm('此操作将永久删除' + dish.name + ',是否继续?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$app
            .deleteFile({
              fileList: [dish.image]
            })
          this.$db.collection("dish_list")
            .where({
              _id: dish._id
            })
            .remove()
            .then(() => {
              this.$message({
                type: 'success',
                message: "删除成功!"
              })
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        location.reload()
      },
      viewAlterDish(dish) {
        this.altdish = dish
        this.viewAlterBox = true
      },
      async alterDish() {
        this.$app
          .deleteFile({
            fileList: [this.altdish.image]
          })
        var file = document.getElementById("alter-img").files[0];
        let fileId = null;
        await this.$app
          .uploadFile({
            cloudPath: file.name,
            filePath: file
          })
          .then((res) => {
            console.log(res.fileID);
            fileId = res.fileID;
          });
        this.$db.collection("dish_list")
          .where({
            _id: this.altdish._id
          })
          .update({
            name: this.altdish.name,
            price: this.altdish.price,
            image: fileId,
          })
        this.viewAlterBox = false
        location.reload()
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => { });
      },
      handleCloseAlter(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => { });
      },
    },
    mounted() {
      this.imageList = this.imageArray
    },
  }
</script>

<style scoped>
  .dish-box {
    margin: 0
  }
  .upload {
    padding: 4px 10px;
    height: 20px;
    position: relative;
  }
  .change {
    position: absolute;
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
  }
</style>
