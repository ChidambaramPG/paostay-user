<template>
  <div class="cta">
        <div class="row">
            <div class="col-md-9">
                <div class="cta-text">
                    <h4>Earn ₹500</h4>
                    <p>Create an account to earn ₹500 as PaoMoney</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="login-btn login">
                    <button type="submit" class="btn btn-white" @click="toggleLoginModal">login now</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
name:'CTA',
methods: {
     toggleLoginModal:function(){
          // console.log("toggle modal")
          this.$store.commit("setLoginModalStatus",true);
          // console.log(this.$store.state.showLoginModal)
        //   // console.log("modal stat: ",this.showLoginModal)
      },
},
}
</script>

<style>

</style>