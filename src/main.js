import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import cloudbase from '@cloudbase/js-sdk'

const app = cloudbase.init({
  env: "fuyou-8g8jpe9008479ad1"
})
const auth = app.auth()
async function db_login(){
  await auth.anonymousAuthProvider().signIn()
  // const loginState = await auth.getLoginState()
  // console.log(loginState.isAnonymousAuth)
}
db_login();

const db = app.database()

Vue.prototype.$app = app
Vue.prototype.$db = db

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  el: '#app',
  router
}).$mount('#app');