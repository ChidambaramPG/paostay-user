import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    showLoginModal: false,
    showSignupModal: false,
    hotelsList: [],
    selectedHotel: [],
    checkinDate: "",
    checkoutDate: "",
    adultCount: 1,
    childCount: 0,
    roomCount: 1,
    location: "",
    selectedRoomType: "VvB6sBehXMFmvi86TpyI",
    selectedRoomDetails: [],
    hotelRoomTypes: [],
    allRoomTypes:[],
    allRooms:[],
    allLocations: [],
    user: [],
    profileSection: "history",
    amenities: [],
    filteredHotelList: [],
    hotelSpecificCoupons:[],
    generalCoupons:[]
  },
  mutations: {
    setSelectedHotelCoupons:(state,payload) => {
      state.hotelSpecificCoupons = payload;
    },
    setGeneralCoupons:(state,payload) => {
      state.generalCoupons = payload;
    },
    setAllRooms: ( state, payload) => {
      state.allRooms = payload;
    },
    setProfileSecton: (state, payload) => {
      state.profileSection = payload;
    },
    setAllRoomTypes : (state, payload) => {
      state.allRoomTypes = payload;
    },
    setHotelList: (state, payload) => {
      // console.log("setting hotels list")
      // console.log(payload)
      state.hotelsList = payload;
      state.filteredHotelList = payload;
    },
    setSelectedHotel: (state, payload) => {
      // console.log('setting selected hotel');
      state.hotelsList.forEach(hotel => {
        if (hotel.uid == payload) {
          state.selectedHotel = hotel;
        }
      });
    },
    setLogin: (state, payload) => {
      state.isLoggedIn = payload;
    },
    setShowLoginModal: (state, payload) => {
      state.showLoginModal = payload;
    },
    setSignupModalStatus: (state, payload) => {
      // console.log(payload);
      state.showSignupModal = payload;
    },
    setLoginModalStatus: (state, payload) => {
      // console.log(payload);
      state.showLoginModal = payload;
    },
    setBookingDetails: (state, payload) => {
      if (payload.checkinDate != null) {
        console.log(payload.checkinDate)
        state.checkinDate = payload.checkinDate;
      }
      if (payload.checkoutDate != null) {
        console.log(payload.checkoutDate)
        state.checkoutDate = payload.checkoutDate;
      }
      if (payload.adultCount != null) {
        state.adultCount = payload.adultCount;
      }
      if (payload.roomCount != null) {
        state.roomCount = payload.roomCount;
      }
      if (payload.type != null) {
        state.selectedRoomType = payload.type;
      }
      if (payload.location != null) {
        state.location = payload.location;
      }
      if (payload.childCount != null) {
        state.childCount = payload.childCount;
      }
    },
    setHotelRoomTypes: (state, payload) => {
      state.hotelRoomTypes = payload;
      if (state.selectedRoomType != "") {
        payload.some(item => {
          // console.log(item.id,state.selectedRoomType)
          // console.log(item.roomTypeId == state.selectedRoomType)

          if (item.roomTypeId == state.selectedRoomType) {
            state.selectedRoomDetails = item;
            return true;
          }
        });
      } else {
        state.selectedRoomDetails = payload[0];
      }
    },
    setSelectedRoomType: (state, payload) => {
      state.hotelRoomTypes = payload;
    },
    setLocationsList: (state, payload) => {
      let temp = [];
      temp.push(payload[0]);

      for (let i = 1; i < payload.length; i++) {
        for (let j = 0; j < temp.length; j++) {
          if (temp[j] != payload[i]) {
            temp.push(payload[i]);
          }
        }
      }

      state.allLocations = temp;
    },
    setAmenities: (state, payload) => {
      state.amenities = payload;
    },
    filterHotels: (state, payload) => {
      let fHotels = state.hotelsList;
      let amnFilter = payload.amenity;
      let priceFilter = payload.price;
      let ratingFilter = payload.rating;
      let locFilter = payload.location;
      let typeFilter = payload.type;
      // console.log(payload.type.length)

      let tempAmnHotels = [];
      if (amnFilter.length < 1) {
        tempAmnHotels = fHotels;
      } else {
        fHotels.forEach((item, index) => {
          // console.log(item.general.name)
          for (let key in item.amenities) {
            amnFilter.forEach((item2, index2) => {
              if (key == item2) {
                // console.log(item.amenities[key].status)
                if (item.amenities[key].status == true) {
                  // console.log(item.general.name)
                  tempAmnHotels.push(item);
                }
              }
            });
          }
        });
      }

      let tempPriceHotels = [];
      if (priceFilter.length < 1) {
        tempPriceHotels = tempAmnHotels;
      } else {
        tempAmnHotels.forEach(item3 => {
          priceFilter.forEach(p1 => {
            if (p1.length == 1) {
              if (item3.general.basePrice > p1[0]) {
                tempPriceHotels.push(item3);
              }
            } else {
              if (
                item3.general.basePrice > p1[0] &&
                item3.general.basePrice < p1[1]
              ) {
                tempPriceHotels.push(item3);
              }
            }
          });
        });
      }

      let tempRatingHotels = []

      if(ratingFilter.length <1){
        tempRatingHotels = tempPriceHotels;
      }else{
        tempPriceHotels.forEach(item4 => {
          ratingFilter.forEach(r1 => {
            if(item4.general.type == r1){
              tempRatingHotels.push(item4);
            }
          })
          
        })
      }

      let tempLocHotels = []
      if(locFilter == ""){
        tempLocHotels = tempRatingHotels;
      }else{
        tempRatingHotels.forEach(item5 => {
          if(item5.location.city.toLowerCase() == locFilter.toLowerCase()){
            tempLocHotels.push(item5)
          }
        })
      }

      
      let tempTypeHotels = []
      if(typeFilter.length < 1){
        console.log('no type filter')
        tempTypeHotels = tempLocHotels;
      }else{
        console.log('insde type filter')
        let temp3 = []
        tempLocHotels.forEach(item6 => {

          console.log(item6)
          let hid= item6.uid;
          let tempHotelRooms = []

          state.allRooms.forEach(room => {
            if(hid == room.hotelId){
              tempHotelRooms.push(room)
            }
          })

          
          let roomIdFound = false;
          tempHotelRooms.forEach(item7 => {
            typeFilter.forEach(type => {
              if(type.uid == item7.roomTypeId){
                temp3.push(item6)
              }
            })
          })

          console.log(temp3)
          tempTypeHotels = temp3;
         
        })
      }

      // console.log([...new Set(tempAmnHotels)]);
      state.filteredHotelList = [...new Set(tempTypeHotels)];
    }
  },
  actions: {
    fetchHotelList: async ({ commit, state }) => {
      let htls = [];
      let roomTypeId = state.selectedRoomType;
      let location = state.location;
      // console.log("roomTypeId:",roomTypeId);
      if (roomTypeId != "") {
        await firebase
          .firestore()
          .collection("Rooms")
          .where("roomTypeId", "==", roomTypeId)
          .get()
          .then(response => {
            let hotels = [];
            response.forEach(item => {
              // console.log(item.data())
              hotels.push(
                firebase
                  .firestore()
                  .collection("Hotels")
                  .doc(item.data().hotelId)
                  .get()
              );
            });
            // console.log(hotels)
            Promise.all(hotels).then(item => {
              let htls = [];
              item.forEach(a => {
                if (location != "") {
                  if (location == a.data().location.city) {
                    htls.push({ ...a.data(), uid: a.id });
                  }
                } else {
                  htls.push({ ...a.data(), uid: a.id });
                }
              });
              // console.log(htls);
              commit("setHotelList", htls);
            });
          });
      } else {
        await firebase
          .firestore()
          .collection("Hotels")
          .where("status", "==", "accepted")
          .get()
          .then(snapshot => {
            // console.log(snapshot)
            snapshot.forEach(element => {
              htls.push({ ...element.data(), uid: element.id });
            });
            // console.log(htls)
            // this.hotels = htls;
            commit("setHotelList", htls);
          });
      }
    },
    setLoginStatus: ({ commit }) => {
      let user = firebase.auth().currentUser;
      // // console.log(user)
      if (user) {
        commit("setLogin", true);
      } else {
        commit("setLogin", false);
      }
    },
    fetchHotelRoomTypes: ({ commit, state }) => {
      let dbRef = firebase
        .firestore()
        .collection("Rooms")
        .where("hotelId", "==", state.selectedHotel.uid);

      dbRef.get().then(response => {
        // // console.log(response)
        let types = [];
        response.forEach(item => {
          types.push({ ...item.data(), id: item.id });
        });
        commit("setHotelRoomTypes", types);
      });
    },
    fetchHotelRoomTypesOnEmptySelect: ({ commit, state }) => {
      let dbRef = firebase
        .firestore()
        .collection("Rooms")
        .where("hotelId", "==", state.selectedHotel.uid);

      dbRef.get().then(response => {
        // // console.log(response)
        let types = [];
        response.forEach(item => {
          types.push({ ...item.data(), id: item.id });
        });
        commit("setHotelRoomTypes", types);
      });
    },
    fetchAllHotels: ({ commit, state }) => {
      // console.log('fetching all hotels')
      let htls = [];
      let locs = [];
      firebase
        .firestore()
        .collection("Hotels")
        .where("status", "==", "accepted")
        .get()
        .then(snapshot => {
          // // console.log(snapshot)
          snapshot.forEach(element => {
            locs.push(element.data().location.city);
            htls.push({ ...element.data(), uid: element.id });
          });
          // console.log('hotels: ',htls)
          // this.hotels = htls;
          commit("setHotelList", htls);
          commit("setLocationsList", locs);
        });
    },
    fetchUserDetals: ({ commit, state }) => {
      state.user = firebase.auth().currentUser;
    },
    fetchAmenities: ({ state, commit }) => {
      let temp = [];
      firebase
        .firestore()
        .collection("Amenities")
        .get()
        .then(response => {
          // console.log(response.docs)
          response.docs.forEach(doc => {
            temp.push({ id: doc.id, data: doc.data() });
          });
          state.commit("setAmenities", temp);
        });
    },
    fetchAllRoomTypes:({state,commit}) => {
      let typeTemp =[];
      let roomsTemp =[];
      firebase
          .firestore()
          .collection("RoomTypes")
          .get()
          .then(snapshot => {
            // console.log(snapshot)
            snapshot.forEach(element => {
              typeTemp.push({ ...element.data(), uid: element.id });
            });
            console.log("room types:",typeTemp)
            // this.hotels = htls;
            commit("setAllRoomTypes", typeTemp);
          });
      firebase.firestore()
      .collection("Rooms")
      .get()
      .then(snapshot => {
        // console.log(snapshot)
        snapshot.forEach(element => {
          roomsTemp.push({ ...element.data(), uid: element.id });
        });
        console.log("room types:",roomsTemp)
        // this.hotels = htls;
        commit("setAllRooms", roomsTemp);
      });
    }
  }
});
