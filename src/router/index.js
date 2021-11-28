//配置路由
import VueRouter from "vue-router";
import Vue from "vue";

import Welcome from "../components/Welcome.vue";
import ManageLogin from "../components/Managelogin.vue";
import StaffLogin from "../components/Stafflogin.vue";
import Manageregister from "../components/Manageregister.vue";
import FloorPlanBar from "../components/FloorPlanBar.vue";
import MainPage from "../components/MainPage.vue";
import ManageHome from "../views/manage/ManageHome.vue";
import StaffList from "../views/manage/StaffList.vue";
import MenuList from "../views/manage/MenuList.vue";
import Table from "../components/Table.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Welcome
  },
  {
    path: '/managelogin',
    component: ManageLogin
  },
  {
    path: '/stafflogin',
    component: StaffLogin
  },
  {
    path: '/manageregister',
    component: Manageregister
  },
  {
    path: '/mainpage',
    component: MainPage,
    children: [
      {
        path: '/mainpage/floorplanbar',
        component: FloorPlanBar,
      }
    ]
  },
  {
    path: '/managehome',
    component: ManageHome,
    children: [
      {
        path: '/floorplanbar',
        name: 'floorplanbar',
        component: FloorPlanBar
      },
      {
        path: '/stafflist',
        name: 'StaffList',
        component: StaffList
      }
    ]
  },
  {
    path: '/menulist',
    component: MenuList
  },
  {
    path: '/Table',
    component: Table
  },
]

const router = new VueRouter({
  routes,
  // mode: 'history'
})

export default router
