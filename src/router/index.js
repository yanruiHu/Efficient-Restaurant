//配置路由
import VueRouter from "vue-router";
import Vue from "vue";

import ManageLogin from "../components/Managelogin.vue";
import WaiterLogin from "../components/Waiterlogin.vue";
import Manageregister from "../components/Manageregister.vue";


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
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router