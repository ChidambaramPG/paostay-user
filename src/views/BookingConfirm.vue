<template>
  <section class="booking-result">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="top-heading">
            <h2>
              your booking for
              {{ Math.ceil(dateDifference(bookingDetails.checkinDate, bookingDetails.checkoutDate)) }} night
            </h2>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <div class="guest-details-result">
            <h3>guest details</h3>
            <form action class="forms">
              <div class="name-field">
                <label class="name">name</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="result-data"
                    value="Bruce Wayne"
                    v-model="username"
                    id="username"
                  />
                  <!-- <div class="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="defaultChecked2"
                      checked
                    />
                    <label
                      class="custom-control-label checkbox-discount bookingpage"
                      for="defaultChecked2"
                    ></label>
                  </div> -->
                  <p class="warning-msg">
                    All communications from pao stay will
                    <br />be sent on the shared details
                  </p>
                </div>
              </div>
              <div class="contact-field">
                <label class="name">mobile number</label>
                <div class="input-group">
                  <input
                    type="tel"
                    id="telephone"
                    class="result-data"
                    v-model="phone"
                  />
                </div>
              </div>
              <div class="email-field">
                <label class="name">email</label>
                <div class="input-group">
                  <input
                    type="email"
                    class="result-data"
                    id="userEmail"
                    value="bruce@gmail.com"
                    v-model="email"
                  />
                </div>
              </div>
            </form>
            <div class="add-ons">
              <h3>value add-ons</h3>
              <div
                class="add-ons-details"
                v-if="getSelectedHotelCoupons.length > 0"
              >
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input offer-checkbox"
                    :id="'special_' + selectedHotelOffer"
                    @click="
                      () =>
                        selectSpecialOffer(
                          getSelectedHotelCoupons[selectedHotelOffer],
                          selectedHotelOffer
                        )
                    "
                  />
                  <label
                    class="custom-control-label checkbox-discount mr-left"
                    :for="'special_' + selectedHotelOffer"
                  ></label>
                  <span class="discount"
                    >{{
                      getSelectedHotelCoupons[selectedHotelOffer].couponValue
                    }}
                    <span
                      v-if="
                        getSelectedHotelCoupons[selectedHotelOffer]
                          .couponValueType == 'percent'
                      "
                      >%</span
                    >
                    discount on booking</span
                  >
                  <span class="coupon"
                    >"{{
                      getSelectedHotelCoupons[selectedHotelOffer].couponName
                    }}" coupon code applied</span
                  >
                </div>
                <a
                  href="#"
                  class="pull-right links"
                  v-if="getSelectedHotelCoupons.length > 1"
                  >Next</a
                >
              </div>
              <div class="add-ons-details" v-if="getGeneralCoupons.length > 0">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input offer-checkbox"
                    :id="'general_' + selectedGeneralOffer"
                    @click="
                      () =>
                        selectGeneralOffer(
                          getGeneralCoupons[selectedGeneralOffer],
                          selectedGeneralOffer
                        )
                    "
                  />
                  <label
                    class="custom-control-label checkbox-discount mr-left"
                    :for="'general_' + selectedGeneralOffer"
                  ></label>
                  <span class="discount"
                    >{{ getGeneralCoupons[selectedGeneralOffer].couponValue }}
                    <span
                      v-if="
                        getGeneralCoupons[selectedGeneralOffer]
                          .couponValueType == 'percent'
                      "
                      >%</span
                    >
                    discount on booking</span
                  >
                  <span class="coupon"
                    >"{{ getGeneralCoupons[selectedGeneralOffer].couponName }}"
                    coupon code applied</span
                  >
                </div>
                <a
                  href="#"
                  class="pull-right links"
                  v-if="getGeneralCoupons.length > 1"
                  @click.prevent="() => incrGeneralCouponSelectionCount()"
                  >Next</a
                >
              </div>
              <!-- <div class="add-ons-details">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checked1"
                    checked
                  />
                  <label
                    class="custom-control-label checkbox-discount mr-left"
                    for="checked1"
                  ></label>
                  <span class="discount">Use Pao Wallet</span>
                  <span class="coupon">Wallet Balance : ₹500</span>
                </div>
                <a href="#" class="pull-right links">DETAILS</a>
              </div> -->
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="log-btn">
                  <button class="btn btn-primary pay-now" @click="makePayment">
                    pay now
                  </button>
                </div>
              </div>
              <div class="col-md-6">
                <div class="log-btn">
                  <button class="btn btn-primary pay-hotel" @click="payAtHotel">
                    pay at hotel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ....................................    -->
        <div class="col-md-5">
          <div class="payment-details">
            <div class="payment-head">
              <h2>{{ hotelDetails.general.name }}</h2>
              <span class="span-title">{{ hotelDetails.location.city }}</span>
            </div>
            <div class="date-time-details">
              <div class="checkin-date">
                <i class="far fa-arrow-alt-circle-right btn-arrows"></i>
                <span class="checkin-date-booking-summary">
                  {{ dateConvert(bookingDetails.checkinDate) }}
                </span>
                <span class="pull-right booking-summary-checkin"
                  >Check in Time: 12:00 PM</span
                >
              </div>
              <div class="checkout-date">
                <i class="far fa-arrow-alt-circle-left btn-arrows"></i>
                <span class="checkin-date-booking-summary">
                  {{ dateConvert(bookingDetails.checkoutDate) }}
                </span>
                <span class="pull-right booking-summary-checkin"
                  >Check out Time: 11:00 AM</span
                >
              </div>
            </div>
            <div class="room-details">
              <i class="fas fa-user-plus blue"></i>
              <span class="details">
                {{ roomCount }} {{ selectedRoomDetails.roomName }},{{
                  bookingDetails.adultCount
                }}
                Guest,{{ Math.ceil(dateDifference(bookingDetails.checkinDate, bookingDetails.checkoutDate)) }}
                Night
                <a href="#" class="change pull-right">CHANGE</a>
              </span>
            </div>
            <div class="payment-details-summary">
              <table class="table table-borderless">
                <thead>
                  <h3>payment details</h3>
                </thead>
                <tbody>
                  <tr>
                    <td class="table-data">booking amount</td>
                    <td class="offers">
                      ₹{{ selectedRoomDetails.price }} X
                      {{ Math.ceil(bookingDetails.roomCount) }} Room X
                      {{ Math.ceil(dateDifference(bookingDetails.checkinDate, bookingDetails.checkoutDate)) }}
                      Days
                    </td>
                    <td class="total-price">
                      ₹{{
                        calculateTotalAmount(
                          selectedRoomDetails.price,
                          Math.ceil(bookingDetails.roomCount),
                          Math.ceil(dateDifference(bookingDetails.checkinDate, bookingDetails.checkoutDate))
                        )
                      }}
                    </td>
                  </tr>
                  <tr v-if="offerSelected != []">
                    <td class="table-data">{{ offerSelected.couponName }}</td>
                    <td>
                      {{ offerSelected.couponValue
                      }}<span v-if="offerSelected.couponValueType == 'percent'"
                        >%</span
                      >
                    </td>
                    <td>{{ calculateDiscountAmount() + " Off" }}</td>
                  </tr>

                  <tr class="border-last"></tr>
                  <tr>
                    <td colspan="2" class="total-amount">
                      payable amount
                      <br />
                      <span class="tax-details">(Inclusive of all taxes)</span>
                    </td>
                    <td class="total-amount">
                      ₹{{ this.totalAmount - calculateDiscountAmount() }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <login-modal />
    <signup-modal />
  </section>
</template>
<script>
import store from "../store.js";
import router from "../router.js";
import firebase from "firebase";
import axios from "axios";
import LoginModal from "../components/LoginModal.vue";
import SignupModal from "../components/SignupModal.vue";

export default {
  name: "BookingConfirm",
  data() {
    return {
      adultCount: 1,
      childCount: 0,
      checkinDate: "",
      checkoutDate: "",
      hotelDetails: [],
      roomCount: 1,
      totalAmount: 0,
      discount: 0,
      netAmount: 0,
      couponDiscount: 500,
      couponUsed: "5O0FF",
      username: "",
      phone: "",
      email: "",
      selectedHotelOffer: 0,
      selectedGeneralOffer: 0,
      isOfferSelected: false,
      offerSelected: []
    };
  },
  components: {
    LoginModal,
    SignupModal
  },
  computed: {
    bookingDetails: function() {
      let inDate = this.$store.state.checkinDate;
      this.checkinDate = new Date(inDate);
      let outDate = this.$store.state.checkoutDate;
      this.checkoutDate = new Date(outDate);
      let aCount = this.$store.state.adultCount;
      this.adultCount = aCount;
      let rCount = this.$store.state.roomCount;
      this.roomCount = rCount;

      return {
        checkinDate:this.$store.state.checkinDate,
        checkoutDate:this.$store.state.checkoutDate,
        adultCount:this.$store.state.adultCount,
        roomCount:this.$store.state.roomCount
      }
    },
    selectedRoomDetails() {
      return store.state.selectedRoomDetails;
    },
    getSelectedHotelCoupons() {
      return store.state.hotelSpecificCoupons;
    },
    getGeneralCoupons() {
      return store.state.generalCoupons;
    }
  },
  created() {
    this.hotelDetails = store.state.selectedHotel;
    // this.bookingDetails;
    // firebase
    //   .firestore()
    //   .collection("Coupons")
    //   .where("couponHotel", "==", this.getSelectedHotelDetails.uid)
    //   .get()
    //   .then(resp => {
    //     let temp = []
    //     resp.forEach(item => {
    //       console.log(item.data())
    //       temp.push({...item.data(),cid:item.id})
    //     })
    //     store.commit('setSelectedHotelCoupons',temp)
    //   });
    // firebase
    //   .firestore()
    //   .collection("Coupons")
    //   .where("couponType", "==", 'general')
    //   .get()
    //   .then(resp => {
    //     let temp = []
    //     resp.forEach(item => {
    //       console.log(item.data())
    //       temp.push({...item.data(),cid:item.id})
    //     })
    //     store.commit('setGeneralCoupons',temp)
    //   });
  },
  mounted() {
    if (firebase.auth().currentUser != null) {
      console.log(firebase.auth().currentUser.uid);
      let uid = firebase.auth().currentUser.uid;
      // firebase.firestore().collection("Users").doc(uid).get().then(user => {
      //   let name = user.username;
      // })
      let email = firebase.auth().currentUser.email;
      let name = email.split("@")[0];
      this.updateHTML("userEmail", email, name);
      // document.getElementById("userEmail").value = email;
      // console.log(email,name)
    }
  },
  methods: {
    calculateDiscountAmount() {
      if (this.offerSelected == []) {
        return 0;
      }
      if (this.offerSelected.couponValueType == "percent") {
        return Math.ceil(
          (parseFloat(this.offerSelected.couponValue) / 100) * this.totalAmount
        );
      } else if (this.offerSelected.couponValueType == "amount") {
        return this.totalAmount - this.offerSelected.couponValue;
      } else {
        return 0;
      }
    },
    selectSpecialOffer(offer, index) {
      this.offerSelected = offer;
      if (this.isOfferSelected == false) {
        this.isOfferSelected = true;
      } else {
        Array.from(document.querySelectorAll(".offer-checkbox")).forEach(
          function(elem) {
            if (elem.id == "special_" + index) {
              console.log("found special offer");
            } else {
              document.getElementById(elem.id).checked = false;
            }
          }
        );
      }
    },
    selectGeneralOffer(offer, index) {
      this.offerSelected = offer;
      if (this.isOfferSelected == false) {
        this.isOfferSelected = true;
      } else {
        // this.isOfferSelected = true;
        Array.from(document.querySelectorAll(".offer-checkbox")).forEach(
          function(elem) {
            // Now do something with my button
            console.log(elem);
            if (elem.id == "general_" + index) {
              console.log("found one");
            } else {
              document.getElementById(elem.id).checked = false;
              // elem.value = 'off'
            }
          }
        );
      }
    },
    incrGeneralCouponSelectionCount() {
      this.selectedGeneralOffer++;
    },
    updateHTML(elmId, email, name) {
      var elem = document.getElementById(elmId);
      if (typeof elem !== "undefined" && elem !== null) {
        // elem.value = email;
        this.email = email;
      }
      var nameElem = document.getElementById("username");
      if (typeof elem !== "undefined" && elem !== null) {
        // nameElem.value = name
        this.username = name;
      }
    },
    dateConvert(date) {
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
      let conDt =
        date.getDate() +
        ", " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear() +
        " ";
      return conDt;
    },
    dateDifference(d1, d2) {
      console.log(d1, d2);
      let timeDiff = d2.getTime() - d1.getTime();
      let DaysDiff = timeDiff / (1000 * 3600 * 24);

      return DaysDiff;
    },
    calculateTotalAmount(base, rooms, days) {
      let tot = base * rooms * days;
      this.totalAmount = tot;
      return tot;
    },
    calculateDiscountedAmount() {
      return this.totalAmount * (this.discount / 100);
    },
    totalAmountPayable() {
      return (
        this.totalAmount -
        this.calculateDiscountedAmount() -
        this.couponDiscount
      );
    },
    payAtHotel() {
      if (firebase.auth().currentUser == null) {
        this.$toast.info("Login to continue booking");
        this.$store.commit("setShowLoginModal", true);
      } else {
        if (this.username == "" || this.phone == "" || this.email == "") {
          // alert("some details are missing");
          this.$toast.error("some details are missing");
        } else {
          if (this.offerSelected.couponName != undefined) {
            console.log(this.offerSelected);
            console.log(this.calculateDiscountAmount());
            this.couponUsed = this.offerSelected.couponName;
            this.couponDiscount = this.calculateDiscountAmount();
            // this.totalAmount = this.totalAmount - this.calculateDiscountAmount()
          }

          let bookingData = {
            adultCount: this.adultCount,
            childCount: this.childCount,
            checkinDate: this.checkinDate,
            checkoutDate: this.checkoutDate,
            roomCount: this.roomCount,
            totalAmount: this.totalAmount - this.calculateDiscountAmount(),
            discount: this.discount,
            netAmount: this.netAmount,
            couponDiscount: this.couponDiscount,
            couponUsed: this.couponUsed,
            userId: firebase.auth().currentUser.uid,
            hotelId: this.hotelDetails.uid,
            hotelName: this.hotelDetails.general.name,
            hotelAddress: this.hotelDetails.location.city,
            username: this.username,
            phone: this.phone,
            email: this.email,
            bookedDate: new Date(),
            roomTypeId: store.state.selectedRoomDetails.roomTypeId,
            status: "pending",
            paymentType: "at-hotel"
          };

          console.log(bookingData);

          let bookingRef = firebase.firestore().collection("Booking");

          bookingRef.add(bookingData).then(response => {
            // console.log(response);
            alert("booking confirmed");
            this.$toast.success("Booking confirmed.")
            this.$toast.info(' Redirecting to profile.')
            router.replace("profile");
          });
        }
      }
    },
    payNow() {
      var options = {
        key: "rzp_test_HDcNfetCAuDfcJ", // Enter the Key ID generated from the Dashboard
        amount: "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
        currency: "INR",
        name: "Acme Corp",
        description:
          "A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami",
        image: "https://example.com/your_logo",
        order_id: "order_9A33XWu170gUtm", //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
        handler: function(response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999"
        },
        notes: {
          address: "note value"
        },
        theme: {
          color: "#F37254"
        }
      };
      var rzp1 = new Razorpay(options);
      rzp1.open();

      //   fetch('https://us-central1-paostay-test-backend.cloudfunctions.net/createOrder',{
      //     // headers:{
      //     //   'Access-Control-Allow-Origin': '*',
      //     // }
      //     headers: {
      //         'Content-Type': 'application/json',
      //         'API-Key': 'secret'
      //     }
      //   })
      //   .then(resp => resp.json())
      //   .then(data=> // console.log(data))

      //     // var options = {
      //     //     "key": "rzp_test_HDcNfetCAuDfcJ", // Enter the Key ID generated from the Dashboard
      //     //     "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
      //     //     "currency": "INR",
      //     //     "name": "Acme Corp",
      //     //     "description": "A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami",
      //     //     "image": "https://example.com/your_logo",
      //     //     "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      //     //     "handler": function(response) {
      //     //         alert(response.razorpay_payment_id);
      //     //     },
      //     //     "prefill": {
      //     //         "name": "Gaurav Kumar",
      //     //         "email": "gaurav.kumar@example.com",
      //     //         "contact": "9999999999"
      //     //     },
      //     //     "notes": {
      //     //         "address": "note value"
      //     //     },
      //     //     "theme": {
      //     //         "color": "#F37254"
      //     //     }
      //     // };
      //     // var rzp1 = new Razorpay(options);
      //     // rzp1.open();
    },

    makePayment: function() {
      //  ===================== TO BE DONE LATER =====================
      // // 1. GENERATE ORDER_ID using razorpay/order api
      // axios.post('https://us-central1-paostay-test-backend.cloudfunctions.net/paymentApi/',{
      //   amount:this.totalAmount,
      //   headers:{
      //       'Access-Control-Allow-Origin': '*',
      //   }
      // })
      // .then((res)=>{
      //   var rzp1 = new Razorpay({...options,order_id:res.data.id});
      //   rzp1.open();
      // })
      // .catch((err)=>{// console.log("ERR",err)});

      // //  create options object when creating order
      // var options = {
      //   key: "rzp_test_HDcNfetCAuDfcJ",
      //   amount: "59900", /// The amount is shown in currency subunits. Actual amount is ₹599.
      //   name: "Formec Media",
      //   currency: "INR", // Optional. Same as the Order currency
      //   description: "Purchase Description",
      //   image: "https://jolly-volhard-bc2f0b.netlify.com/favicon.ico",
      //   handler:  (response) =>{
      //     this.verifySignature(response);
      //   },
      //   prefill: {
      //       name: "Rohan Lamb",
      //       email: "lambrohan@gmail.com"
      //   },
      //   notes: {
      //       address: "Hello World"
      //   },
      //   theme: {
      //       color: "#00ffff"
      //   }
      // };

      if (this.username == "" || this.phone == "" || this.email == "") {
        alert("some details are missing");
      } else {
        let bookingData = {
          adultCount: this.adultCount,
          childCount: this.childCount,
          checkinDate: this.checkinDate,
          checkoutDate: this.checkoutDate,
          roomCount: this.roomCount,
          totalAmount: this.totalAmount,
          discount: this.discount,
          netAmount: this.netAmount,
          couponDiscount: this.couponDiscount,
          couponUsed: this.couponUsed,
          userId: firebase.auth().currentUser.uid,
          hotelId: this.hotelDetails.uid,
          hotelName: this.hotelDetails.general.name,
          hotelAddress: this.hotelDetails.location.city,
          username: this.username,
          phone: this.phone,
          email: this.email,
          bookedDate: new Date(),
          roomTypeId: store.state.selectedRoomDetails.roomTypeId,
          status: "pending",
          paymentType: "online"
        };
        let bookingRef = firebase.firestore().collection("Booking");
        bookingRef.add(bookingData).then(response => {
          // console.log(response);
          alert("booking confirmed");
          router.replace("profile");
        });
      }
    },
    verifySignature: function(response) {
      axios
        .post(
          "https://us-central1-paostay-test-backend.cloudfunctions.net/paymentApi/confirmPayment",
          response,
          {
            headers: {
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(res => {
          // console.log("PAYMENT RESPONSE",res)
        })
        .catch(err => {
          // console.log('error')
        });
    }
  }
};
</script>
