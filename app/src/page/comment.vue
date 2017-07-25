<template>
  <div class="comment">
    <div class="header">
      <img src="../assets/left_arrow.png">
      <div>评论（8544）</div>
      <img src="../assets/Playing_now.png">
    </div>
    <div class="title">
      <img src="../assets/Playing_now.png">
      <div class="title_right">
        <span>林肯公园</span>
        <span>by weiphenEDN</span>
      </div>
    </div>
    <commentlist></commentlist>
    <div></div>
  </div>
</template>
<script>
  import commentlist from '../components/commentlist.vue'
  export default{
    data(){
      return {
        activeNunber: '',

      }
    },
    mounted(){

    },
    methods: {
      itemclick(index){
        this.activeNunber = index
      },

    },
    components: {
      commentlist
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  .comment{
    .header{
      display: flex;
      flex-direction: row;
      background: #d43b33;
      color: #fff;
      justify-content: space-between;
      line-height: px2rem(45px);
      align-items: center;
      padding: 0 px2rem(10px);
      font-size: px2rem(20px);
      img{
        width: px2rem(30px);
        height: 100%;
      }
      div{
        color: #fff;
      }
    }
    .title{
      display: flex;
      flex-direction: row;
      padding: px2rem(10px);
      align-items: center;
      img{
        width:px2rem(80px) ;
        height: 100%;
        margin-right: px2rem(10px);
      }
      .title_right{
        display: flex;
        flex-direction: column;
        text-align: left;

        span:nth-child(1){
          font-size: px2rem(18px);
          color: #000;
          margin-bottom: px2rem(10px);
        }
        span:nth-child(2){
          font-size: px2rem(10px);
          color: #b0b0b0;
        }
      }
    }
  }


</style>

