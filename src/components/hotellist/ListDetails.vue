<template>
  <section class="top-text">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="top-head">
              <h3>
                showing
                <span class="common">{{hotelListFetched.length}} hotels</span> in
                <span class="common">{{getSearchLocation}}</span>
              </h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="center-head">
              <h3 class="common">
                home /
                <span class="page">{{getSearchLocation}}</span>
              </h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="sorting-head">
              <h3>
                sort by -
                <span class="common">relevance</span>
                <a href="#" class="sorting">price</a>
                <a href="#" class="sorting">ratings</a>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
    name:'ListDetails',
    data(){
        return {

        }
    },
    computed: {
        hotelListFetched: function() {
            if(this.$store.state.hotelsList.length < 1){
                this.$store.dispatch('fetchAllHotels');
            }
            return this.$store.state.hotelsList;
        },
        getSearchLocation(){
            if(this.$store.state.location == ''){
                return 'All available places'
            }else{
                return this.$store.state.location;
            }
        }
    },
}
</script>

<style>

</style>