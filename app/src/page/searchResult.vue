<template>
  <div class="searchResult">
    <ul>
      <li v-for="(item,index) in items" :class="activeNunber == index ? 'active':''" @click='itemclick(index)'>
        <router-link :to="item.router">
          {{ item.message }}
        </router-link>
      </li>
    </ul>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>

  export default{
    data(){
      return {
        activeNunber:'',
        searchkeyword:'海阔天空',
        items: [
          {
            message: '单曲',
            router:"/search/searchSingle",
            type:1
          },
          {
            message: '歌手',
            router:'/search/searchSinger',
            type:100
          },
          {
            message: '专辑',
            router:'/search/searchAlbum',
            type:10
          },
          {
            message: '歌单',
            router:'/search/searchSingle',
            type:1000
          },
          {
            message: 'MV',
            router:'/search/searchSingle',
            type:1004
          },
          {
            message: '主播',
            router:'/search/searchSingle',
            type:1009
          },
          {
            message: '用户',
            router:'/search/searchSingle',
            type:1002
          }
        ]
      }
    },
    computed:{
      getSearchData() {
        return this.$store.getters.getSearchData.keyword
      }
    },
    watch: {
      getSearchData() {
        this.init()
      }
    },
    mounted(){
     this.init()
    },
    methods: {
      itemclick(index){
        this.activeNunber = index
        this.$store.dispatch('setSearchType',{
          type:this.items[index].type
        })
      },
      init(){
        var that = this
        this.items.map(function (item,index) {
          if(item.router.indexOf('keywords') ==-1){
            item.router += '?keywords='+that.$store.getters.getSearchData.keyword
          }else{
            item.router = item.router.substring(0,item.router.indexOf('=')+1)+that.$store.getters.getSearchData.keyword
          }
        })
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.searchResult{
  ul{
    display: flex;
    flex-direction: row;
    overflow: scroll;
    border-bottom: 1px solid #f1f1f1;
    li{
      @include px2rem(font-size,18);
      padding: px2rem(10px) px2rem(20px);
      min-width:px2rem(80px) ;
    }
    .active{
      border-bottom: 2px solid #d43b33;
      a{
        color: #d43b33;
      }

    }
  }
}

</style>

