<template>
    <transition v-if="showModal" name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">LOG IN</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1" class="login-fields">Email address</label>
                                        <input type="email" class="form-control modal-inputs" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1" class="login-fields">Password</label>
                                        <input type="password" class="form-control modal-inputs" id="exampleInputPassword1" placeholder="Password" v-model="password">
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1" class="login-fields">Confirm Password</label>
                                        <input type="password" class="form-control modal-inputs" id="exampleInputPassword1" placeholder="Password" v-model="confPass">
                                    </div>
                                    
                                    <button type="button" class="btn btn-primary modal-signin-btn" @click="signupUser">submit</button><br>
                                    <p>Already a registered user? </p><p><a href="" id='signupNowBtn' class="signup">Signin now</a></p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import firebase from "firebase";
import store from "../store.js";

export default {
    name: "NewAmenity",
    data() {
        return {
          email:"",
          password:"",
          confPass:""
        }
    },
    components: {
        // BModal
    },
    computed: {
        showModal() {
            console.log("amaenity component: ", store.state.showSignupModal);
            return store.state.showSignupModal;
        }
    },
    methods: {
        hideModal() {
            store.commit("setSignupModalStatus", false);
        },
        signupUser(){
          if( this.email!="" && this.password!= "" & this.confPass!="" & this.password == this.confPass){
            firebase.auth().createUserWithEmailAndPassword(this.email,this.password).then(res => {
                console.log("created");
                firebase.firestore().collection("Users").add({
                    email:this.email,
                    status:"active",
                    signupDate:new Date(),
                });
                firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(res => {
                    store.commit("setSignupModalStatus", false);
                    store.commit("setLogin",true);
                }).catch( error => {
                    alert(error.message)
                })
            }).catch( error => {
                alert(error.message)
            });
          }else{
              alert("passwords do not match");
          }
          
        }
    }

};
</script>
<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 500px;
    margin: 0px auto;
    /* padding: 20px 30px; */
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>