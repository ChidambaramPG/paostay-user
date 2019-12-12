<template>
  <div class="col-md-6">
    <div class="hotel-small">
      <a
        :id="hoteldata.uid"
        class="hotel-small-link"
        @click="showSingleHotelDetails($event, hoteldata.uid)"
      >
        <div class="hotel-pic figure">
          <img
            src="../../assets/image/re.png"
            alt
            class="img-fluid"
            :id="hoteldata.uid"
            v-if="images.length < 1"
          />
          <img
            :src="images[0].data"
            alt
            class="img-fluid"
            :id="hoteldata.uid"
            v-else
          />

          <div class="fig-details">
            <a href="#" class="fav">
              <i class="fa fa-heart btn-heart"></i>
            </a>
            <div class="rating-count">
              <i class="fa fa-star checked"></i> {{ hoteldata.general.type }}
            </div>
            <div class="pricing">₹{{ hoteldata.general.basePrice }} / Day</div>
          </div>
        </div>
        <span class="hotel-details">
          <a href="#" class="hotel-details-link">
            <span class="row">
              <span class="col-md-6">
                <h4 class="hotel-grid-name">{{ hoteldata.general.name }}</h4>
                <span class="hotel-place">{{ hoteldata.location.city }}</span>
              </span>
              <span class="col-md-6">
                <h5 class="color-blue pull-right">Free Breakfast</h5>
                <ul class="list">
                  <li class="list-item" :key="index" v-for="(amenities,index) in getAmenities" ><i class="fas fa-circle"/>{{amenities}}</li>               
                </ul>
              </span>
            </span>
          </a>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import store from "../../store.js";
import router from "../../router.js";
import firebase, { firestore } from "firebase";
export default {
  name: "HotelCard",
  data() {
    return {
      hotelDetails: [],
      images: [],

    };
  },
  computed:{
    getAmenities(){
      let amn = this.hoteldata.amenities;
      
      let avlAmn = []
      // console.log(amn)
      // let keys = Object.keys(amn);
      for( let key in amn){
        // console.log(key)
        // console.log('item: ',amn[key]['status'])
        if(amn[key].status == true){
          avlAmn.push(key);
        }
      }
      console.log(avlAmn)
      // amn.forEach(item => {
      //   if(item.status == true){
      //     avl.push(item);
      //   }
      // })
      // if(avlAmn.length < 1){
      //   return null;
      // } 
      return avlAmn.splice(0,2)
    }
  },
  props: ["hoteldata"],
  mounted() {
    this.hotelDetails = this.hoteldata;
    let hid = this.hoteldata.uid;
    firebase
      .firestore()
      .collection("RoomImages")
      .where("hotelId", "==", hid)
      .get()
      .then(snapshot => {
        // console.log(snapshot);

        this.images = [];

        if (!snapshot.empty) {
          snapshot.forEach(img => {
            // console.log(img);

            let dt = img.data();
            this.images.push(dt);
          });
          // this.selectedImage = this.images[0].data;
        } else {
          // this.selectedImage = ""
        }
      });

    // firebase
    //   .firestore()
    //   .collection("Hotels")
    //   .doc(hid)
    //   .get()
    //   .then(response => {
    //     console.log(response.data());
    //   });
  },
  methods: {
    showSingleHotelDetails: (event, id) => {
      event.preventDefault();
      console.log(id);
      store.commit("setSelectedHotel", id);
      router.push("hotel-details");
    }
  },
  created() {}
};
</script>

<style scoped>
.hotel-pic {
  height: 200px;
}
</style>
