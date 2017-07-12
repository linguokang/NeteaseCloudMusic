<template>
  <div class="title">
    <div>{{message}}</div>
    <img src="../assets/arrow.png">
  </div>
</template>
<script>

  export default{
    data(){
      return {
        activeNunber: '',
      }
    },
    props: ['message'],
  }
</script>
<style lang="scss" scoped>
  @import '../style/mixin';
.title{
  display: flex;
  flex-direction: row;
  text-align: left;
  border-left: 2px solid #d63c3c;
  font-size: px2rem(16px);
  padding-left: px2rem(8px);
  align-items: center;
  margin-top: px2rem(20px);
  img{
    height: px2rem(30px);
  }
}

</style>

