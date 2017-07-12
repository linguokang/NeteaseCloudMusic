<template>
  <ul class="mv">
    <li v-for='item in items'>
      <img :src="item.picUrl">
      <div>{{item.name}}</div>
      <div>{{item.artistName}}</div>
      <em>
        <img src="../assets/mv.png">
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
        this.$http.get(baseUrl+'/personalized/mv')
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
.mv{
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
      width: 100%;

    }
    div{
      font-size: px2rem(12px);
      text-align: left;
      padding: 0 px2rem(5px);
    }
    div:nth-child(3){
      color: #afafaf;
    }
    em{
      display: flex;
      position: absolute;
      right: px2rem(3px);
      top: px2rem(0px);
      font-size: px2rem(10px);
      color: #e6e6e6;
      font-style: normal;
      align-items: center;
      img{
        width: px2rem(20px);
        margin-right: px2rem(5px);
      }
    }
  }

}

</style>

