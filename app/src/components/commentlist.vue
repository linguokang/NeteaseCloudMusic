<template>
  <div class="commentlist">
    <scroller :on-infinite="infinite" ref="my_scroller">
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

</template>
<script>
  import { baseUrl } from '../config/env.js'
  export default{
    data(){
      return {
        activeNunber: '',
        id:705123491,
        offset:0,
        data:{
          hotComments:[
            {
              user: {
                avatarUrl: ''
              }
            }
          ],
          comments:[
            {
              user: {
                avatarUrl: ''
              }
            }
          ]
        }
      }
    },
    computed:{

    },
    mounted(){
      this.getData()
    },
    methods: {
      itemclick(index){
        this.activeNunber = index
      },
      getData(){
        const that = this
        this.$http.get(baseUrl + '/comment/playlist?id='+that.id)
          .then(function (response) {
            that.data = response.data
            console.log(that.data)
            that.formattime()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      getmoreData(done){
        const that = this
        this.$http.get(baseUrl + '/comment/playlist?id='+that.id+'&offset='+that.offset)
          .then(function (response) {
            that.data.comments = that.data.comments.concat(response.data.comments)
            that.formattime()
            console.log(that.data)
            done()
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      formattime(){
        this.data.hotComments.forEach(function(hotComment){
          hotComment.time = new Date(hotComment.time).Format("yyyy-MM-dd hh:mm:ss");
        })
        this.data.comments.forEach(function(comment){
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
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.commentlist{
  position: relative;
  height: px2rem(520px);
  .title{
    font-size: px2rem(12px);
    background: #eeeff1;
    color: #5d5d5d;
    text-align: left;
    padding: px2rem(5px) px2rem(10px);
  }
  ul{
    li{
      padding: px2rem(10px);
      border-bottom: 1px solid #dadada;
      .comment_top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .comment_author{
          display: flex;
          flex-direction: row;
          align-items: center;
          img{
            width: px2rem(30px);
            /*height: 100%;*/
            height: px2rem(30px);
            border-radius: 50%;
            margin-right: px2rem(10px);
          }
          div{
            display: flex;
            flex-direction: column;
            .name{
              font-size: px2rem(16px);
              text-align: left;
            }
            .time{
              font-size: px2rem(10px);
            }
          }
        }
        .like{
          display: flex;
          align-items: center;
          span{
            font-size: px2rem(12px);
          }
          img{
            width: px2rem(20px);
            height: 100%;
            margin-left: px2rem(5px);
          }
        }
      }
      .comment_text{
        text-align: left;
        margin-left: px2rem(40px);
        font-size: px2rem(14px);
        margin-top: px2rem(10px);
      }
    }
  }
}

</style>

