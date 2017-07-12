<template>
  <ul class="newsong">
    <li v-for='song in songs'>
      <img :src="song.song.album.picUrl">
      <div>{{song.name}}</div>
      <div>{{song.song.artists[0].name}}</div>
    </li>
  </ul>
</template>
<script>
  import { baseUrl } from '../config/env.js'
  export default{
    data(){
      return {
        songs: [

        ],
      }
    },
    computed:{

    },
    mounted(){
      this.getData()
    },
    methods: {
      itemclick(index){
//        this.activeNunber = index
      },
      sliceSongs(){
        this.songs = this.songs.slice(0,6)
      },
      getData(){
        const that = this
        this.$http.get(baseUrl+'/personalized/newsong')
          .then(function(response){

            that.songs = response.data.result
            that.sliceSongs()
            console.log(that.songs)
          })
          .catch(function(error){
            console.log(error)
          })
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.newsong{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  li{
    position: relative;
    width: 33%;
    margin-top: px2rem(16px);
    overflow: hidden;
    img{
      width: 100%;
    }
    div{
      font-size: px2rem(12px);
      text-align: left;
      padding: 0 px2rem(5px);
    }
    div:nth-child(3){
      color: #828282;
    }
  }
}

</style>

