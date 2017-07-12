<template>
  <div class="">
    <headers>
      <search slot="search"></search>
      <div class="cancel" slot="cancel">
        <router-link to="/">取消</router-link>
      </div>
    </headers>
    <searchResult></searchResult>
    <footers></footers>
  </div>
</template>
<script>
  import headers from '../components/header.vue'
  import search from '../components/search.vue'
  import searchResult from './searchResult.vue'
  import footers from '../components/footer.vue'
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
      }
    },
    components: {
      headers,
      search,
      searchResult,
      footers
    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.header{
  background: #d43b33;
  @include px2rem(height, 45);
  .cancel{
    @include px2rem(font-size,16);
    @include px2rem(margin-right,10);
    a{
      color: #fff;
    }
  }
}

</style>

