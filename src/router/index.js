//配置路由
import VueRouter from "vue-router";
import Vue from "vue";

import ManageLogin from "../components/Managelogin.vue";
import WaiterLogin from "../components/Waiterlogin.vue";
import Manageregister from "../components/Manageregister.vue";
import FloorPlanBar from "../components/FloorPlanBar.vue";
import ManageHome from "../views/manage/ManageHome.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: '/managelogin',
    component: ManageLogin
  },
  {
    path: '/waiterlogin',
    component: WaiterLogin
  },
  {
    path: '/manageregister',
    component: Manageregister
  },
  {
    path: '/floorplanbar',
    component: FloorPlanBar
  },
  {
    path: '/managehome',
    component: ManageHome
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router