<template>
  <div class="col-md-3">
    <div class="sidebar">
      <a href="#" class="profile-sidebar" @click="()=> setProfileSection('history')">
        <i class="fas fa-history btn-gear bg-color"></i> booking history
      </a><br>
      <a href="#" class="profile-sidebar" @click="()=> setProfileSection('wallet')">
        <i class="fas fa-wallet btn-gear bg-color"></i> pao wallet
      </a><br>
      <a href="#" class="profile-sidebar" @click="()=> setProfileSection('favourite')">
        <i class="fas fa-bookmark btn-gear bg-color"></i> favourites
      </a><br>
      <a href="#" class="profile-sidebar" @click="()=> setProfileSection('info')">
        <i class="fas fa-user-alt btn-gear bg-color"></i> profile info
      </a><br>
      <a href="#" class="profile-sidebar" @click="()=> setProfileSection('password')">
        <i class="fas fa-key btn-gear bg-color"></i> change password
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileSidebar",
  methods: {
      setProfileSection(sec){
          this.$store.commit('setProfileSecton',sec);
      }
  },
};
</script>

<style></style>
