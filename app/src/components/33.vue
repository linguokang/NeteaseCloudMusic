<template>
  <div class="header">
    <div>12344</div>
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

