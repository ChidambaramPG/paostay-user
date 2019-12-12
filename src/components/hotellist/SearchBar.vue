<template>
  <section class="search-bar">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="filter-data">
            <div class="row">
              <form class="form-inline">
                <div class="col-md-4">
                  <div class="search-location">
                    <i class="fa fa-search search-btn search-blue"></i>
                    <input
                      type="text"
                      name
                      value="alappuzha"
                      v-model="location"
                    />
                  </div>
                  <div class='locaton-list-continer'>
                      <ul class="list-group">
                          <li class="list-group-item" :key="index" v-for="(place,index) in getPlaces.splice(0,5)" @click="() => setLocationFromAutocomplete(place)">{{place}}</li>
                      </ul>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="search-date">
                    <input
                      type="text"
                      :value="
                        formatedDate(getCheckinDate) +
                          '  -  ' +
                          getDateDifference +
                          'N  -   '+
                          formatedDate(getCheckoutDate)
                      "
                    />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="members">
                    <input type="text" :value="adultCount + ' Adult(s)'" />
                  </div>
                </div>
                <div class="col-md-2">
                  <div class="search-btn">
                    <button type="submit" class="btn btn-primary btn-medium" @click="searchHotels">
                      search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      hotels: [],
      checkinDate: new Date(),
      checkoutDate: new Date(),
      roomCount: 0,
      adultCount: 0,
      dateDff: 0,
      location: ""
    };
  },
  computed: {
    getCheckinDate() {
      if (this.$store.state.checkinDate == "") {
        return new Date();
      } else {
        return new Date(this.$store.state.checkinDate);
      }
    },
    getCheckoutDate() {
      if (this.$store.state.checkinDate == "") {
        return new Date();
      } else {
        return new Date(this.$store.state.checkoutDate);
      }
    },
    getAdultCount() {
      return this.$store.state.adultCount;
    },
    getDateDifference() {
      let timeDiff =
        this.getCheckoutDate.getTime() - this.getCheckinDate.getTime();
      let DaysDiff = timeDiff / (1000 * 3600 * 24);
      return Math.floor(DaysDiff);
    },
    getRoomCount() {
      return this.$store.state.roomCount;
    },
    getLocation() {
      this.location = this.$store.state.location
      return this.$store.state.location;
    },

    hotelListFetched: function() {
      return this.$store.state.hotelsList;
    },
    getPlaces(){
      return this.$store.state.allPlaces;
    }
  },
  methods: {
    formatedDate(date) {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return (
        date.getDate() +
        " " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear()
      );
    },
    setLocationFromAutocomplete(place){
      this.location = place;
    }
  }
};
</script>

<style></style>
