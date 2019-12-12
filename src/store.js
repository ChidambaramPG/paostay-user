import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn:false,
    showLoginModal:false,
    showSignupModal:false,
    hotelsList:[],
    selectedHotel:[],
    checkinDate:"",
    checkoutDate:"",
    adultCount:1,
    childCount:0,
    roomCount:1,
    location:'',
    selectedRoomType:"VvB6sBehXMFmvi86TpyI",
    selectedRoomDetails:[],
    hotelRoomTypes:[],
    allLocations:[],
    user:[],
    profileSection:'history',
    amenities:[],
    filteredHotelList:[]

  },
  mutations: {
    setProfileSecton:(state,payload)=>{
      state.profileSection = payload;
    },
    setHotelList: (state,payload) => {
      console.log("setting hotels list")
      console.log(payload)
      state.hotelsList = payload;
      state.filteredHotelList = payload;
    },
    setSelectedHotel: ( state,payload ) => {
      console.log('setting selected hotel');
      state.hotelsList.forEach((hotel)=>{
        if(hotel.uid == payload){
          state.selectedHotel = hotel;
        }
      })
    },
    setLogin: (state,payload) => {
      state.isLoggedIn = payload;
    },
    setShowLoginModal: (state,payload) => {
      state.showLoginModal = payload;
    },
    setSignupModalStatus: (state, payload) => {
      console.log(payload);
      state.showSignupModal = payload;
    },
    setLoginModalStatus: (state, payload) => {
      console.log(payload);
      state.showLoginModal = payload;
    },
    setBookingDetails: (state,payload) => {

      if(payload.checkinDate !=null){
        state.checkinDate = payload.checkinDate;
      }
      if(payload.checkoutDate !=null){
        state.checkoutDate = payload.checkoutDate;
      }
      if(payload.adultCount !=null){
        state.adultCount = payload.adultCount;
      }
      if(payload.roomCount !=null){
        state.roomCount = payload.roomCount;
      }
      if(payload.type !=null){
        state.selectedRoomType = payload.type;
      }
      if(payload.location !=null){
        state.location = payload.location;
      }
    },
    setHotelRoomTypes: (state,payload) => {
      state.hotelRoomTypes = payload;
      if(state.selectedRoomType != ""){
        payload.some( (item) => {
          console.log(item.id,state.selectedRoomType)
          console.log(item.roomTypeId == state.selectedRoomType)
          
            if(item.roomTypeId == state.selectedRoomType){
              state.selectedRoomDetails = item;
              return true;
            }
        })

      }else{
        state.selectedRoomDetails = payload[0]

      }
      
    },
    setSelectedRoomType: (state,payload) => {
      state.hotelRoomTypes = payload;
    },
    setLocationsList: (state,payload) => {
      let temp = []
      temp.push(payload[0]);

      for(let i=1;i<payload.length;i++){
        for(let j = 0;j<temp.length;j++){
          if(temp[j] != payload[i]){
            temp.push(payload[i]);
          }
        }
      }

      state.allLocations = temp;
    },
    setAmenities: (state,payload) => {
      state.amenities = payload;
    },
    filterHotels: (state,payload) => {
      let fHotels = state.filteredHotelList;
      let amnFilter = payload.amenity;

      let tempAmnHotels = []
      fHotels.forEach((item,index) => {
        console.log(item.general.name)
        for(let key in item.amenities){
          amnFilter.forEach((item2,index2) => {

            if(key == item2){
              console.log(item.amenities[key].status)
              if(item.amenities[key].status == true){
                console.log(item.general.name)
                tempAmnHotels.push(item);
              }
            }
          })

        }
        
      })

      console.log([...new Set(tempAmnHotels)]);
      state.filteredHotelList = [...new Set(tempAmnHotels)];
    }
  },
  actions: {
    fetchHotelList: async ({commit,state}) => {

      let htls = [];
      let roomTypeId = state.selectedRoomType;
      let location = state.location;
      console.log("roomTypeId:",roomTypeId);
      if(roomTypeId != ""){
        await firebase.firestore()
            .collection("Rooms")
            .where("roomTypeId","==",roomTypeId)
            .get()
            .then( (response) => {
              let hotels = [];
              response.forEach( (item) => {
                console.log(item.data())
                hotels.push(firebase.firestore().collection("Hotels").doc(item.data().hotelId).get())
              })
              console.log(hotels)
              Promise.all(hotels).then( item =>{
                let htls = [];
                item.forEach( a => {
                  if(location != ''){
                    if(location == a.data().location.city){
                      htls.push({...a.data(),uid:a.id})
                    }
                  }else{
                    htls.push({...a.data(),uid:a.id})                    
                  }                  
                })
                console.log(htls);
                commit("setHotelList",htls);
              })
            })
      }else{
        await firebase.firestore().
            collection("Hotels").
            where("status","==","accepted").
            get().
            then((snapshot)=>{
                console.log(snapshot)
                snapshot.forEach(element => {
                    htls.push({...element.data(),uid:element.id})
                });
                console.log(htls)
                // this.hotels = htls;
                commit("setHotelList",htls);
            });

      }
      

      
    },
    setLoginStatus: ({commit}) => {
      let user = firebase.auth().currentUser;
      // console.log(user)
      if (user){
        commit("setLogin",true)
      }else{
        commit("setLogin",false)
      }
    },
    fetchHotelRoomTypes: ({commit,state}) => {

      let dbRef = firebase.firestore().collection("Rooms").where("hotelId","==",state.selectedHotel.uid);

      dbRef.get().then( (response) => {
        // console.log(response)
        let types = []
        response.forEach( (item) => {
          types.push({...item.data(),id:item.id});
        })
        commit("setHotelRoomTypes",types)
      })
    },
    fetchHotelRoomTypesOnEmptySelect: ({commit,state}) => {

      let dbRef = firebase.firestore().collection("Rooms").where("hotelId","==",state.selectedHotel.uid);

      dbRef.get().then( (response) => {
        // console.log(response)
        let types = []
        response.forEach( (item) => {
          types.push({...item.data(),id:item.id});
        })
        commit("setHotelRoomTypes",types)
      })
    },
    fetchAllHotels: ({commit,state}) => {
      console.log('fetching all hotels')
      let htls = [];
      let locs = []
      firebase.firestore().
            collection("Hotels").
            where("status","==","accepted").
            get().
            then((snapshot)=>{
                // console.log(snapshot)
                snapshot.forEach(element => {
                  locs.push(element.data().location.city)
                  htls.push({...element.data(),uid:element.id})
                });
                console.log('hotels: ',htls)
                // this.hotels = htls;
                commit("setHotelList",htls);
                commit('setLocationsList',locs)
            });
    },
    fetchUserDetals: ({commit,state})=> {
      state.user = firebase.auth().currentUser;
    },
    fetchAmenities: ({state,commit}) => {
      let temp = [];
      firebase.firestore().collection('Amenities').get().then( response => {
        console.log(response.docs)
        response.docs.forEach(doc => {
          temp.push({id:doc.id,data:doc.data()});
        });
        state.commit('setAmenities',temp);
      })
    },
    
  
   
  }
});
