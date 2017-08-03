<template>
  <div class="Album">
    <ul>
      <li v-for="(album,index) in albums" @click='itemclick(index)'>
        <div>
          <img :src="album.blurPicUrl">
        </div>
        <div>
          <span>{{ album.name }}</span>
          <span>{{ album.artist.name }} {{ album.publishTime }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  import qs from 'qs';
  import '../config/utils'
  import { baseUrl } from '../config/env.js'
  export default{
    data(){
      return {
        activeNunber: '',
        albums:[

        ],
      }
    },
    mounted(){
      this.init()
    },
    computed:{
      getSearchData() {
        return this.$store.getters.getSearchData.keyword
      },
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

        this.$http.get(baseUrl+'/search'+'?type=10&keywords='+this.$route.query.keywords)
          .then(function(response){
//          console.log(response.data.result);
            that.albums = response.data.result.albums
            that.getDate()
          })
          .catch(function(error){
            console.log(error);
          });
      },
      getDate(){
        this.albums.map(function(album){
          album.publishTime = new Date(album.publishTime).Format("yyyy-MM-dd");
        })
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.Album{
  ul{
    li{
      display: flex;
      flex-direction: row;
      padding: px2rem(5px) px2rem(8px);
      border-bottom: 1px solid #dddddd;
      align-items: center;
      div:nth-child(1){
        display: flex;
        align-items: center;
        img{
          width: px2rem(55px);
          height: px2rem(55px);
        }
      }
      div:nth-child(2){
        display: flex;
        flex-direction: column;
        text-align: left;
        margin-left: px2rem(16px);
        span:nth-child(1){
          color: #000;
          font-size: px2rem(18px);
        }
        span:nth-child(2){
          color: #929292;
          font-size: px2rem(12px);

        }
      }
    }
  }
}

</style>

