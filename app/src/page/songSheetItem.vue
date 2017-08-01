<template>
  <div class="songSheetItem">
    <div class="header_box">
      <img class="bgimg" :src="playlist.coverImgUrl">
      <div class="header">
        <img src="../assets/left_arrow.png" @click='goback()'>
        <div>歌单</div>
        <img src="../assets/Playing_now.png">
      </div>
      <div class="content">
        <div class="songSheetimg">
          <img :src="playlist.coverImgUrl">
          <em>
            <img src="../assets/headset.png">
            {{playlist.playCount}}
          </em>
        </div>
        <div class="songSheetText">
          <span>{{playlist.name}}</span>
          <div>
            <img :src="playlist.creator.avatarUrl">
            {{playlist.creator.nickname}}
            <img src="../assets/arrow.png">
          </div>
        </div>
      </div>
      <ul class="content_bottom">
        <li>
          <img src="../assets/Collection.png">
          <div>{{playlist.subscribedCount}}</div>
        </li>
        <li>
          <router-link :to="{ path: '/comment', query: { id: this.id,type: 'playlist' }}">
          <img src="../assets/comment.png">
          <div>{{playlist.commentCount}}</div>
          </router-link>
        </li>
        <li>
          <img src="../assets/Forward.png">
          <div>{{playlist.shareCount}}</div>
        </li>
        <li>
          <img src="../assets/download.png">
          <div>下载</div>
        </li>
      </ul>
    </div>
    <div class="playList">
      <div class="playList_title">
        <div>
          <img src="../assets/play_2.png">
          <span>播放全部（共{{playlist.trackCount}}首）</span>
        </div>
        <div>
          <img src="../assets/list.png">
          <span>多选</span>
        </div>
      </div>
      <ul class="playList_item">
        <li v-for='(track,index) in playlist.tracks' @click='playsong(track.id)'>
          <div class="left">
            <span class="number">{{index}}</span>
            <div>
              <div class="songname">
                <span>{{track.name}}</span>
                <span v-if='track.tns'>({{track.tns[0]}})</span>
              </div>
              <div class="songer">{{track.ar[0].name}} - {{track.al.name}}</div>
            </div>
          </div>
          <div class="right">
            <img src="../assets/play.png">
            <img src="../assets/dot.png">
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>
<script>
  import { baseUrl } from '../config/env.js'
//  import playlist from '../components/playlist'
  export default{
    data(){
      return {
        id:'',
        playlist: {
          creator: {
            avatarUrl: "",
          },
          coverImgUrl: ""
        },

      }
    },
    activated() {
      this.id = this.$route.query.id
      this.getData()
    },
    mounted(){
//      this.id = this.$route.query.id
//      this.getData()
    },
    methods: {
      playsong(id){
        this.$store.dispatch('showaudioplay', true)
        this.$store.dispatch('setsongId',id)
//                console.log(this.$store.state.com.songId)
      },
      getData(){
        const that = this

        this.$http.get(baseUrl + '/playlist/detail?id='+that.id)
          .then(function (response) {
            that.playlist = response.data.playlist
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      goback(){
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';

  .songSheetItem {
    .header_box{
      position: relative;
      overflow: hidden;
      .bgimg{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        -webkit-filter:blur(20px);
      }
      .header {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: px2rem(5px) 0;
        align-items: center;
        img {
          width: px2rem(30px);
          height: px2rem(30px);
        }
        div {
          font-size: px2rem(18px);
          color: #dddddd;
        }
      }

      .content {
        position: relative;
        padding: px2rem(15px);
        display: flex;
        flex-direction: row;
        align-items: center;
        .songSheetimg {
          flex: 4;
          position: relative;
          width: px2rem(140px);
          height: px2rem(140px);
          img {
            width: 100%;
          }
          em {
            position: absolute;
            display: flex;
            align-items: center;
            right: px2rem(5px);
            top: px2rem(0px);
            font-size: px2rem(12px);
            color: #fff;
            font-style: normal;
            img {
              width: px2rem(13px);
              height: px2rem(13px);
              margin-right: px2rem(5px);
            }
          }
        }
        .songSheetText {
          display: flex;
          flex-direction: column;
          flex: 6;
          text-align: left;
          padding:px2rem(10px);
          span{
            color: #eee;
            font-size: px2rem(18px);
            margin-bottom: px2rem(20px);
          }
          div{
            display: flex;
            color: #eee;
            font-size: px2rem(12px);
            align-items: center;
            img{
              width: px2rem(30px);
              border-radius: 50%;
              margin-right: px2rem(5px);
            }
          }
        }
      }
      .content_bottom{
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: px2rem(5px);
        li{
          img{
            width: px2rem(22px);
          }
          div{
            font-size: px2rem(12px);
            color: #eee;
          }
        }
      }

    }
    .playList{
      padding: px2rem(10px);
      padding-top: 0;
      .playList_title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: px2rem(10px) 0;
        div{
          display: flex;
          align-items: center;
          img{
            width: px2rem(25px);
            margin-right: px2rem(5px);
          }
          span{
            font-size: px2rem(15px);
          }
        }
      }
      .playList_item{
        li{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-top: 1px solid #cdcdcd;
          padding: px2rem(5px) 0;
          .left{
            display: flex;
            flex-direction: row;
            text-align: left;
            align-items: center;
            .number{
              width: px2rem(32px);
              text-align: center;
              color: #666666;
              font-size: px2rem(14px);
            }
            div{
              .songname{
                font-size: px2rem(15px);
                span:nth-child(1){
                  color: #000;
                }
                span:nth-child(2){
                  color: #848484;
                }
              }
              .songer{
                font-size: px2rem(12px);
                color: #8e8e8e;
              }
            }
          }
          .right{
            display: flex;
            flex-direction: row;
            align-items: center;
            img{
              margin-left: px2rem(10px);
              width: px2rem(20px);
              height: px2rem(20px);
            }
          }
        }
      }
    }
  }


</style>
