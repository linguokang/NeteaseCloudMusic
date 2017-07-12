<template>
  <div class="single">
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite">
      <ul>
        <li v-for="(item,index) in items" @click='itemclick(index)'>
          <div>
            <span>{{ item.name }}</span>
            <span>{{ item.artists[0].name }}</span>
          </div>
          <div>
            <img src="../assets/play.png">
            <img src="../assets/dot.png">
          </div>
        </li>
      </ul>
    </scroller>

  </div>
</template>
<script>
  import qs from 'qs';
  import VueScroller from 'vue-scroller'
  export default{
    data(){
      return {
        activeNunber: '',
        items:[],
        pages:0
      }
    },
    mounted(){

    },
    computed:{
      getSearchData() {
        return this.$store.getters.getSearchData.keyword
      }
    },
    watch: {
      getSearchData() {
        this.refresh()
      }
    },
    methods: {
      itemclick(index){
       console.log(index)
      },
      init(offset,done){
        const that = this
        console.log(this.$route.query)

        if(!this.$route.query.keywords){
          return false
        }

        this.$http.get('http://localhost:3000/search'+'?keywords='+this.$route.query.keywords+'&offset='+offset)
          .then(function(response){
          console.log(response.data.result);
            if(offset == 0){
              that.items = response.data.result.songs;
            }else{
              that.items = that.items.concat( response.data.result.songs );
            }
            done()
          })
          .catch(function(error){
            console.log(error);
          });
      },
      refresh(done){

        setTimeout(() => {
          console.log('refresh')
        this.pages = 0
        this.init(this.pages,done)
        }, 1500)
      },
      infinite(done){

        setTimeout(() => {
          if(this.$route.path.indexOf('searchSingle')!==-1){
            console.log('infinite')
            this.init(this.pages,done)
            this.pages += 30
          }else{
          done()
        }

      }, 1500)

      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.single{
  position: relative;
  height: px2rem(580px);
  ul{
    li{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: px2rem(5px) px2rem(8px);
      border-bottom: 1px solid #dddddd;
      div:nth-child(1){
        display: flex;
        flex-direction: column;
        text-align: left;
        span:nth-child(1){
          color: #4572a8;
          font-size: px2rem(15px);
        }
        span:nth-child(2){
          color: #929292;
          font-size: px2rem(10px);
        }
      }
      div:nth-child(2){
        display: flex;
        align-items: center;
        img{
          width: px2rem(20px);
          height: px2rem(20px);
          margin-left:px2rem(16px) ;
        }
      }
    }
  }
}

</style>

