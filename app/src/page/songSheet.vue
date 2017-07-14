<template>
  <div class="scroller_box">
    <scroller
      :on-infinite="infinite">
      <div>
        <img class="bgimg" :src="this.playlists[0].coverImgUrl">
        <div class="fineSong">
          <img :src="this.playlists[0].coverImgUrl">
          <div class="fineSong_right">
        <span>
          <img src="../assets/crown.png">
          <div>精品歌单</div>
          <img src="../assets/arrow.png">
        </span>
            <div class="title">{{playlists[0].name}}</div>
            <span>{{playlists[0].copywriter}}</span>
          </div>
        </div>
      </div>
      <playlist ref="child"></playlist>
    </scroller>

  </div>



</template>

<script>
  import { baseUrl } from '../config/env.js'
  import playlist from '../components/playlist'
  export default{
    data(){
      return {
        playlists: [
          {
          coverImgUrl:'',
            name:'',
            copywriter:''
          }
        ],
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        const that = this
        this.$http.get(baseUrl+'/top/playlist/highquality?limit=1')
          .then(function(response){
            that.playlists = response.data.playlists
          })
          .catch(function(error){
            console.log(error)
          })
      },


      infinite(done) {
//        setTimeout(() => {
          if(this.$route.path.indexOf('songSheet')!==-1){
      console.log('infinite')
      this.$refs.child.$emit('childMethod',done) // 方法1
//      done()
      }else{
      done()
    }
//      }, 1500)
      },
    },
    components: {
      playlist
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  .scroller_box{
    height: px2rem(530px);
    /*padding-bottom: px2rem(63px);*/
  }
  div{
    position: relative;
    overflow: hidden;
    .bgimg{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      -webkit-filter:blur(5px);
    }
    .fineSong {
      padding:px2rem(20px) px2rem(15px) ;
      display: flex;
      flex-direction: row;
      img {
        width: px2rem(100px);
        height: px2rem(100px);
      }
      .fineSong_right{
        margin-left: px2rem(10px);
        span{
          display: flex;
          align-items: center;
          img {
            width: px2rem(40px);
            height: px2rem(40px);
          }
          div{
            font-size: px2rem(20px);
            color: #fff;
          }
        }
        .title{
          font-size: px2rem(16px);
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          width: px2rem(230px);
          line-height: px2rem(30px);
          color: #fff;
        }
        span:nth-child(3){
          font-size: px2rem(14px);
          color: #d5d5e4;
        }
      }
    }
  }

</style>
