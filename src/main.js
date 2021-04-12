import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import { projectAuth } from './firebase/config'
import vuetify from '@/plugins/vuetify' 
import UUID from 'vue-uuid'  
  
Vue.use(UUID);  

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;


let app;

projectAuth.onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
  // console.log("user", user.displayName);
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});

