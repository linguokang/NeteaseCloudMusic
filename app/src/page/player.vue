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
      <div class="lyric-holder">
        <div class="lrc-inner" style="transition: -webkit-transform 0.3s ease-out; transform-origin: 0px 0px 0px;" :style="{'transform':' translate3d(0px,'+ lrcOffset +'px, 0px)'}">
          <p v-for="(item, index) in afterLrc" :id="'line-'+index" :key="index">{{item.txt}}</p>
        </div>
      </div>
      <ul class="options">
        <li><img src="../assets/heart.png"></li>
        <li><img src="../assets/download.png"></li>
        <router-link :to="{ path: '/comment', query: { id: this.id,type: 'music' }}">
          <li @click='hideAudio'><img src="../assets/comment.png"></li>
        </router-link>

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
      <source :src='url[0].url' id="source">
    </audio>

  </div>

</template>
<script>
  import { baseUrl } from '../config/env.js'
  import '../config/utils.js'
  export default{
    data(){
      return {
        id: '',
        show: true,
//        show: false,
        progres: 0,
        song: [
          {
            name: "",
            al: {
              picUrl: ''
            },
            ar: [
              {
                name: ''
              }
            ]
          }

        ],
        url: [
          {
            url: ''
          }
        ],
        playing: true,
        currentTime: '',
        afterLrc:[],
        lrcIndex:0
      }
    },
    computed: {
      format(){
        return new Date(this.song[0].dt).Format("mm:ss");
      },
      formatMax(){
        return this.song[0].dt / 1000
      },
      getshowaudioplay(){
        return this.$store.state.com.showaudio
      },
      getsongplayid(){
        return this.$store.state.com.songId
      },
      lrcOffset () {
        if (this.afterLrc&&this.currentTime) {
          // 1、根据时间获得歌词
//          var currentqwe = Math.round(this.currentTime)
//          this.lrcIndex = 0
          const audio = document.getElementById('audio')
          var current = Math.round(audio.currentTime)
          // 2、根据时间得到歌词
          for (var i = 0; i < this.afterLrc.length; i++) {
//            console.log(5555)
//            console.log(this.afterLrc[i].time)
//            console.log(current)
            if (this.afterLrc[i].time === current){
              this.lrcIndex = i
            }
          }

          return -(this.lrcIndex) * 20
        }
      }
    },
    watch: {
      getshowaudioplay(){
        this.show = this.getshowaudioplay
      },
      getsongplayid(){
        this.id = this.getsongplayid
        this.getData()
        this.getUrl()
        this.loadLrc(this.id)
      }
    },
    mounted(){
      this.id = this.$store.state.com.songId
      console.log(this.id)
      this.getData()
      this.getUrl()
      this.loadLrc(this.id)
    },
    activated() {
      this.id = this.$store.state.com.songId
//      console.log(this.id)
      this.getData()
      this.getUrl()
      this.loadLrc(this.id)
    },
    methods: {
      loadLrc (id) {
        this.afterLrc = []
        var self = this
        this.afterLrc = [{'txt': '正在加载中...'}]
        if (!id) {
          this.afterLrc = [{'txt': '这里显示歌词哦！'}]
          return
        }
        const that = this
        this.$http.get(baseUrl + '/lyric?id=' + id)
          .then(function (response) {
            that.afterLrc = response.data.lrc.lyric
            that.parseLyric(that.afterLrc)
          })
          .catch(function (error) {
            console.log(error)
            this.afterLrc = [{'txt': '(⊙０⊙) 暂无歌词'}]
          })

      },
      parseLyric(lrc) {
        if (lrc) {
          var lyrics = lrc.split('\n')
          var lrcObj = []
          /*eslint-disable */
          var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
          /*eslint-enable */
          // 思路：1、把歌词进行处理以时间和歌词组成一个对象，放入afterLrc数组中
          // 2、在computed方法中根据当前的时间进行匹配歌词，然后查找在数据中的位置计算offset值
          for (var i = 0; i < lyrics.length; i++) {
            var timeRegExpArr = lyrics[i].match(timeReg)
            if (!timeRegExpArr) continue
            var txt = lyrics[i].replace(timeReg, '')
            // 处理时间
            for (var k = 0; k < timeRegExpArr.length; k++) {
              var array = {}
              var t = timeRegExpArr[k]
              /*eslint-disable */
              var min = Number(String(t.match(/\[\d*/i)).slice(1))
              var sec = Number(String(t.match(/\:\d*/i)).slice(1))
              /*eslint-enable */
              var time = min * 60 + sec
              array.time = time
              array.txt = txt
              lrcObj.push(array)
            }
          }
          this.afterLrc = lrcObj
          console.log(this.afterLrc)
        }
      },
      formatcurrentTime(){
        const audio = document.getElementById('audio')
        this.currentTime = new Date(audio.currentTime * 1000).Format("mm:ss");
      },
      hideAudio(){
        this.$store.dispatch('showaudioplay', false)
//        console.log(this.$store.state.com.showaudio)
      },
      change(e){
        if (e % 1 === 0) {
          this.setCurTime(e)
        }
      },
      formatTooltip(val) {
        return val / 100;
      },
      getData(){
        const that = this
        this.$http.get(baseUrl + '/song/detail?ids=' + that.id)
          .then(function (response) {
            that.song = response.data.songs
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getUrl(){
        const that = this
        this.$http.get(baseUrl + '/music/url?id=' + that.id)
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
        audio.currentTime = second;
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
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';

  .player {
    position: fixed;
    /*position: absolute;*/
    width: 100%;
    min-height: 100%;
    left: 0;
    top: 0;
    z-index: 1003;
    background: #fff;
    overflow: hidden;
    .bgimg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      min-height: 100%;
      -webkit-filter: blur(20px) grayscale(0.7);
      z-index: -1;
    }
    .header {
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
      .title {
        font-size: px2rem(18px);

        display: flex;
        flex-direction: column;
        span {
          color: #dddddd;
        }
      }
    }
    .content {
      .stick {
        position: relative;
        width: px2rem(170px);
        margin-top: px2rem(-7px);
        margin-left: px2rem(100px);
        z-index: 10;
        transition: all 0.5s;
      }
      .dish_wrap {
        position: relative;
        width: px2rem(285px);
        height: px2rem(285px);
        margin: 0 auto;
        .dish {
          width: 100%;
        }
        .cover {
          position: absolute;
          left: 50%;
          top: 50%;
          margin-left: px2rem(-100px);
          margin-top: px2rem(-100px);
          width: px2rem(200px);
          border-radius: 50%;
        }
      }
      .cdrotate {
        animation: rotating 10s linear .3s infinite
      }
      .active {

        transform: rotate(30deg);
        transform-origin: px2rem(10px) px2rem(10px);
      }
      .lyric-holder{
        height: 60px;
        padding-top: 20px;
        overflow: hidden;
        .lrc-inner{

          p{
            font-size: 12px;
            line-height: 20px;
            height: 20px;
            color: #fff;
          }
        }
      }
      .options {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: px2rem(20px);
        li {
          img {
            width: px2rem(24px);
          }
        }
      }
      .slider {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 90%;
        margin: 0 auto;
        .el-slider {
          width: px2rem(260px);
        }
        span {
          font-size: px2rem(10px);
          color: #eee;
          margin: 0 px2rem(10px);
        }
      }
      .control {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        img {
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

