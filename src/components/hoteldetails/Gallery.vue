<template>
    <div>
    	<div class="row">
    		<div class="col-md-12">
    			<img v-if="selectedImage != ''" :src="selectedImage" alt="image1" class="hotel-image"/>
    			<img v-else src="../../assets/image/hotel.png" alt="image1" class="hotel-image"/>
    		</div>
    	</div>
    	<div class="row">
    		<div class="col-md-3 " v-for="(image,index) in images" v-if="index < 4">
    			<img :src="image.data" alt="image1" class="hotel-preview-image" />
    		</div> 
    		<!-- <div class="col-md-3 " v-for="(image,index) in images" v-if="index >= 4">
    			<img :src="image.data" alt="image1" class="hotel-preview-image" />
    		</div>  -->   		
    	</div>
    </div>
    
</template>

<script>

import firebase from 'firebase';

	export default {

		name:"Gallery",
		data(){
			return{

				hotel:[],
				selectedImage:"",
				images:[]

			};
		},

		created(){

			this.hotel = this.$store.state.selectedHotel
			firebase.firestore()
		    .collection("RoomImages")
		    .where("hotelId","==",this.hotel.uid)
		    .get()
		    .then( snapshot => {

		    	// console.log(snapshot)

		      this.images = []

		      if(!snapshot.empty){

		      	snapshot.forEach( img => {
			        // console.log(img)
			        
			        let dt = img.data();
			        this.images.push(dt)
			    })
			    this.selectedImage = this.images[0].data;

		      }else{
		      	this.selectedImage = ""
		      }
		      
		    })
		},


	};

</script>

<style>
	.hotel-image{
		width:100%;
	}
	.hotel-preview-image{
		width:100%;
		padding:2px;
	}

</style>

