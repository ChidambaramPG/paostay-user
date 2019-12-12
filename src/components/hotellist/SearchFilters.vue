<template>
  <section class="result-page">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <div class="filter">
              <div class="filter-details">
                <form action>
                  <div class="filter-head">
                    <h3>
                      search filters
                      <img
                        src="../../assets/image/icon-filter.png"
                        alt
                        class="pull-right"
                      />
                    </h3>
                  </div>
                  <div class="filter-headings localities">
                    <h3>popular localities</h3>
                  </div>
                  <div class="search-localities">
                    <i class="fa fa-search search-btn search-grey"></i>
                    <input type="text" name placeholder="search locations" />
                  </div>
                  <div class="location-names">
                    <ul class="location-list">
                      <a href="#" class="city-names" v-for="(location,index) in getLocations" :key='index'>
                        <li>{{location}}</li>
                      </a>
                    </ul>
                  </div>
                  <div class="filter-headings">
                    <h3>hotel facilities</h3>
                  </div>
                  <div class="hotel-facilities">
                    <label class="checkbox" v-for="(amnty,index) in getAmenities" :key="index">
                      <input type="checkbox" @click="(event) => addAmenityToFilter(amnty.id,event)"/>
                      <span class="main">{{amnty.id}}</span>
                    </label>
                    
                  </div>
                  <div class="filter-headings">
                    <h3>price</h3>
                  </div>
                  <div class="filter-price">
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">below ₹899</span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">₹900 - ₹1499</span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">above ₹1500</span>
                    </label>
                  </div>
                  <div class="filter-headings">
                    <h3>hotel rating</h3>
                  </div>
                  <div class="hotel-rating">
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">
                        <span class="fa fa-star checked"></span>
                      </span>
                    </label>
                  </div>
                  <!-- <div class="filter-headings">
                    <h3>accomodation type</h3>
                  </div>
                  <div class="accomodation">
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">hotel</span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">lodge</span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">guest house</span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">bar</span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">bnb</span>
                    </label>
                    <label class="checkbox">
                      <input type="checkbox" />
                      <span class="main">resort</span>
                    </label>
                  </div> -->
                  <div>
                    <button class="btn btn-info btn-block" @click.prevent="filterHotels">Apply</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- ........................................ -->
          <all-hotels/>
        </div>
      </div>
    </section>
</template>

<script>
import AllHotels from './AllHotels.vue';
import store from '../../store.js';
import firebase from 'firebase';
export default {
    name:'SearchFilters',
    components:{
        AllHotels
    },
    data(){
      return{
        amenities:[],
        filterAmenities:[]
      }
    },
    created(){
      // store.dispatch('fetchAmenities');
      let temp = []
      firebase.firestore().collection('Amenities').get().then( response => {
        console.log(response.docs)
        response.docs.forEach(doc => {
          temp.push({id:doc.id,data:doc.data()});
        });
        this.amenities = temp;
        // state.commit('setAmenities',temp);
      })
    },
    computed: {
        getLocations(){
            return [...new Set(store.state.allLocations)];
        },
        getAmenities(){
          return this.amenities.splice(0,4);
        },
        
    },
    methods: {
      addAmenityToFilter(amnty,event){
        console.log(event)
        let itemPresent = false;
        let temp = []
        

        if(event.target.checked == false){
          this.filterAmenities.forEach(item => {
            if(amnty == item){

            }else{
              temp.push(item)
            }
          })
          this.filterAmenities = temp;
        }else{

          this.filterAmenities.push(amnty)
          this.filterAmenities = [...new Set(this.filterAmenities)]

        }

        // this.filterAmenities = temp;
        // this.filterAmenities.push(amnty)
      },
      filterHotels(){
        store.commit('filterHotels',{
          'amenity':this.filterAmenities,
        })
      }
    },
    
}
</script>

<style>

</style>