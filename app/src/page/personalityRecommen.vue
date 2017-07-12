<template>
    <div>
      <swipers></swipers>
      <ul class="navlist">
        <li>
          <img src="../assets/fm.png">
          <div>私人FM</div>
        </li>
        <li>
          <img src="../assets/recommend.png">
          <div>开启个性推荐</div>
        </li>
        <li>
          <img src="../assets/rankinglist .png">
          <div>云音乐热歌榜</div>
        </li>
      </ul>
      <recommendTitle message='推荐歌单'></recommendTitle>
      <recommendedSongs></recommendedSongs>
      <recommendTitle message='独家放送'></recommendTitle>
      <privatecontent></privatecontent>
      <recommendTitle message='最新音乐'></recommendTitle>
      <newsong></newsong>
      <recommendTitle message='推荐MV'></recommendTitle>
      <mv></mv>
      <recommendTitle message='精选专栏'></recommendTitle>
      <recommendTitle message='主播电台'></recommendTitle>
    </div>
</template>

<script>
    import swipers from '../components/swiper'
    import recommendTitle from '../components/recommendTitle'
    import recommendedSongs  from '../components/recommendedSongs'
    import privatecontent  from '../components/privatecontent'
    import newsong  from '../components/newsong'
    import mv  from '../components/mv'
    export default{
        data(){
            return{

            }
        },
        components:{
          swipers,
          recommendTitle,
          recommendedSongs,
          privatecontent,
          newsong,
          mv
        }
    }
</script>
<style lang="scss" scoped>
  @import "../style/mixin";
  .navlist{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: px2rem(15px) 0;
    border-bottom: 1px solid #dfdfdf;
    li{
      font-size: px2rem(12px);
      color: #858585;
    }
  }
</style>
