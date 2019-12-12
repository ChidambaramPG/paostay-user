<template>
  <div class="col-md-6">
    <div class="edit-profile-head">
      <h3>edit profile</h3>
    </div>
    <div class="edit-profile-details">
      <form action="">
        <div class="edit-name-field">
          <label class="edit-profile">name</label>
          <div class="input-group">
            <input type="text" class="edit-data" placeholder="Add Now" v-model="name"/>
          </div>
        </div>
        <div class="edit-contact-field">
          <label class="edit-profile">mobile number</label>
          <div class="input-group">
            <input
              type="intlTelInput"
              id="telephone"
              class="edit-data"
              placeholder="+91 9400890923"
              v-model="phone"
            />
          </div>
        </div>
        <div class="edit-email-field">
          <label class="edit-profile">email</label>
          <div class="input-group">
            <input type="email" class="edit-data" value="bruce@gmail.com" v-model="email" />
          </div>
        </div>
        <div class="row">
          <button type="submit" class="btn btn-primary update-now" @click="updateUserDetails">
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
  name: "ProfileInfo",
  data(){
    return{
      name:'',
      phone:'',
      email:'',
    }
  },
  created(){
    this.email = firebase.auth().currentUser.email;
    firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).get().then( resp => {
      console.log(resp.data())
      if(resp.data().name != undefined){
        this.name = resp.data().name;
      }
      if(resp.data().phone != undefined){
        this.phone = resp.data().phone;
      }
    });
  },
  methods:{
    updateUserDetails(){
      firebase.firestore().collection("Users").doc(firebase.auth().currentUser.uid).update({
        name:this.name,
        phone:this.phone
      }).then(response => {
        console.log(response)
      })
    }
  }
};
</script>

<style></style>
