<template>
  <div>
    <nav id="main-nav" class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      <div class="container">
        <img class="navbar-brand" src="../assets/image/logo-footer.png" @click="handleBackHome"/>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <!-- <li class="nav-item">
              <a class="nav-link" href="#">
                destinations
                <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">fresh & go</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">hotels</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">trip guide</a>
            </li> -->
          </ul>
          <span class="navbar-text">
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id
                  role="button"
                  data-toggle="dropdown"
                >english</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#">Malayalam</a>
                  <a class="dropdown-item" href="#">Hindi</a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="dropdown-item" href="#" @click="visitProfile">Profile</a>
              </li>
              <li>
                <div class="log-btn" v-if="!loginStatus">
                  <button class="btn btn-primary btn-login" @click="toggleLoginModal">login / register</button>
                </div>
                <div class="log-btn" v-else>
                  <button class="btn btn-primary btn-login" @click="logoutUser">logout</button>
                </div>
              </li>
            </ul>
          </span>
        </div>
      </div>
    </nav>
    <login-modal />
    <signup-modal />
  </div>
</template>

<script>
import LoginModal from "./LoginModal.vue";
import SignupModal from "./SignupModal.vue";
import firebase from "firebase";

export default {
  name: "AlternateNavigation",
  data(){
      return {
          isLoggedIn:this.$store.state.isLoggedIn,
          showLoginModal:false,
          showSignupModal:false
      }
  },
  computed:{
    loginStatus: function(){
        return this.$store.state.isLoggedIn
    }
  },
  methods:{
      toggleLoginModal:function(){
          this.$store.commit("setShowLoginModal",true);
      },
      logoutUser: function(){
          // console.log("logging out");
          firebase.auth().signOut();
        //   this.isLoggedIn = false;
          this.$store.dispatch("setLoginStatus");
          this.$router.push('/')
      },
      visitProfile(){
        this.$router.push('profile')
      },
      handleBackHome(){
        this.$router.push('/')
      }
  },
  components:{
      LoginModal,
      SignupModal
  },
  mounted(){
      this.$store.dispatch("setLoginStatus");
  },
  created(){
    var navBar = null;
    window.onscroll = function (event) {
      
      if (window.scrollY > 300) {
        navBar = document.getElementById('main-nav');
        // // console.log(navBar)
        navBar.classList.add('bg-white');
        navBar.classList.remove('bg-light');
      }else{
        navBar.classList.add('bg-white');
        navBar.classList.remove('bg-light');
      }
    }
  }
  
};

</script>
