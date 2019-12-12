<template>
  <div class="col-md-6">
    <div class="edit-profile-head">
      <h3>edit profile</h3>
    </div>
    <div class="edit-profile-details">
      <form action="">
        <div class="edit-name-field">
          <label class="edit-profile">current password</label>
          <div class="input-group">
            <input type="password" class="edit-data" v-model="currentPassword"/>
          </div>
        </div>
        <div class="edit-contact-field">
          <label class="edit-profile">new password</label>
          <div class="input-group">
            <input type="password" id="" class="edit-data" v-model="password"/>
          </div>
        </div>
        <div class="edit-email-field">
          <label class="edit-profile">confirm password</label>
          <div class="input-group">
            <input type="password" class="edit-data" v-model="confirmPassword"/>
          </div>
        </div>
        <div class="row">
          <button type="submit" class="btn btn-primary update-now" @click="updateUserPassword">
            update now
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: "ProfilePassword",
  data(){
    return {
      password:'',
      confirmPassword:'',
      currentPassword:''
    }
  },
  methods: {
    updateUserPassword(){
      if(this.password === this.confirmPassword){
        if(this.currentPassword == ''){
          alert('Need curent password')
        }else{
          let user = firebase.auth().currentUser;
          const credential = firebase.auth.EmailAuthProvider.credential(
              user.email, 
              this.currentPassword
          );

          firebase.auth().currentUser.reauthenticateWithCredential(credential)
          .then( resp => {
            console.log('reauthenticated')
            user.updatePassword(this.password).then(function() {
              alert('password updated')
            }).catch(function(error) {
              alert(error)
            });

          }).catch( error => {
            console.log(error)
          })

        }
      }else{
        alert('Passwords do not match')
      }
    }
  },
};
</script>

<style></style>
