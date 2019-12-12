<template>
  <div class="col-md-8">
    <div class="search-results">
      <div class="row">
        <HotelCard
          v-for="(hotel, index) in hotelListFetched"
          :key="index"
          :hoteldata="hotel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HotelCard from "./HotelCard.vue";
export default {
  name: "AllHotels",
  components: {
    HotelCard
  },
  data(){
    return{
      hotels:[]
    }
  },
  created(){
    console.log('fetching hotel')
    if(this.hotelListFetched.length < 1){
      this.$store.dispatch("fetchAllHotels");  
    }else{
      this.$store.dispatch("fetchHotelList");  
    }
      
  },
  computed: {
    hotelListFetched: function() {
      return this.$store.state.filteredHotelList;
    }
  }
};
</script>

<style></style>
