<template>
  <ul class="recommendedSongs">
    <li v-for='item in items'>
      <img :src="item.picUrl">
      <div>{{item.name}}</div>
      <em>
        <img src="../assets/headset.png">
        {{item.playCount}}
      </em>
    </li>
  </ul>
</template>
<script>
  import { baseUrl } from '../config/env.js'
  export default{
    data(){
      return {
        items: [

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
      getPlayCount(){
        this.items.map(function(item){
          item.playCount = parseInt(item.playCount/10000)+'万'
        })
      },
      getData(){
        const that = this
        this.$http.get(baseUrl+'/personalized')
          .then(function(response){
            that.items = response.data.result
            that.getPlayCount()
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
.recommendedSongs{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  li{
    position: relative;
    width: 33%;
    margin-top: px2rem(16px);
    img{
      width: 100%;
    }
    div{
      font-size: px2rem(12px);
      text-align: left;
    }
    em{
      position: absolute;
      right: px2rem(5px);
      top: px2rem(0px);
      font-size: px2rem(10px);
      color: #fff;
      font-style: normal;
      img{
        width: px2rem(10px);
      }
    }
  }
}

</style>

