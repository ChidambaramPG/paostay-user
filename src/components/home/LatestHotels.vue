<template>
  <div class="col-md-3 padding8" >
      <a :id="hoteldetails.uid"
        class="hotel-small-link"
         @click.prevent="showSingleHotelDetails($event, hoteldetails.uid)">
        <div class="hotel-data">
            <div class="figure">
                <img :src="images[0].data" v-if="images.length>1" alt="" class="img-fluid">
                <img  v-else src="../../assets/image/re.png" alt="" class="img-fluid">
            </div>
            <div class="hotel-details">
                <div class="row">
                    <div class="col-md-8">
                        <span class="place">{{hoteldetails.location.city}}</span>
                        <h4 class="type">{{hoteldetails.general.name}}</h4>
                        <div class="rating">
                            <span class="fa fa-star checked" :key="index" v-for="(str,index) in parseInt(hoteldetails.general.type)"></span>
                            
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="price">
                            <h5>₹{{hoteldetails.general.basePrice}}</h5><span class="time">per day</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </a>
    </div>
</template>

<script>
import firebase from 'firebase';
import store from '../../store.js';
import router from '../../router.js'
export default {
    name:'LatestHotels',
    props:['hoteldetails'],
    data(){
        return{
            images:[]
        }
    },
    created(){
        
        let hid = this.hoteldetails.uid;
        firebase
        .firestore()
        .collection("RoomImages")
        .where("hotelId", "==", hid)
        .get()
        .then(snapshot => {

            this.images = [];

            if (!snapshot.empty) {
            snapshot.forEach(img => {

                let dt = img.data();
                this.images.push(dt);
            });
            
            } else {
            
            }
        });
    },
    methods: {
        showSingleHotelDetails: (event, id) => {
            event.preventDefault();
            // console.log(id);
            store.commit("setSelectedHotel", id);
            router.push("hotel-details");
        }
    },
}
</script>

<style>

</style>