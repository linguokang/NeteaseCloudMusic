<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="slide in swiperSlides">
      <img :src="slide.pic">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import Vue from 'vue'
  import { baseUrl } from '../config/env'
//  import VueAwesomeSwiper from 'vue-awesome-swiper'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
//          autoplay: 3500,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
//          mousewheelControl : true,
          observeParents:true,
        },
        swiperSlides: [1, 2, 3, 4, 5]
      }
    },
    mounted() {
      this.init()
    },
    components:{
      swiper,
      swiperSlide
    },
    methods:{
      init(){
        const that = this
        this.$http.get(baseUrl+'/banner')
        .then(function(response){
          that.swiperSlides = response.data.banners
        })
        .catch(function(error){
          console.log(error);
        });
      }
    }
  }
</script>
<style lang="scss">
  @import '../style/mixin';
  .swiper-container{
    height: px2rem(150px);
    .swiper-slide{
      display: flex;
      img{
        width: 100%;
      }
    }
    .swiper-pagination-bullet-active{
      background: #d43b33;
    }
  }


</style>

