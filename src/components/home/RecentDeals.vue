<template>
<section class="section recent-deals" id="recent-deals">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="head">
                        <h3>recent deals</h3>
                    </div>
                </div>
                <div class="col-md-3 padding8">
                    <div class="deal figure">
                        <img src="../../assets/image/deal1.png" alt="" class="img-fluid">
                        <div class="deal-details">
                            <span class="deal-offer">Starts from ₹1500</span>
                            <h4 class="hotel-type">premium hotels</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 padding8">
                    <div class="deal figure">
                        <img src="../../assets/image/deal2.png" alt="" class="img-fluid">
                        <div class="deal-details">
                            <span class="deal-offer">Save 30% on</span>
                            <h4 class="hotel-type">budget hotels</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 padding8">
                    <div class="deal figure">
                        <img src="../../assets/image/deal4.png" alt="" class="img-fluid">
                        <div class="deal-details">
                            <span class="deal-offer">Starts from ₹1000</span>
                            <h4 class="hotel-type">couple friendly</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 padding8">
                    <div class="deal figure">
                        <img src="../../assets/image/deal3.png" alt="" class="img-fluid">
                        <div class="deal-details">
                            <span class="deal-offer">Save ₹500</span>
                            <h4 class="hotel-type">hotels with pool</h4>
                        </div>
                    </div>
                </div>
            </div>
            <c-t-a/>
        </div>
    </section>
  
</template>

<script>
import CTA from './CTA.vue';
export default {
    name:'RecentDeals',
    components:{
        CTA
    }
}
</script>

<style>

</style>template