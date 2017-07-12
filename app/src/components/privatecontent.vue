<template>
  <ul class="privatecontent">
    <li v-for='item in items'>
      <img :src="item.picUrl">
      <div>{{item.name}}</div>
      <em>
        <img src="../assets/videotape.png">
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

      getData(){
        const that = this
        this.$http.get(baseUrl+'/personalized/privatecontent')
          .then(function(response){
            that.items = response.data.result
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
.privatecontent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  li{
    position: relative;
    width: 49.5%;
    margin-top: px2rem(16px);
    overflow: hidden;
    img{
      width: 150%;
      /*margin: 0 auto;*/
      margin-left: -25%;
    }
    div{
      font-size: px2rem(12px);
      text-align: left;
      padding: 0 px2rem(5px);
    }
    em{
      position: absolute;
      left: px2rem(5px);
      top: px2rem(5px);
      font-size: px2rem(10px);
      color: #fff;
      font-style: normal;
      img{
        width: px2rem(20px);
      }
    }
  }
  li:nth-child(3){
    width: 100%;
    img{
      width: 100%;
      margin-left: 0;
    }
    em{
      img{
        width: px2rem(20px);
      }
    }
  }
}

</style>

