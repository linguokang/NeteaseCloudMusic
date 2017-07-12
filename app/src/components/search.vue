<template>
  <div class="search">
    <router-link :to="this.router">
      <input type="text" placeholder="搜索音乐、歌词、电台" @keyup.enter="search" v-model="inputkeyword" @click='getRoute'>
    </router-link>
  </div>
</template>
<script>
 import router from '../router/index'
  export default{
    data(){
      return {
        inputkeyword: '',
        router:''
      }
    },
    conputed:{

    },
    mounted(){
      this.getRoute()
    },
    methods: {
      search(){
//        console.log(this.$store)
        this.$store.dispatch('setSearchInfo', {
          keyword: this.inputkeyword
        })
        console.log(this.$store.getters.getSearchData.keyword)
        this.getRoute()
        console.log(this.router)
//        this.$router.push('/search/searchSingle?keywords='+this.$store.getters.getSearchData.keyword)
        this.$router.push(this.router)
//        this.$router.go(0)
//        window.location.reload();

      },
      getRoute(){
        const type = this.$store.getters.getSearchType.type||1
        console.log(type)
        const keyword = this.$store.getters.getSearchData.keyword||''
        console.log(keyword)
        if(type==1){
          this.router = '/search/searchSingle?keywords='+keyword
        }
        if(type==10){
          this.router = '/search/searchAlbum?keywords='+keyword
        }
        if(type==100){
          this.router = '/search/searchSinger?keywords='+keyword
        }
        if(type==1000){
          this.router = '/search/searchSingle?keywords='+keyword
        }
        if(type==1004){
          this.router = '/search/searchSingle?keywords='+keyword
        }
        if(type==1009){
          this.router = '/search/searchSingle?keywords='+keyword
        }
        if(type==1002){
          this.router = '/search/searchSingle?keywords='+keyword
        }
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
  .search{
    display: flex;
    align-items: center;
    flex: 1;
    background: #fff;
    @include px2rem(border-radius,15);
    a{
      display: flex;
      flex: 1;
      @include px2rem(height,30);
      align-items: center;
    }
    input{
      flex: 1;
      @include px2rem(height,30);
      @include px2rem(padding-left,50);
      background: url(../assets/search.png) no-repeat 1rem center;
      @include px2rem(background-size,18);
      color: #cdcdcd;
    }
  }

</style>

