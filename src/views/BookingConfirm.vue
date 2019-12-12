<template>
  <section class="booking-result">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="top-heading">
            <h2>your booking for 1 night</h2>
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
                  />
                  <div class="custom-control custom-checkbox">
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
                  </div>
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
                    value="bruce@gmail.com"
                    v-model="email"
                  />
                </div>
              </div>
            </form>
            <div class="add-ons">
              <h3>value add-ons</h3>
              <div class="add-ons-details">
                <div class="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="checked"
                    checked
                  />
                  <label
                    class="custom-control-label checkbox-discount mr-left"
                    for="checked"
                  ></label>
                  <span class="discount">50% discount on booking</span>
                  <span class="coupon">"50 OFF" coupon code applied</span>
                </div>
                <a href="#" class="pull-right links">CHANGE</a>
              </div>
              <div class="add-ons-details">
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
              </div>
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
                  {{ dateConvert(checkinDate) }}
                </span>
                <span class="pull-right booking-summary-checkin"
                  >Check in Time: 12:00 PM</span
                >
              </div>
              <div class="checkout-date">
                <i class="far fa-arrow-alt-circle-left btn-arrows"></i>
                <span class="checkin-date-booking-summary">
                  {{ dateConvert(checkoutDate) }}
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
                  adultCount
                }}
                Guest,{{ Math.ceil(dateDifference(checkinDate, checkoutDate)) }}
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
                    <th scope="row"></th>
                    <td class="table-data">booking amount</td>
                    <td class="offers">
                      ₹{{ selectedRoomDetails.price }} X
                      {{ Math.ceil(roomCount) }} Room X
                      {{ Math.ceil(dateDifference(checkinDate, checkoutDate)) }}
                      Days
                    </td>
                    <td class="total-price">
                      ₹{{
                        calculateTotalAmount(
                          selectedRoomDetails.price,
                          Math.ceil(roomCount),
                          Math.ceil(dateDifference(checkinDate, checkoutDate))
                        )
                      }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td class="table-data">price dropped</td>
                    <td class="offers">{{ discount }}% OFF</td>
                    <td class="total-price">
                      -₹{{ Math.ceil(calculateDiscountedAmount()) }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td class="table-data">coupon discount</td>
                    <td class="offers">{{ couponUsed }}</td>
                    <td class="total-price">-₹{{ couponDiscount }}</td>
                  </tr>
                  <tr class="border-last">
                    <!-- <th scope="row"></th>
                    <td colspan="2" class="table-data">pao wallet</td>
                                        <td class="total-price">-₹276</td>-->
                  </tr>
                  <tr>
                    <th scope="row"></th>
                    <td colspan="2" class="total-amount">
                      payable amount
                      <br />
                      <span class="tax-details">(Inclusive of all taxes)</span>
                    </td>
                    <td class="total-amount">₹{{ totalAmountPayable() }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import store from "../store.js";
import router from "../router.js";
import firebase from "firebase";
import axios from 'axios';

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
        };
    },
    components: {

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
        },
        selectedRoomDetails() {
            return store.state.selectedRoomDetails;
        },
    },
    created() {
        this.hotelDetails = store.state.selectedHotel;
        this.bookingDetails;
    },
    methods: {
        dateConvert(date) {
            const monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];
            let conDt = date.getDate() + ", " + monthNames[date.getMonth()] + " " + date.getFullYear() + " ";
            return conDt;
        },
        dateDifference(d1, d2) {
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
            return this.totalAmount * (this.discount / 100)
        },
        totalAmountPayable() {
            return this.totalAmount - this.calculateDiscountedAmount() - this.couponDiscount
        },
        payAtHotel() {
            if (this.username == "" || this.phone == "" || this.email == "") {

                alert("some details are missing")

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
                    paymentType:'at-hotel'
                }
                let bookingRef = firebase.firestore().collection("Booking");
                bookingRef.add(bookingData).then((response) => {
                    console.log(response);
                    alert("booking confirmed")
                    router.replace("profile")

                });

            }

        },
        payNow() {

            var options = {
                "key": "rzp_test_HDcNfetCAuDfcJ", // Enter the Key ID generated from the Dashboard
                "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
                "currency": "INR",
                "name": "Acme Corp",
                "description": "A Wild Sheep Chase is the third novel by Japanese author  Haruki Murakami",
                "image": "https://example.com/your_logo",
                "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
                "handler": function(response) {
                    alert(response.razorpay_payment_id);
                },
                "prefill": {
                    "name": "Gaurav Kumar",
                    "email": "gaurav.kumar@example.com",
                    "contact": "9999999999"
                },
                "notes": {
                    "address": "note value"
                },
                "theme": {
                    "color": "#F37254"
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
        //   .then(data=> console.log(data))

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

     makePayment:function(){
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
      // .catch((err)=>{console.log("ERR",err)});


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

                alert("some details are missing")

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
                    paymentType:'online'
                }
                let bookingRef = firebase.firestore().collection("Booking");
                bookingRef.add(bookingData).then((response) => {
                    console.log(response);
                    alert("booking confirmed")
                    router.replace("profile")

                });

            }

    },
    verifySignature:function(response){
      axios.post('https://us-central1-paostay-test-backend.cloudfunctions.net/paymentApi/confirmPayment'
      ,response,{
        headers:{
            'Access-Control-Allow-Origin':'*'
        }
      }
      )
      .then((res)=>{console.log("PAYMENT RESPONSE",res)})
      .catch((err)=>{console.log('error')})
    }

    }

};
</script>
