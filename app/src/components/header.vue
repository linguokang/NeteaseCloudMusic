<template>
  <div class="header">
    <div class="left">

    </div>
    <div class="center">
      <slot name='search'></slot>
    </div>
    <div class="right">
      <slot name='cancel'></slot>
      <img src="../assets/Playing_now.png" @click='showAudio'>
    </div>
  </div>
</template>
<script>

  export default{
    data(){
      return {
        activeNunber: '',
      }
    },
    mounted(){

    },
    methods: {
      showAudio(){
        this.$store.dispatch('showaudioplay', true)
      }
    },
    components: {

    }
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.header{
  display: flex;
  flex-direction: row;
  background: #d43b33;
  @include px2rem(height, 45);
  align-items: center;
  .left{
    flex: 1;
  }
  .center{
    display: flex;
    flex: 3;
    align-items: center;
    @include px2rem(height,30);
    /*vertical-align: middle;*/
  }
  .right{
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    img{
      @include px2rem(width, 25);
      @include px2rem(height, 25);
    }
  }
}

</style>

