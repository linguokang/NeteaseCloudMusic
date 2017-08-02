<template>
  <div class="comment">
    <div class="header">
      <img src="../assets/left_arrow.png" @click='goback()'>
      <div>评论（{{data.total}}）</div>
      <img src="../assets/Playing_now.png">
    </div>
    <!--歌单-->
    <div class="title"  v-if="this.type == 'playlist'">
      <img :src="playlist.coverImgUrl">
      <div class="title_right">
        <span>{{playlist.name}}</span>
        <span>{{playlist.creator.nickname}}</span>
      </div>
    </div>
    <!--歌曲-->
    <div class="title" v-else>
      <img :src="songs[0].al.picUrl">
      <div class="title_right">
        <span>{{songs[0].name}}</span>
        <span>{{songs[0].ar[0].name}}</span>
      </div>
    </div>

    <div class="commentlist">
      <scroller :on-infinite="infinite" ref="myscroller">
        <div class="title">精彩评论</div>
        <ul>
          <li v-for="(comment, index) in data.hotComments">
            <div class="comment_top">
              <div class="comment_author">
                <img :src="comment.user.avatarUrl">
                <div>
                  <span class="name">{{comment.user.nickname}}</span>
                  <span class="time">{{comment.time}}</span>
                </div>
              </div>
              <div class="like">
                <span>{{comment.likedCount}}</span>
                <img src="../assets/like.png">
              </div>
            </div>
            <div class="comment_text">
              {{comment.content}}
            </div>
          </li>
        </ul>
        <div class="title">最新评论</div>
        <ul>
          <li v-for="(comment, index) in data.comments">
            <div class="comment_top">
              <div class="comment_author">
                <img :src="comment.user.avatarUrl">
                <div>
                  <span class="name">{{comment.user.nickname}}</span>
                  <span class="time">{{comment.time}}</span>
                </div>
              </div>
              <div class="like">
                <span>{{comment.likedCount}}</span>
                <img src="../assets/like.png">
              </div>
            </div>
            <div class="comment_text">
              {{comment.content}}
            </div>
          </li>
        </ul>
      </scroller>
    </div>
  </div>
