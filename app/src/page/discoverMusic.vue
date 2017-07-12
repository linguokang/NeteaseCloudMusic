<template>
    <div>
        <headers>
          <search slot="search"></search>
        </headers>
        <ul class="discovermusic_header">
          <li v-for="(item,index) in items" :class="activeNunber == index ? 'active':''" @click='itemclick(index)'>
            <router-link :to="item.router">
              {{ item.message }}
            </router-link>
          </li>
        </ul>
      <keep-alive>
        <router-view></router-view>
        </keep-alive>
        <footers></footers>
    </div>
</template>

<script>
  import footers from '../components/footer.vue'
  import headers from '../components/header.vue'
  import search from '../components/search.vue'
    export default{
        data(){
            return{
              activeNunber:'',
              items: [
                {
                  message: '个性推荐',
                  router:"/",
                },
                {
                  message: '歌单',
                  router:'/songSheet',
                },
                {
                  message: '主播电台',
                  router:'/anchorStation',
                },
                {
                  message: '排行榜',
                  router:'/rankingList',
                }
              ]
            }
        },
        methods: {
          itemclick(index){
            this.activeNunber = index
          },
        },
        components:{
          footers,
          headers,
          search
        }
    }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';

    .discovermusic_header{
      display: flex;
      flex-direction: row;
      overflow: scroll;
      /*border-bottom: 1px solid #f1f1f1;*/
      justify-content: space-between;
      background: #f8f8fa;
      li{
        @include px2rem(font-size,14);
        padding: px2rem(6px) px2rem(10px);
        /*min-width:px2rem(80px) ;*/
      }
      .active{
        border-bottom: 2px solid #d43b33;
        a{
          color: #d43b33;
        }
      }
    }


</style>
