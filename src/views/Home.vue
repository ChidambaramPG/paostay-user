<template>
  <div class="home">
    <MainNavigation/>
    <section class="bg-slider">
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="../assets/image/slider.png" class="d-block w-100" alt="...">
                </div>
            </div>
        </div>
    </section>
    <section class=" booking-form">
        <div class="container">
            <div class="row">
                <SearchBar/>
            </div>
        </div>
    </section>
    <!-- ............................................................. -->
    <recent-deals/>
    <!-- ............................................................ -->
    <popular-destination/>
    <!-- ...................................................... -->
    <hotels/>
    <!-- ............................................................ -->
    <testimonials/>
    <!-- ............................................. -->
    <blogs/>
    <!-- ............................................. -->
    <Footer/>
  </div>
</template>

<script>

import MainNavigation from "@/components/MainNavigation.vue";
import Footer from "../components/Footer";
import store from "../store.js";
import Datepicker from "vuejs-datepicker";
import SearchBar from "../components/home/SearchBar.vue";
import RecentDeals from '../components/home/RecentDeals.vue';
import PopularDestination from '../components/home/PopularDestination.vue'
import Hotels from '../components/home/Hotels.vue';
import Testimonials from '../components/home/Testimonials.vue';
import Blogs from '../components/home/Blogs.vue';



export default {

    
  name: "home",
  components: {
    MainNavigation,
    Footer,
    Datepicker,
    SearchBar,
    RecentDeals,
    PopularDestination,
    Hotels,
    Testimonials,
    Blogs
  },
  data(){
      return{

          checkinDate:new Date(),
          checkoutDate:new Date(),
          adultCount:1,
          guestCount:0,
          location:"",
          roomCount:1

      }
  },
  methods:{
    showHotelList(){
        if(this.isDatesCorrect && this.location != "" && this.adultCount >= 1){
            let details = {
                checkinDate:this.checkinDate,
                checkoutDate:this.checkoutDate,
                adultCount:this.adultCount,
                location:this.location,
            }
            this.$store.commit("setBookingDetails",details);
            this.$router.replace("hotel-list")
        }else{
            alert("incorect data");
        }
      
    },
    incrAdultCount(){
        
        this.adultCount++;
    },
    decrAdultCount(){
        if(this.adultCount>1){
            this.adultCount--;
        }
        
    }
  },
  computed:{
    isDatesCorrect: function () {
    
      let chkn = new Date(this.checkinDate);
      let chkt = new Date(this.checkoutDate);

      if(chkt <= chkn){
        return false;
      }else{
        return true;
      }
    },
    highlightedDates: function(){
      if(this.isDatesCorrect){
        return {
          to:this.checkoutDate,
          from:this.checkinDate
        }
      }
    }
  },
};
</script>
<style>

.form-control[readonly]{
    background-color: white;
}
#guestCounts{
    background-color: white;
}  
.guest-counts{
    width:400px;
}
.guest-count-dropdown{
    text-align:center;
}
</style>
