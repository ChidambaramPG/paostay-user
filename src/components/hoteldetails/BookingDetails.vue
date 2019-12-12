  <template>
  <div class="col-md-4">
    <div class="booking">
      <form action class="form1">
        <div class="row">
          <div class="col-md-4">
            <div class="form-field1">
              <label class for="checkin">check in</label>
              <div class="input-group mb-2 mr-sm-2">
                <!-- <input type="text" class="form-control1" id="checkin" placeholder="17 June 2019" /> -->
                <datepicker :value="checkinDate" v-model="checkinDate" input-class="form-control" :highlighted="highlightedDates"></datepicker>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-field1">
              <label class for="checkout">check out</label>
              <div class="input-group mb-2 mr-sm-2">
                <!-- <input type="text" class="form-control1" id="checkout" placeholder="17 June 2019" /> -->
                <datepicker :value="checkoutDate" v-model="checkoutDate" input-class="form-control" :highlighted="highlightedDates"></datepicker>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-field1">
              <label class for>rooms</label>
              <div class="input-group mb-2 mr-sm-2">
                <input type="number" class="form-control" v-model="roomCount"/>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div class="input-box">
        <div class="booking-details">
          <i class="fas fa-user-plus btn-user"></i>
          <span class="booking-summary_room">{{adultCount}} guest,{{roomCount}} {{ selectedRoomDetails.roomName }}</span>
          <span class="total">₹{{ selectedRoomDetails.price * roomCount }} total</span>
          <a href="#" class="pull-right">
            <i class="fa fa-gear pull-right btn-gear"></i>
          </a>
        </div>
        <div class="booking-details">
          <img src="../../assets/image/restaurant1.png" class="img-food" />
          <span class="breakfast-banner-text">add breakfast for ₹50</span>
          <span class="rooms">{{roomCount}} room and {{adultCount}} guest</span>
          <div class="custom-control custom-checkbox pull-right hotel-page">
            <input type="checkbox" class="custom-control-input" id="is-checked" checked />
            <label class="custom-control-label checkbox-discount" for="is-checked"></label>
          </div>
        </div>
        <!-- <div class="booking-details result">
          <p>price for:{{adultCount}} guest, {{roomCount}} {{ selectedRoomDetails.roomName }}, {{totalNights}} night</p>
          <span class="rate">₹{{ selectedRoomDetails.price * totalNights }}</span>
          <span class="overline">₹{{ (selectedRoomDetails.price * totalNights) * (discount/100)}}</span>
          <span class="offer" v-if="discount != null">{{discount}}% off</span>
          <br />
          <span class="tax">(Inclusive of all taxes)</span>
        </div> -->
        <div class="log-btn">
          <button class="btn btn-primary btn-continue" @click="bookRoomsNow">
            continue to book
            <i class="fas fa-long-arrow-alt-right continue-btn"></i>
          </button>
        </div>
      </div>
      <div class="notes">
        <h5>keep in mind</h5>
        <ul class="keep-notes">
          <li>Free Cancellation till {{ calculateCancelDay() }}, 12:00 PM</li>
          <li>Couples are welcome</li>
          <li>
            Guests can check in using any local or
            <br />outstation ID proof(PAN card not accepted).
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store.js";
import Datepicker from "vuejs-datepicker";
import router from "../../router.js";
import firebase from "firebase";

export default {
  name: "BookingDetails",
  data() {

    return {

      adultCount: 1,
      childCount:0,
      checkinDate:'',
      checkoutDate:'',
      date: new Date(),
      hotelDetails:[],
      roomCount:1,
      discount:10,
      roomTypes:[],
      // selectedRoomPrice:0

    };

  },
  components:{
      Datepicker
  },
  computed:{
    isDatesCorrect: function () {

      this.checkinDate = store.state.checkinDate;
      this.checkoutDate = store.state.checkoutDate;

      
      let chkn = new Date(store.state.checkinDate);
      let chkt = new Date(store.state.checkoutDate);

      if(chkt < chkn){
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
    },
    totalNights(){

      if(store.state.checkinDate != '' || store.state.checkoutDate != ''){
        let chkn = new Date(store.state.checkinDate);
        let chkt = new Date(store.state.checkoutDate);

        let diffTime = chkt - chkn;
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        // console.log("nights: ",days)
        return days;
      }else if(this.checkinDate == '' || this.checkoutDate == ''){
        return 1;
      }else{
        let chkn = new Date(this.checkinDate);
        let chkt = new Date(this.checkoutDate);

        let diffTime = chkt - chkn;
        let days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        // console.log("nights: ",days)
        return days;        
      }
      
    },
    selectedRoomId(){
      return store.state.selectedRoomType
    },
    selectedRoomDetails(){
      if(store.state.selectedRoomDetails == []){
        store.dispatch('fetchHotelRoomTypesOnEmptySelect');
      }
      return store.state.selectedRoomDetails;
    },
    bookingDetails1: function(){

      let inDate = this.$store.state.checkinDate;
      this.checkinDate = new Date(inDate);
      let outDate = this.$store.state.checkoutDate;
      this.checkoutDate = new Date(outDate);
      let aCount = this.$store.state.adultCount;
      this.adultCount = aCount;
      let rCount = this.$store.state.roomCount;
      this.roomCount = rCount;
      return true;
    },
    
  },
  created() {
    this.hotelDetails = store.state.selectedHotel;
    store.dispatch("fetchHotelRoomTypes")
  },
  methods: {
    showSingleHotelDetails: (event, id) => {
      event.preventDefault();
      // console.log(id);
      store.commit("setSelectedHotel", id);
      router.push("hotel-details");
    },
    bookRoomsNow: function(){
      if(this.checkinDate == '' || this.checkoutDate == ''){
        alert("checkin date and checkout dates are required")
      }else{
        store.commit('setBookingDetails',{checkinDate:this.checkinDate,checkoutDate:this.checkoutDate,roomCount:this.roomCount})
        router.replace("booking-confirm")
      }
      
    },
    calculateCancelDay: function(){
      if(this.$store.state.checkinDate != '' || this.$store.state.checkinDate != ''){
        let dt = new Date(this.$store.state.checkinDate);
        dt.setDate(dt.getDate() - parseInt(this.hotelDetails.general.cancelDays))
        let months= ["Jan" ,"Feb", "Mar" ,"Apr" ,"May" ,"Jun" ,"Jul" ,"Aug" ,"Sep" ,"Oct" ,"Nov" ,"Dec" ]

        return dt.getDate() + " " + months[dt.getMonth()+1]+ " " + dt.getFullYear();
      }else if(this.checkoutDate == '' || this.checkinDate == ''){
        let dt = new Date();
        dt.setDate(dt.getDate() - parseInt(this.hotelDetails.general.cancelDays))
        let months= ["Jan" ,"Feb", "Mar" ,"Apr" ,"May" ,"Jun" ,"Jul" ,"Aug" ,"Sep" ,"Oct" ,"Nov" ,"Dec" ]

        return dt.getDate() + " " + months[dt.getMonth()+1]+ " " + dt.getFullYear();
      }else{
        let dt = new Date(this.checkinDate);
        dt.setDate(dt.getDate() - parseInt(this.hotelDetails.general.cancelDays))
        let months= ["Jan" ,"Feb", "Mar" ,"Apr" ,"May" ,"Jun" ,"Jul" ,"Aug" ,"Sep" ,"Oct" ,"Nov" ,"Dec" ]

        return dt.getDate() + " " + months[dt.getMonth()+1]+ " " + dt.getFullYear();
      }
      
    }
    
    
  }
};
</script>
