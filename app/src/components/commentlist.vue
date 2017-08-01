<template>


</template>
<script>
  import { baseUrl } from '../config/env.js'
  export default{
    data(){
      return {
        activeNunber: '',


      }
    },
    computed:{

    },
    activated(){
      this.id = this.$route.query.id
      this.getData()
      console.log('mounted')
    },
    deactivated: function () {
      console.log(this.$refs.myscroller)
      this.$refs.myscroller.finishInfinite(true)
      console.log('destroyed')
    },
    beforeDestroy(){
//      console.log(this.$refs.myscroller)
//      this.$refs.myscroller.finishInfinite(true)
//      console.log('destroyed')
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

