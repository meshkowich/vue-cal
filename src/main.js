import Vue from 'vue'
import App from './App.vue'
import VueGAPI from 'vue-gapi'

Vue.config.productionTip = false

// create the 'options' object
const apiConfig = {
  apiKey: "AIzaSyCwR3t3vIKgG1zHTJpZO_06wTgbcMaiPVg",
  clientId: "279436015340-7jed874to2b8obumcf75e66gbvpbsoa6.apps.googleusercontent.com",
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
  scope: "https://www.googleapis.com/auth/calendar.readonly"
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
};

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig);

new Vue({
  render: h => h(App),
}).$mount('#app')