</template>
<script>
  import { baseUrl } from '../config/env.js'
  import commentlist from '../components/commentlist.vue'
  import { Loading } from 'element-ui';
  export default{
    data(){
      return {
        playlist: {
          creator: {
            avatarUrl: "",
            nickname:''
          }
        },
        songs: [
          {
            name: "",
            ar: [
              {
                name: ""
              }
            ],
            al: {
              picUrl: ""
            }
          }
        ],
        coverImgUrl: "",
        id: 705123491,
        offset: 0,
        data: {
          hotComments: [
            {
              user: {
                avatarUrl: '',
                nickname:''
              }
            }
          ],
          comments: [
            {
              user: {
                avatarUrl: '',
                nickname:''
              }
            }
          ]
        },
        loadingInstance:''
      }
    },
    activated(){
      this.loadingInstance = Loading.service({
        fullscreen:false,
        text:'拼命加载中'
      });
      this.id = this.$route.query.id
      this.type = this.$route.query.type
      if (this.type == 'playlist') {
        this.getplaylist()
//        this.getdetailData()
//        this.getplaylistData()
      } else if (this.type == 'music') {
        this.getmusicdetailData()
        this.getmusicData()
      }
      console.log('commentmounted')
    },
    deactivated: function () {
      this.$refs.myscroller.finishInfinite(true)
    },
    methods: {
      async getplaylist() {
        try {
          const v1 = await this.getdetailData();
          const v2 = await this.getplaylistData();
          this.data = v1.data
          this.formattime()
          this.playlist = v2.data.playlist
          this.loadingInstance.close();
        } catch (err) {
          this.loadingInstance.close();
          alert('加载错误')
        }
      },
//      歌单
      getdetailData(){
        const that = this
        const detailData = this.$http.get(baseUrl + '/comment/playlist?id=' + that.id)
        return detailData
//          .then(function (response) {
//            that.data = response.data
////            console.log(that.data)
//            that.formattime()
//          })
//          .catch(function (error) {
//            console.log(error)
//          })
      },
      getplaylistData(){
        const that = this
        const playlistData =  this.$http.get(baseUrl + '/playlist/detail?id=' + that.id)
        return playlistData
//          .then(function (response) {
//            that.playlist = response.data.playlist
//          })
//          .catch(function (error) {
//            console.log(error)
//          })
      },
      getmoreData(done){
        const that = this
        this.$http.get(baseUrl + '/comment/'+this.type+'?id='+that.id+'&offset='+that.offset)
          .then(function (response) {
            if(response.data.comments.length<20){
              done(true)
              return;
            }
            that.data.comments = that.data.comments.concat(response.data.comments)
            that.formattime()
            that.offset++
            done()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
//      歌曲
      getmusicdetailData(){
        const that = this
        this.$http.get(baseUrl + '/comment/music?id=' + that.id)
          .then(function (response) {
            that.data = response.data
            console.log(that.data)
            that.formattime()
            console.log('获取歌曲评论')
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getmusicData(){
        const that = this

        this.$http.get(baseUrl + '/song/detail?ids=' + that.id)
          .then(function (response) {
            that.songs = response.data.songs
            console.log('获取歌曲详情')
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      goback(){
        this.$router.go(-1)
      },
      formattime(){
        this.data.hotComments.forEach(function (hotComment) {
          hotComment.time = new Date(hotComment.time).Format("yyyy-MM-dd hh:mm:ss");
        })
        this.data.comments.forEach(function (comment) {
          comment.time = new Date(comment.time).Format("yyyy-MM-dd hh:mm:ss");
        })
      },
      infinite(done) {
        console.log('infinite')
        this.getmoreData(done)
//        setTimeout(() => {
//          done()
//        }, 1500)
      }
    },
    components: {
//      commentlist
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';

  .comment {
    .header {
      display: flex;
      flex-direction: row;
      background: #d43b33;
      color: #fff;
      justify-content: space-between;
      line-height: px2rem(45px);
      align-items: center;
      padding: 0 px2rem(10px);
      font-size: px2rem(20px);
      img {
        width: px2rem(30px);
        height: 100%;
      }
      div {
        color: #fff;
      }
    }
    .title {
      display: flex;
      flex-direction: row;
      padding: px2rem(10px);
      align-items: center;
      img {
        width: px2rem(80px);
        height: px2rem(80px);
        margin-right: px2rem(10px);
      }
      .title_right {
        display: flex;
        flex-direction: column;
        text-align: left;

        span:nth-child(1) {
          font-size: px2rem(18px);
          color: #000;
          margin-bottom: px2rem(10px);
        }
        span:nth-child(2) {
          font-size: px2rem(10px);
          color: #b0b0b0;
        }
      }
    }
  }

  .commentlist {
    position: relative;
    height: px2rem(520px);
    .title {
      font-size: px2rem(12px);
      background: #eeeff1;
      color: #5d5d5d;
      text-align: left;
      padding: px2rem(5px) px2rem(10px);
    }
    ul {
      li {
        padding: px2rem(10px);
        border-bottom: 1px solid #dadada;
        .comment_top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .comment_author {
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
              width: px2rem(30px);
              /*height: 100%;*/
              height: px2rem(30px);
              border-radius: 50%;
              margin-right: px2rem(10px);
            }
            div {
              display: flex;
              flex-direction: column;
              .name {
                font-size: px2rem(16px);
                text-align: left;
              }
              .time {
                font-size: px2rem(10px);
              }
            }
          }
          .like {
            display: flex;
            align-items: center;
            span {
              font-size: px2rem(12px);
            }
            img {
              width: px2rem(20px);
              height: 100%;
              margin-left: px2rem(5px);
            }
          }
        }
        .comment_text {
          text-align: left;
          margin-left: px2rem(40px);
          font-size: px2rem(14px);
          margin-top: px2rem(10px);
        }
      }
    }
  }


</style>

