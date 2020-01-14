import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import * as VueGoogleMaps from "vue2-google-maps";
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

Vue.use(VueToast);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBbVHboFLbmZ52WcLxx4Y_0E4jIyTFmEFs",
    libraries: "places" // necessary for places input
  }
});

// Vue.config.productionTip = false;
let app ="";
var firebaseConfig = {
  apiKey: "AIzaSyD3UWA40FepiY2xzadKKFrUp09ndcUcm-M",
  authDomain: "paostay-test-backend.firebaseapp.com",
  databaseURL: "https://paostay-test-backend.firebaseio.com",
  projectId: "paostay-test-backend",
  storageBucket: "paostay-test-backend.appspot.com",
  messagingSenderId: "997785228088",
  appId: "1:997785228088:web:fdb9150dc67db8b4aba7cd"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((st) => {
  // console.log(st);
  // console.log("auth state changed");
  if (!app) {
    // console.log('initializing vue');
    Vue.config.productionTip = false;
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
