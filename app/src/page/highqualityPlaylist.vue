<template>
  <div class="header">
    <img src="../assets/left_arrow.png" @click='goback()'>
    <div>精品歌单</div>
    <img src="../assets/Playing_now.png" @click='showAudio'>
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
      itemclick(index){
        this.activeNunber = index
      },
      showAudio(){
        this.$store.dispatch('showaudioplay', true)
      },
      goback(){
        this.$router.go(-1)
      }
    },
    components: {}
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.header{
  background: #d43b33;
  @include px2rem(height, 45);
}

</style>

