<template>
  <div v-show='show' class="player">
    <img class="bgimg" :src="song[0].al.picUrl">
    <div class="header">
      <img src="../assets/left_arrow.png" @click='hideAudio'>
      <div class="title">
        <span>{{song[0].name}}</span>
        <span>{{song[0].ar[0].name}}</span>
      </div>
      <img src="../assets/Playing_now.png">
    </div>
    <div class="content">
      <img :class="[{ active: playing }, 'stick']" src="../assets/stick.png">
      <div :class="[{ cdrotate: playing }, 'dish_wrap']">
        <img class="dish" src="../assets/dish.png">
        <img class="cover" :src="song[0].al.picUrl">
      </div>
      <ul class="options">
        <li><img src="../assets/heart.png"></li>
        <li><img src="../assets/download.png"></li>
        <li><img src="../assets/comment.png"></li>
        <li><img src="../assets/dot.png"></li>
      </ul>
      <div class="slider">
        <!--<span>{{currentTime}}</span>-->
        <span>{{currentTime}}</span>
        <el-slider v-model="progres" @change='change' :min="0" :max="formatMax"></el-slider>
        <span>{{format}}</span>
      </div>
      <div class="control">
        <img src="../assets/pre.png" @click='pre'>
        <img src="../assets/play_3.png" @click='toggleplay'>
        <img src="../assets/next.png" @click='next'>
      </div>
    </div>

    <audio controls autoplay="autoplay" id="audio" :src='url[0].url' :style="{ display: 'none'}"
           @timeupdate="timeupdate"
           @playing="playing"
           @pause="pause"
           @ended="ended"
           @waiting="waiting"
           @error="error">
      <source :src='url[0].url'  id="source">
    </audio>

  </div>

</template>
<script>
  import { baseUrl } from '../config/env.js'
  import '../config/utils.js'
  export default{
    data(){
      return {
        id:'',
        show: true,
//        show: false,
        progres: 0,
        song:[
          {
            name: "",
            al:{
              picUrl:''
            },
            ar:[
              {
                name:''
              }
            ]
          }

        ],
        url:[
          {
            url:''
          }
        ],
        playing:true,
        currentTime:''
      }
    },
    computed: {
      format(){
        return new Date(this.song[0].dt).Format("mm:ss");
      },
      formatMax(){
        return this.song[0].dt/1000
      },
      getshowaudioplay(){
        return this.$store.state.com.showaudio
      },
      getsongplayid(){
        return this.$store.state.com.songId
      },
    },
    watch:{
      getshowaudioplay(){
        this.show = this.getshowaudioplay
      },
      getsongplayid(){
        this.id = this.getsongplayid
        this.getData()
        this.getUrl()
      }
    },
    mounted(){
      this.id = this.$store.state.com.songId
      console.log(this.id)
      this.getData()
      this.getUrl()
    },
    activated() {
      this.id = this.$store.state.com.songId
      this.getData()
      this.getUrl()
    },
    methods: {
      formatcurrentTime(){
        const audio = document.getElementById('audio')
        this.currentTime = new Date(audio.currentTime*1000).Format("mm:ss");
      },
      hideAudio(){
        this.$store.dispatch('showaudioplay', false)
//        console.log(this.$store.state.com.showaudio)
      },
      change(e){
        if(e%1 === 0 ){
            this.setCurTime(e)
        }
      },
      formatTooltip(val) {
        return val / 100;
      },
      getData(){
        const that = this
        this.$http.get(baseUrl + '/song/detail?ids='+that.id)
          .then(function (response) {
            that.song = response.data.songs
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getUrl(){
        const that = this
        this.$http.get(baseUrl + '/music/url?id='+that.id)
          .then(function (response) {
            that.url = response.data.data
            console.log(that.url)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      setCurTime(second){
        const audio = document.getElementById('audio')
        audio.currentTime=second;
      },
      toggleplay(){
        if (this.playing === true) {
          document.getElementById('audio').pause();
          this.playing = false;
        } else {
          document.getElementById('audio').play();
          this.playing = true;
        }
      },
      pre(){

      },
      next(){

      },
      timeupdate (e) {
        const audio = document.getElementById('audio')
        this.progres = audio.currentTime
        this.formatcurrentTime()
      },
      playing (e) {
        console.log('playing')
      },
      pause (e) {
        console.log('pause')
      },
      ended (e) {
        console.log('ended')
      },
      waiting (e) {
        console.log('waiting')
      },
      error (e) {
        console.log('error')
      }
    },
    components: {

    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  .player{
    position: fixed;
    /*position: absolute;*/
    width: 100%;
    min-height: 100%;
    left: 0;
    top: 0;
    z-index: 1003;
    background: #fff;
    overflow: hidden;
    .bgimg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      min-height: 100%;
      -webkit-filter:blur(20px) grayscale(0.7);
      z-index: -1;
    }
    .header{
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: px2rem(5px) 0;
      align-items: center;
      border-bottom: 1px solid #eee;
      img {
        width: px2rem(30px);
        height: px2rem(30px);
      }
      .title{
        font-size: px2rem(18px);

        display: flex;
        flex-direction: column;
        span{
          color: #dddddd;
        }
      }
    }
    .content{
      .stick{
        position: relative;
        width: px2rem(170px);
        margin-top: px2rem(-7px);
        margin-left: px2rem(100px);
        z-index: 10;
        transition: all 0.5s;
      }
      .dish_wrap{
        position: relative;
        width: px2rem(285px);
        height: px2rem(285px);
        margin: 0 auto;
        .dish{
          width: 100%;
        }
        .cover{
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: px2rem(-100px);
          margin-top: px2rem(-100px);
          width: px2rem(200px);
          border-radius: 50%;
        }
      }
      .cdrotate{
        animation: rotating 10s linear .3s infinite
      }
      .active{

        transform:rotate(30deg);
        transform-origin: px2rem(10px) px2rem(10px);
      }
      .options{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: px2rem(70px);
        li{
          img{
            width: px2rem(24px);
          }
        }
      }
      .slider{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        .el-slider{
          width: px2rem(260px);
        }
        span{
          font-size: px2rem(10px);
          color: #eee;
          margin: 0 px2rem(10px);
        }
      }
      .control{
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        img{
          width: px2rem(33px);
          height: 100%;
        }
      }
    }

  }
  @keyframes rotating {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

</style>

