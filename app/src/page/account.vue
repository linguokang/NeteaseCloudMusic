<template>
    <div>
        <div>账号</div>
      <footers></footers>
    </div>
</template>
<style>
    body{

    }
</style>
<script>
  import footers from '../components/footer.vue'
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
        components:{
          footers
        }
    }
</script>
