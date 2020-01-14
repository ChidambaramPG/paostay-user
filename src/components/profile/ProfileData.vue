<template>
  <div class="profile-data">
          <div class="row">
            <div class="col-md-8">
              <div class="guest-name">
                <!-- <h4>{{user.displayName}}</h4>
                <span class="mobile-no">9400345678</span> -->
                <!-- <i class="fas fa-circle btn-circle"></i> -->
                <span class="guest-email">{{user.email}}</span>
              </div>
            </div>
            <div class="col-md-4">
              <div class="profile-btn">
                <!-- <button type="submit" class="btn btn-primary profile float-right">edit profile</button> -->
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import firebase from 'firebase';
export default {
    name:'ProfileData',
    data(){
        return {
            user:[],
            name:''
        }
    },
    created(){
        this.user = firebase.auth().currentUser;
        // this.name = firebase.firestore().collection("Users").doc(this.user.uid);
    },
    computed:{
        getUser(){
            return this.$store.state.user;
        }
    }
}
</script>

<style>

</style>