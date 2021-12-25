<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ordertext}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <el-button style="border: 0;" @click="orderType='price',ordertext='按售价'">按售价</el-button>
            </el-dropdown-item>
            <el-dropdown-item  @click="orderType='month_sales'">
              <el-button style="border: 0;" @click="orderType='month_sales', ordertext='按月售'">按月售</el-button>
            </el-dropdown-item>
            <el-dropdown-item  @click="orderType='week_sales'">
              <el-button style="border: 0;" @click="orderType='week_sales', ordertext='按周售'">按周售</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{isReverse?"降序":"升序"}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <el-button style="border: 0;" @click="isReverse=false">升序</el-button>
            </el-dropdown-item>
            <el-dropdown-item >
              <el-button style="border: 0;" @click="isReverse=true">降序</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
        <div class="dish-box" v-for="item in menuList" :key="item._id">
          <el-card style="border: 1px;">
            <el-container>
              <el-aside width="80px">
                <div class="demo-type">
                  <div class="block">
                    <el-avatar shape="square" :size="80" :src="item.imageURL" class="avatar">
                    </el-avatar>
                  </div>
                </div>
              </el-aside>
              <el-main>
                <el-descriptions>
                  <el-descriptions-item label="菜名">{{item.name}}</el-descriptions-item>
                  <el-descriptions-item label="单价">{{item.price}}元</el-descriptions-item>
                  <el-descriptions-item label="成本">无记录</el-descriptions-item>
                  <el-descriptions-item label="周销量">{{item.month_sales}}</el-descriptions-item>
                  <el-descriptions-item label="月销量">{{item.week_sales}}</el-descriptions-item>
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
      <el-dialog title="请输菜品信息" :visible.sync="viewAddBox" width="50%" :before-close="handleClose"
        :append-to-body="true">
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
      <el-dialog title="修改菜品信息" :visible.sync="viewAlterBox" width="50%" :before-close="handleCloseAlter"
        :append-to-body="true">
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
    },
    data() {
      return {
        menu: [],
        viewAddBox: false,
        newName: null,
        newPrice: null,
        viewOptButton: false,
        viewAlter: false,
        altdish: [],
        viewAlterBox: false,
        file: null,
        orderType: 'price',
        isReverse: true,
        ordertext: '按售价'
      }
    },
    methods: {
      updateMonthSalesVolume(time, interval) {
        this.$app
          .callFunction({
            name: "getDishOrderStatistics",
            data: {
              restaurant: this.restaurant,
              interval: interval
            }
          })
          .then((res) => {
            if (time === 'month_sales') {
              for (let item in res.result) {
                this.$db.collection("dish_list")
                  .where({
                    _id: res.result[item].dish_id
                  })
                  .update({
                    month_sales: res.result[item].num
                  })
              }
            }
            else{
              for (let item in res.result) {
                this.$db.collection("dish_list")
                  .where({
                    _id: res.result[item].dish_id
                  })
                  .update({
                    week_sales: res.result[item].num
                  })
              }
            }
          })
          .catch(console.error)
      },
      async getMenu() {
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
              this.$set(this.menu[item], "imageURL", res.fileList[0].tempFileURL)
            });
        }
        var date = new Date()
        this.updateMonthSalesVolume('month_sales', (date.getDate() * 24 + date.getHours()))
        this.updateMonthSalesVolume('week_sales', ((date.getDay() + 7) % 7 * 24 + date.getHours()))
      },
      delAll() {
        var f = document.getElementById("files");
        console.log(f.files[0]);
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
            this.getMenu()
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
        this.getMenu()
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
        this.getMenu()
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
    computed: {
      menuList:function(){
        var list = this.menu
        if(this.orderType==='price'){
          list = list.sort((a,b)=>{
            return this.isReverse?b.price-a.price:a.price-b.price
          })
        }
        else if(this.orderType==='month_sales'){
          list = list.sort((a,b)=>{
            return this.isReverse?b.month_sales-a.month_sales:a.month_sales-b.month_sales
          })
        }
        else{
          list = list.sort((a,b)=>{
            return this.isReverse?b.week_sales-a.week_sales:a.week_sales-b.week_sales
          })
        }
        return list
      }
    },
    mounted() {
      this.getMenu()
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