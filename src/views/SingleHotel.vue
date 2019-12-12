<template>
  <div>
    <AlternateNavigation/>
    <section class="hotel-booking-details">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="hotel-assets">
              <div class="row">
                <div class="col-md-10 no-padding">
                  <Gallery/>
                </div>
              </div>
            </div>
            <div class="hotel-name">
              <div class="row">
                <div class="col-md-6">
                  <h2>{{hotelDetails.general.name}}</h2>
                  <i class="fas fa-map-marker-alt location-btn"></i>
                  <span class="location">{{hotelDetails.location.city+", "+hotelDetails.location.district+", "+hotelDetails.location.state}}</span>
                </div>
                <div class="col-md-6">
                  <div class="votes pull-right">
                    <span class="star-rates">4.2</span>
                    <span class="vote">+6k votes</span>
                    <div class="rating">
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                      <span class="fa fa-star checked"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="amenities">
              <h5>Amenities</h5>
              <div class="row">
                <div class="col-md-2" v-for="(amenity,index) in amenitiesAvailable" :key="index">
                  <span class="badge badge-pill badge-primary">{{amenity}}</span>
                </div>
              </div>
            </div>
            <div class="location-details">
              <div class="row">
                <div class="col-md-8 map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62877.95274226215!2d76.26550756168393!3d9.944602704366703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0872fe2d56e867%3A0xd1920a60a7435a58!2sLe+M%C3%A9ridien+Kochi!5e0!3m2!1sen!2sin!4v1562473561774!5m2!1sen!2sin"
                    width="100%"
                    height="250"
                    frameborder="0"
                    style="border:0"
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="col-md-4">
                  <div class="rules">
                    <h5>Hotel Rules</h5>
                    <ul class="dot-list">
                      <li v-for="(rule,indx) in hotelDetails.policy" :key="indx">{{rule.description}}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="recommended-hotels">
              <h3>Other recommended hotels</h3>
              <div class="row">
                <HotelCard v-for="(hotel,index) in hotelListFetched" :key="index" :hoteldata="hotel" />
              </div>
            </div>
          </div>
          
          <BookingDetails/>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
</template>

<script>
import AlternateNavigation from "../components/AlternateNavigation.vue";
import Footer from "../components/Footer.vue";
import BookingDetails from "../components/hoteldetails/BookingDetails.vue";
import HotelCard from "../components/hotellist/HotelCard.vue";
import Gallery from "../components/hoteldetails/Gallery.vue";

export default {
  name: "SingleHotel",
  data() {
    return {
      hotelDetails: []
    };
  },
  components:{
      AlternateNavigation,
      Footer,
      BookingDetails,
      HotelCard,
      Gallery
  },
  props: ["hoteldata"],
  created() {
    this.hotelDetails = this.$store.state.selectedHotel;
  },
  computed: {
    hotelListFetched: function(){
      return this.$store.state.hotelsList;
    },
    amenitiesAvailable: function(){
      let hotel = this.$store.state.selectedHotel;
      let hotelAmn = []
      // console.log("amenities",hotel)

      Object.keys(hotel.amenities).forEach( (item) => {
        // console.log(item)
        if(hotel.amenities[item].status){
          // console.log("item present: ",item)
          hotelAmn.push(item)
        }
      })
      return hotelAmn;
    }
  },
};
</script>
<style>
.amenities{
  padding: 20px 20px 20px 20px;
}
.amenities h5{
  padding: 0px;
}
  
</style>
