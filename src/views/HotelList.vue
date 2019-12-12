<template>
  <div>
    <AlternateNavigation />
    <!-- ....................................... -->
    <!-- search bar -->
    <search-bar />

    <!-- ....................................... -->
    <!-- top-head-section  -->
    <list-details/>
    <!-- .................................................... -->
    <!-- filter-data -->
    <search-filters />
    <!-- ...................................... -->
    <Footer />
  </div>
</template>

<script>

import AlternateNavigation from "../components/AlternateNavigation.vue";
import Footer from "../components/Footer.vue";
// import HotelCard from "../components/HotelCard.vue";
import SearchBar from '../components/hotellist/SearchBar.vue';
import ListDetails from '../components/hotellist/ListDetails.vue';
import SearchFilters from '../components/hotellist/SearchFilters.vue';

import firebase from "firebase";

export default {
  name: "HotelList",
  components: {
    AlternateNavigation,
    // HotelCard,
    Footer,
    SearchBar,
    ListDetails,
    SearchFilters
  },
  data() {
    return {
      hotels: [],
      checkinDate: new Date(),
      checkoutDate: new Date(),
      roomCount: 0,
      adultCount: 0,
      dateDff: 0
    };
  },
  created() {
    // console.log("mounted");
    // if(this.hotels.length < 1){
    //   this.$store.dispatch("fetchHotelList");
    // }
    
  },
  computed: {
    bookingDetails: function() {

      let inDate = this.$store.state.checkinDate;
      this.checkinDate = new Date(inDate);
      let outDate = this.$store.state.checkoutDate;
      this.checkoutDate = new Date(outDate);
      let timeDiff = outDate.getTime() - inDate.getTime();
      let DaysDiff = timeDiff / (1000 * 3600 * 24);
      this.dateDff = Math.floor(DaysDiff);
      let aCount = this.$store.state.adultCount;
      this.adultCount = aCount;
      let rCount = this.$store.state.roomCount;
      this.roomCount = rCount;

      return true;
    },
    checkinFormatedDate() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return (
        this.checkinDate.getDate() +
        " " +
        monthNames[this.checkinDate.getMonth()] +
        " " +
        this.checkinDate.getFullYear()
      );
    },
    checkoutFormatedDate() {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      return (
        this.checkoutDate.getDate() +
        " " +
        monthNames[this.checkoutDate.getMonth()] +
        " " +
        this.checkoutDate.getFullYear()
      );
    },
    hotelListFetched: function(){
      return this.$store.state.hotelsList;
    }
  },
  methods: {
   
    dateDifference(dt1, dt2) {
      // console.log(dt1);
      let d1 = new Date(dt1.seconds * 1000);
      let d2 = new Date(dt2.seconds * 1000);
      let timeDiff = d2.getTime() - d1.getTime();
      let DaysDiff = timeDiff / (1000 * 3600 * 24);
      this.dateDff = DaysDiff;

      return DaysDiff;
    }
  }
};
</script>
