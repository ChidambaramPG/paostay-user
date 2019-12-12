<template>
  <div>
    <AlternateNavigation />
    <section class="profile-page">
      <div class="container">
        <profile-data />
        <!-- ......................................     -->
        <div class="booking-history">
          <div class="row">
            <profile-sidebar />
            <!-- .......................................... -->
            <profile-history v-if="getProfileSection == 'history'"/>
            <profile-wallet v-if="getProfileSection == 'wallet'"/>
            <profile-favourites v-if="getProfileSection == 'favourite'"/>
            <profile-info v-if="getProfileSection == 'info'"/>
            <profile-password v-if="getProfileSection == 'password'"/>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
import AlternateNavigation from "@/components/AlternateNavigation.vue";
import Footer from "../components/Footer";
import firebase from "firebase";
import router from "../router";
import ProfileSidebar from "../components/profile/ProfileSidebar.vue";
import ProfileData from "../components/profile/ProfileData.vue";
import ProfileHistory from "../components/profile/ProfileHistory.vue";
import ProfileWallet from '../components/profile/ProfileWallet.vue';
import ProfileFavourites from '../components/profile/ProfileFavourites.vue';
import ProfileInfo from '../components/profile/ProfileInfo.vue';
import ProfilePassword from '../components/profile/ProfilePassword.vue';



export default {
  name: "Profile",
  components: {
    ProfileHistory,
    AlternateNavigation,
    Footer,
    ProfileSidebar,
    ProfileData,
    ProfileWallet,
    ProfileFavourites,
    ProfileInfo,
    ProfilePassword

  },
  computed: {
     getProfileSection(){
      return this.$store.state.profileSection;
    }
  },
};
</script>
