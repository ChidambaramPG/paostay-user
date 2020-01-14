<template>
	<div class="col-md-12">
        <div class="form-data">
            <form class="form">
                <div class="row">
                    <div class="col-md-3">
                        <div class="form-field border-r">
                            <label class="location" for="location">Location</label>
                            <div class="input-group mb-2 mr-sm-2">
                                <input autocomplete="off" v-model="location" type="text" class="form-control" id="location" placeholder="Location" />
                                
                                <div class="compass">
                                    <a href="#"><img src="../../assets/image/vector.png" alt=""></a>
                                </div>
                            </div>
                            <div class='locaton-list-continer'>
                                <ul class="list-group">
                                    <li class="list-group-item" :key="index" v-for="(place,index) in places.splice(0,5)" @click="() => setLocationFromAutocomplete(place)">{{place}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-field border-r">
                            <label class="" for="checkin">Check in</label>
                            <div class="input-group date mb-2 mr-sm-2 ">
                                <datepicker v-model="checkinDate" class="datepicker" input-class="form-control" :highlighted="highlightedDates" :value="checkinDate" />
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-field border-r">
                            <label class="" for="checkout">Check out</label>
                            <div class="input-group mb-2 mr-sm-2">
                                <datepicker v-model="checkoutDate" class="datepicker" input-class="form-control" :highlighted="highlightedDates" :value="checkoutDate" />
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-md-3">
                        <div class="form-field border-r">
                            <label class="" for="checkout">Guests</label>                            
                            <input type="text" readonly="readonly" 
                            autocomplete="off" class="form-control" 
                            :value="adultCount+ ' Adults and ' +roomCountChange + ' Rooms'"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 

                            <div class="dropdown-menu" aria-labelledby="guestCounts" @click.stop="">
                                <a class="guest-count-dropdown">
                                    <div class="row">
                                        <div class="col-md-3">
                                            Room Type
                                        </div>
                                        <div class="col-md-3">
                                            Rooms
                                        </div>
                                        <div class="col-md-3">
                                           Adults
                                        </div>
                                        <div class="col-md-3">
                                           Children
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row guest-counts">
                                        <div class="col-md-3">
                                            <select v-model="selectedRoomTypeIndex" name id class="form-control rooms">
	                                            <option v-for="(type,index) in roomTypes" :key="index" :value="index" :id="index">{{type.roomName}}</option>
	                                        </select>
                                        </div>
                                        <div class="col-md-3">
                                            {{roomCountChange}} 
                                        </div>
                                        <div class="col-md-3">
                                            <a class="btn btn-small"  @click="decrAdultCount">-</a>
                                            <span class="font-weight-bold">{{adultCount}}</span>
                                            <a @click="incrAdultCount" class="btn btn-small">+</a>
                                        </div>
                                        <div class="col-md-3">
                                            <a class="btn btn-small"  @click="decrChildCount">-</a>
                                            <span class="font-weight-bold">{{childCount}}</span>
                                            <a @click="incrChildCount" class="btn btn-small">+</a>
                                        </div>

                                    </div>
                                </a>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-btn">
                            <button type="submit" class="btn btn-primary mb-2 btn-block" @click.prevent="showHotelList">book now</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import store from "../../store.js";
import Datepicker from "vuejs-datepicker";

export default{
	name:"SearchBar",
	components: {
    Datepicker,
  },
	data(){
      return{

          checkinDate:new Date(),
          checkoutDate:new Date(),
          adultCount:1,
          childCount:0,
          guestCount:0,
          location:"",
          roomCount:1,
          roomTypes:[],
          selectedRoomTypeIndex:0,
      }
  },
  methods:{

    showHotelList(){
        if(this.isDatesCorrect && this.location != "" && this.adultCount >= 1){
            let details = {
                checkinDate:this.checkinDate,
                checkoutDate:this.checkoutDate,
                adultCount:this.adultCount,
                childCount:this.childCount,
                location:this.location,
                type:this.roomTypeSelected.id,
                roomCount:this.roomCountChange
            }
            this.$store.commit("setBookingDetails",details);
            this.$router.push("hotel-list")
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
    },
    incrChildCount(){
        
        this.childCount++;
        this.adultCount = Math.ceil(this.childCount/2)
    },
    decrChildCount(){
        if(this.childCount>0){
            this.childCount--;
        }
    },
    setLocationFromAutocomplete(place){
        this.location = place;
        while(this.places.length){
            this.places.pop()
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
      }else{
      	return {
          from:this.checkoutDate,
          to:this.checkinDate
        }

      }
    },
    roomTypeSelected:function(){
    	if(this.roomTypes.length > 0){
    		let selcIndx = this.selectedRoomTypeIndex;
	    	// console.log(this.roomTypes[selcIndx])
            return this.roomTypes[selcIndx]

            // let adults = this.adultCount;
            // let children = this.childCount;
            // let totGuests = adults + children;
            // let temp = []
            // this.roomTypes.forEach(item => {
            //     temp.push({prob:totGuests/item.maxGuests,room:item.roomName,max:item.maxGuests})
            // })
            
            // console.log(temp)
            
    	}
    },
    roomCountChange: function(){
    	if(this.roomTypeSelected){
    		let guests = this.adultCount;
	    	let maxGuests = this.roomTypeSelected.maxGuests

	    	return Math.ceil(guests/maxGuests)
    	}
    	
    },
    allHotels: () => {
        return store.state.hotelsList;
    },
    places:function(){
        // let loc = this.location;
        let locs = []
        // console.log(this.location);
        if(this.location.length > 0){
            this.allHotels.forEach(item => {
                if(item.location.city.toUpperCase().includes(this.location.toUpperCase())){
                    locs.push(item.location.city);
                }
            })
        }
        return locs;
    }
  },

  created(){
  	// console.log("----seachbar created---")
  	let dbRef = firebase.firestore().collection("RoomTypes");
    dbRef.get().then((response) => {
        let types = []
        response.forEach((item) => {
            console.log(item.data())
            types.push({ ...item.data(), id: item.id })
        })
        this.roomTypes = types;
    });

    store.dispatch('fetchAllHotels');
  },

}
</script>
<style>

.form-control[readonly]{
    background-color: white;
}
#guestCounts{
    background-color: white;
}  
.guest-counts{
    width:500px;
    padding-left:10px
}
.guest-count-dropdown{
    text-align:center;
}
</style>