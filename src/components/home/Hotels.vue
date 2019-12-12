<template>
  <section class="section hotel" id="hotels">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="hotel-head text-center">
                        <h3>fresh & go</h3>
                        <p>Hotel you can quickly freshen up and get doing</p>
                    </div>
                </div>
                <latest-hotels v-for="(hotel,index) in recentHotels" :hoteldetails="hotel" :key="index" />
                
            </div>
        </div>
    </section>
</template>

<script>
import LatestHotels from './LatestHotels.vue';
export default {
    name:'Hotels',
    components:{
        LatestHotels
    },
    created(){
    // console.log('fetching hotel')
    if(this.recentHotels.length < 1){
      this.$store.dispatch("fetchAllHotels");  
    }else{
      this.$store.dispatch("fetchHotelList");  
    }
      
  },
  computed: {
    recentHotels: function() {
      return this.$store.state.hotelsList.slice(0,4);
    }
  }
}
</script>

<style>

</style>