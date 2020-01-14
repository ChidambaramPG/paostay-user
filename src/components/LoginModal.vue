<template>
    <transition v-if="showModal" name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">LOG IN</h4>
                                <button @click="closeModal" type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1" class="login-fields">Email address</label>
                                        <input type="email" v-model="email" class="form-control modal-inputs" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1" class="login-fields">Password</label>
                                        <input type="password" v-model="password" class="form-control modal-inputs" id="exampleInputPassword1" placeholder="Password" />
                                    </div>
                                    <div class="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1" />
                                        <label class="custom-control-label" for="customCheck1">Remember password</label>
                                    </div>
                                    <button type="button" class="btn btn-primary modal-signin-btn" @click="signInMethod">submit</button>
                                    <p>
                                        Not a registered user?
                                        <a href class="signup" @click.prevent="showSignupModal">Signup now</a>
                                    </p>
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
import router from "../router.js";

export default {
    name: "LoginModal",
    data() {
        return {
            isLoggedIn: false,
            email: "",
            password: "",
            modal: this.$store.state.showLoginModal
        };
    },
    computed: {
        showModal: function() {
            // console.log(this.$store.state.showLoginModal);
            return this.$store.state.showLoginModal;
        },


    },
    methods: {
        closeModal: function() {
            this.$store.commit("setShowLoginModal", false);
        },
        signInMethod: function() {
            //   // console.log(router);

            if (this.email && this.password) {
                if (this.validEmail(this.email)) {

                    firebase.firestore().collection("Users").where("email","==",this.email).get().then( res => {
                        if(!res.empty){
                            firebase
                            .auth()
                            .signInWithEmailAndPassword(this.email, this.password)
                            .then(user => {
                                // console.log(user);
                                this.$store.commit("setLoginModalStatus", false);
                                this.$store.commit("setLogin", true);
                            });
                        }else{
                            this.$toast.error("You are not authorised lo login to this application");
                        }
                    })
                    
                    
                }
            } else {
                this.errors.push("items missing");
            }
        },
        validEmail: function(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        showSignupModal() {
            this.$store.commit("setLoginModalStatus", false);
            this.$store.commit("setSignupModalStatus", true);
        }
    },
    created(){
        
    }
};
</script>