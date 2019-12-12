import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import HotelList from "./views/HotelList.vue";
import SingleHotel from './views/SingleHotel.vue';
import SignIn from "./views/SignIn.vue";
import BookingConfirm from "./views/BookingConfirm.vue";
import Profile from "./views/Profile.vue";
import firebase from 'firebase';


Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/hotel-list",
      name: "Hotel-list",
      component: HotelList,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/hotel-details",
      name: "Hotel-details",
      component: SingleHotel,
      meta: {
        requiresAuth: false
      }
    },  
    {
      path: "/booking-confirm",
      name: "BookingConfirm",
      component: BookingConfirm,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: false
      }
    },
    
  ]
});
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  console.log("<----------- BEFORE EACH ----------->");
  console.log("current user: ", currentUser);
  console.log("requires auth : ", requiresAuth);

  if (requiresAuth && !currentUser) next("signin");
  // else if (!requiresAuth && currentUser ) next("dashboard");
  // else if (!requiresAuth && !currentUser ) next(from);
  else next();
});

export default router;
