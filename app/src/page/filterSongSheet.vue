<template>
  <transition name="fade">
  <div v-show='filterSongSheet' class="filterSongSheet">
      <div class="header">
        <span @click="cancel">取消</span>
        <div>筛选歌单</div>
      </div>
      <div class="content">
        <div class="all">
          <span @click="choose(allSongSheet)" :class="[allSongSheet == getFilterSongSheetKeyword ? 'active':'']">{{allSongSheet}}</span>
        </div>
        <ul class="classify">
          <li class="classify_li" v-for='item in items'>
            <div>
              <img :src="item.img">
              {{item.classify}}
            </div>
            <ul class="branch">
              <li v-for='(item,index) in item.branch' @click="choose(item.name)" :class="[item.name == getFilterSongSheetKeyword ? 'active':'']">
                {{item.name}}
                <img v-if='item.hot' src="../assets/hot.png">
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
  </transition>
</template>

<script>
  import { baseUrl } from '../config/env.js'
  import playlist from '../components/playlist'

  import languages from '../assets/languages.png'
  import style from '../assets/style.png'
  import scene from '../assets/scene.png'
  import feeling from '../assets/feeling.png'
  import theme from '../assets/theme.png'
  export default{
    data(){
      return {
        filterSongSheet:false,
        allSongSheet:'全部歌单',
        items: [
          {
            classify:'语种',
            img:languages,
            branch:[
              {name:'华语',hot:true},
              {name:'欧美'},
              {name:'日语'},
              {name:'韩语'},
              {name:'粤语'},
              {name:'小语种'}
            ]
          },
          {
            classify:'风格',
            img:style,
            branch:[
              {name:'流行',hot:true},
              {name:'摇滚',hot:true},
              {name:'民谣',hot:true},
              {name:'电子',hot:true},
              {name:'舞曲'},
              {name:'说唱'},
              {name:'轻音乐',hot:true},
              {name:'爵士'},
              {name:'乡村'},
              {name:'R&B/Soul'},
              {name:'古典'},
              {name:'民族'},
              {name:'英伦'},
              {name:'金属'},
              {name:'朋克'},
              {name:'蓝调'},
              {name:'雷鬼'},
              {name:'世界音乐'},
              {name:'拉丁'},
              {name:'另类/独立'},
              {name:'New Age'},
              {name:'古风'},
              {name:'后摇'},
              {name:'Bossa Nova'}
            ]
          },
          {
            classify:'场景',
            img:scene,
            branch:[
              {name:'清晨'},
              {name:'夜晚',hot:true},
              {name:'学习',hot:true},
              {name:'工作'},
              {name:'午休'},
              {name:'下午茶'},
              {name:'地铁'},
              {name:'驾车'},
              {name:'运动',hot:true},
              {name:'旅行'},
              {name:'散步'},
              {name:'酒吧'}
            ]
          },
          {
            classify:'感情',
            img:feeling,
            branch:[
              {name:'怀旧',hot:true},
              {name:'清新',hot:true},
              {name:'浪漫'},
              {name:'性感'},
              {name:'伤感'},
              {name:'治愈',hot:true},
              {name:'放松'},
              {name:'孤独'},
              {name:'感动'},
              {name:'兴奋'},
              {name:'快乐'},
              {name:'安静'},
              {name:'思念'}
            ]
          },
          {
            classify:'主题',
            img:theme,
            branch:[
              {name:'影视原声',hot:true},
              {name:'ACG',hot:true},
              {name:'校园'},
              {name:'游戏'},
              {name:'70后'},
              {name:'80后'},
              {name:'90后'},
              {name:'网络歌曲'},
              {name:'KTV'},
              {name:'经典'},
              {name:'翻唱'},
              {name:'吉他'},
              {name:'钢琴'},
              {name:'器乐'},
              {name:'儿童'},
              {name:'榜单'},
              {name:'00后'}
            ]
          },
        ],
      }
    },
    mounted(){
    },
    computed:{
      getFilterSongSheetShow(){
        return this.$store.state.filterSongSheet.show
      },
      getFilterSongSheetKeyword(){
        return this.$store.state.filterSongSheet.keyword
      }
    },
    watch:{
      getFilterSongSheetShow(){
          this.filterSongSheet = this.getFilterSongSheetShow
      }
    },
    methods:{
      choose(tag){
        this.$store.dispatch('setSongSheetKeyword', tag)
        this.cancel()
      },
      cancel(){
        this.$store.dispatch('setSongSheetShow', false)
      }
    },
    components: {
      playlist
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
 .filterSongSheet{
   position: absolute;
   left: 0;
   top: 0;
   z-index: 1000;
   background: #eeeff1;
    .header{
      position: fixed;
      width: 100%;
      background: #d43b33;
      line-height: px2rem(40px);
      display: flex;
      flex-direction: row;
      text-align: center;
      z-index: 1001;
      span{
        position: absolute;
        font-size: px2rem(15px);
        color: #fff;
        left: px2rem(10px);

      }
      div{
        margin: 0 auto;
        font-size: px2rem(18px);
        color: #fff;
      }
    }
   .content{
     padding-top: px2rem(40px);
     .all{
       overflow: hidden;
       background: #fff;
       span{
         display: block;
         font-size: px2rem(18px);
         margin: px2rem(5px);
         border: 1px solid #dadada;
         padding: px2rem(10px) px2rem(0px);
         font-weight: 700;

       }
       .active{
         border: 1px solid red;
         z-index: 10;
       }
     }
     .classify{

       font-size: px2rem(14px);

       .classify_li{
         display: flex;
         flex-direction: row;
         align-items: center;
         margin: px2rem(10px) 0;
         background: #fff;
         justify-content: space-between;
         div{
          flex: 2;
           display: flex;
           flex-direction: column;
           justify-content: center;

           img{
             width:px2rem(30px) ;
             margin: 0 auto;
           }
         }
         .branch{
           flex: 5;
           display: flex;
           flex-direction: row;
           flex-wrap: wrap;
            /*<!--margin-right: -5px;-->*/
           li{
             position: relative;
             display: flex;
             justify-content: center;
             align-items: center;
             width: 33.6%;
             height: px2rem(50px);
              border: 1px solid #eee;
             margin-top: -1px;
             margin-left: -1px;
              img{
                position: absolute;
                left: 0;
                top: 0;
              }
           }
           .active{
             border: 2px solid red;
             z-index: 10;
           }
         }
       }
     }
   }
 }
  .fade-enter-active{
    transition: all .3s ease;
  }
  .fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    transform: translateY(20%);
    opacity: 0
  }
</style>

