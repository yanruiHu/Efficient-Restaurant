//配置路由
import VueRouter from "vue-router";
import Vue from "vue";

import Managelogin from "../components/Managelogin";
import Waiterlogin from "../components/Waiterlogin";


Vue.use(VueRouter)

const routes=[
  {
    path: '/managelogin',
    views: Managelogin
  },
  {
    path: '/waiterlogin',
    views: Waiterlogin
  }
]

const router=new VueRouter({
  routes
})

export default router