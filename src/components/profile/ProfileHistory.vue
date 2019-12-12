<template>
  <div class="col-md-6">
    <div class="booking-history-head">
      <h3>booking history</h3>
    </div>
    <div
      class="booking-history-details"
      v-for="(booking, index) in bookings"
      :key="index"
    >
      <div class="row">
        <div class="col-md-2">
          <div class="single-img">
            <a href="#">
              <img src="../../assets/image/single.png" alt />
            </a>
          </div>
        </div>
        <div class="col-md-5">
          <div class="hotel-img-details">
            <h3>{{ booking.hotelName }}</h3>
            <span class="hotel-address">{{ booking.hotelAddress }}</span>
          </div>
        </div>
        <div class="col-md-5">
          <div class="booking-price">
            <h4>₹{{ booking.totalAmount }}</h4>
            <a href="#" class="view_details pull-right">view details</a>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <div class="hotel-img">
            <input
              type="text"
              :value="
                convertSecondsToFomatedDate(booking.checkinDate.seconds) +
                  ' ' +
                  Math.ceil(
                    dateDifference(
                      convertSecondsToDate(booking.checkinDate.seconds),
                      convertSecondsToDate(booking.checkoutDate.seconds)
                    )
                  ) +
                  'N ' +
                  convertSecondsToFomatedDate(booking.checkoutDate.seconds)
              "
            />
          </div>
        </div>
        <div class="col-md-3">
          <div class="hotel-img">
            <input type="text" :value="booking.adultCount + ' Adults'" />
          </div>
        </div>
        <div class="col-md-2">
          <div class="hotel-img">
            <input type="text" :value="booking.roomCount + 'Room'" />
          </div>
        </div>
      </div>
      <div class="row">
        <button type="submit" class="btn btn-primary profile book-again">
          book again
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: "ProfileHistory",
  data() {
    return {
      bookings: [],

    };
  },
  components: {
    
  },
  methods: {
    convertSecondsToFomatedDate(sec) {
      let dt = this.convertSecondsToDate(sec);
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
        dt.getDate() + " " + monthNames[dt.getMonth()] + " " + dt.getFullYear()
      );
    },
    convertSecondsToDate(sec){
        return new Date(sec * 1000);
    },
    dateDifference(d1, d2) {
      let timeDiff = d2.getTime() - d1.getTime();
      let DaysDiff = timeDiff / (1000 * 3600 * 24);

      return DaysDiff;
    }
  },
  created() {
    firebase
      .firestore()
      .collection("Booking")
      .where("userId", "==", firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        snapshot.forEach(item => {
          // console.log(item.data());
          this.bookings.push(item.data());
        });
      });
  }
};
</script>

<style></style>
