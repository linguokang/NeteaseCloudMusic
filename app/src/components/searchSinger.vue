<template>
  <div class="singer">
    <ul>
      <li v-for="(singer,index) in singers" @click='itemclick(index)'>
        <div>
          <img :src="singer.img1v1Url">
          <div>{{singer.name}}</div>
        </div>
        <div v-if="singer.accountId">
          已入驻
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import qs from 'qs';
  export default{
    data(){
      return {
        activeNunber: '',
        singers:[

        ],

      }
    },
    mounted(){
      this.init()
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
    methods: {
      itemclick(index){
       console.log(index)
      },
      init(){
        const that = this
        console.log(this.$route.query)

        if(!this.$route.query.keywords){
          return false
        }

        this.$http.get('http://localhost:3000/search'+'?type=100&keywords='+this.$route.query.keywords)
          .then(function(response){
//            console.log(response.data.result.artists)
            that.singers = response.data.result.artists
          })
          .catch(function(error){
            console.log(error);
          });
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.singer{
  ul{
    li{
      padding: px2rem(5px);
      padding-bottom: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e2e2;
      div:nth-child(1){
        display: flex;
        flex-direction: row;
        align-items: center;
        img{
          width: px2rem(55px);
          height: px2rem(55px);
        }
        div{
          font-size: px2rem(16px);
          margin-left: px2rem(10px);
          color: #000;
        }
      }
      div:nth-child(2){
        font-size: px2rem(14px);
        color: #858585;
      }
    }
  }
}

</style>

