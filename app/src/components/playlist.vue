<template>
  <div class="content">
    <div class="title">
      <div class="title_left" @click='showfilterSongSheet'>
        <div>{{getFilterSongSheetKeyword}}</div>
        <img src="../assets/arrow.png">
      </div>
      <ul class="title_right">
        <li v-for='hot in hots' @click='chooseTag(hot.name)'>{{hot.name}}</li>
        <!--<li>欧美</li>-->
        <!--<li>电子</li>-->
        <!--<li>轻音乐</li>-->
      </ul>
    </div>
    <ul class="recommendedSongs">
      <li v-for='(item,index) in items' @click='intodetial(index)'>
        <div class="item_content">
          <img :src="item.coverImgUrl">
          <em>
            <img src="../assets/headset.png">
            {{item.playCount}}
          </em>
          <i>
            <img src="../assets/personl.png">
            {{item.creator.nickname}}
          </i>
        </div>
        <div class="playlist_name">{{item.name}}</div>

      </li>
    </ul>
  </div>
</template>
<script>
  import { baseUrl } from '../config/env.js'
  export default{
    data(){
      return {
        items: [],
        page:10,
        cat:'全部',
        hots:[
          {name:'欧美'},
          {name:'电子'},
          {name:'轻音乐'}
        ]
      }
    },
    computed:{
      getFilterSongSheetKeyword(){
        return this.$store.state.filterSongSheet.keyword
      }
    },
    watch:{
      getFilterSongSheetKeyword(){
        this.cat = this.getFilterSongSheetKeyword
        this.items = []
        this.page = 10
      }
    },
    mounted(){
//      this.getData()
      this.$nextTick(function () {
        this.$on('childMethod', function (done) {
          this.getData(done)
        })
      })
    },
    methods: {
      intodetial(index){
        this.$router.push('/songsheetItem?id='+this.items[index].id)
      },
      chooseTag(name){
        this.$store.dispatch('setSongSheetKeyword', name)
      },
      showfilterSongSheet(){
        this.$store.dispatch('setSongSheetShow',true)
      },
      itemclick(index){
//        this.activeNunber = index
      },
      getPlayCount(){
        this.items.map(function(item){
          item.playCount = parseInt(item.playCount/10000)+'万'
        })
      },
      getData(done){
        const that = this
        this.$http.get(baseUrl+'/top/playlist?limit='+this.page+'&cat='+this.cat)
          .then(function(response){
            that.items = response.data.playlists
            that.getPlayCount()
            that.page += 10
            done()
          })
          .catch(function(error){
            console.log(error)
          })
      },
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.content{
  .title{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: px2rem(20px) px2rem(10px);
    align-items: center;
    .title_left{
      display: flex;
      flex-direction: row;
      font-size: px2rem(14px);
      border-radius: px2rem(15px);
      border: 1px solid #959595;
      padding: px2rem(0px) px2rem(20px);
      padding-right: px2rem(10px);
      align-items: center;
      img{
        width: px2rem(30px);
        height: px2rem(30px);
      }
    }
    .title_right{
      display: flex;
      flex-direction: row;
      font-size: px2rem(16px);
      color: #c4c4c4;
      li{
        font-size: px2rem(16px);
        line-height: px2rem(18px);
        padding:0 px2rem(5px);

      }
      li:not(:last-child){
        border-right: 1px solid #c4c4c4;
      }

    }
  }
}
  .recommendedSongs{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
      position: relative;
      width: 49.5%;
      margin-top: px2rem(16px);
      .playlist_name{
        font-size: px2rem(14px);
        text-align: left;
        padding: 0 px2rem(5px);
      }
      .item_content{
        position: relative;
        img{
          width: 100%;
        }

        em{
          position: absolute;
          display: flex;
          align-items: center;
          right: px2rem(5px);
          top: px2rem(0px);
          font-size: px2rem(12px);
          color: #fff;
          font-style: normal;
          img{
            width: px2rem(13px);
            margin-right: px2rem(5px);
          }
        }
        i{
          position: absolute;
          display: flex;
          left: px2rem(5px);
          bottom: px2rem(8px);
          color: #cccccc;
          align-items: center;
          font-size: px2rem(12px);
          img{
            width: px2rem(16px);
            margin-right: px2rem(5px);
          }
        }
      }

    }
  }
</style>

