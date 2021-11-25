<template>
  <div>
    <el-divider></el-divider>
    <div v-for="(item,index) in menu" :key="index">
      <el-divider></el-divider>
      <el-container>
        <el-aside width="80px">
          <div class="demo-type">
            <div class="block">
              <el-avatar :size="80" :src="item.image"></el-avatar>
            </div>
          </div>
        </el-aside>
        <el-main>
          <el-descriptions>
            <el-descriptions-item label="菜名">{{item.name}}</el-descriptions-item>
            <el-descriptions-item label="单价">{{item.price}}元</el-descriptions-item>
            <el-descriptions-item label="原料">无记录</el-descriptions-item>
            <el-descriptions-item label="热度">无记录</el-descriptions-item>
          </el-descriptions>
        </el-main>
      </el-container>
      <el-divider></el-divider>
    </div>
    <div>
      <el-button @click="viewAddBox = true">添加菜品</el-button>
      <el-dialog title="请输菜品信息" :visible.sync="viewAddBox" width="50%" :before-close="handleClose">
        <el-form>
          <el-form-item label="展示图片">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "MenuList",
    props: {
      restaurant: String
    },
    data() {
      return {
        db: null,
        menu: [],
        viewAddBox: false,
        newName: null,
        imageUrl: null,
        newPrice: null
      }
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      addDish() {
        
        return
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => { });
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
    async mounted() {
      this.db = await this.$app.database()
      await this.db.collection("dish_list")
        .where({
          restaurant: this.restaurant
        })
        .get()
        .then((res) => {
          console.log(res.data)
          this.menu = res.data
        })
    },
  }
</script>