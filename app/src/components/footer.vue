<template>
  <div class="footer">
    <ul>
      <li v-for="(item, index) in items" :class="activeNunber == index ? 'active':''" @click='itemclick(index)'>
        <router-link :to="item.router" exact>
          <img :src="[activeNunber == index ? item.imgSrc_active : item.imgSrc]">
          <div>{{item.text}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
  const discover_music_icon = require('../assets/discover_music_icon.png')
  const discover_music_icon_active = require('../assets/discover_music_icon_active.png')
  const myMusic_icon = require('../assets/myMusic_icon.png')
  const myMusic_icon_active = require('../assets/myMusic_icon_active.png')
  const friends_icon = require('../assets/friends_icon.png')
  const friends_icon_active = require('../assets/friends_icon_active.png')
  const personal_icon = require('../assets/personal_icon.png')
  const personal_icon_active = require('../assets/personal_icon_active.png')
  export default{
    data(){
      return {
        activeNunber: '',
       items: [
         {
           router: '/',
           imgSrc:discover_music_icon,
           imgSrc_active:discover_music_icon_active,
           text:'发现音乐'
         },
         {
           router: '/myMusic',
           imgSrc:myMusic_icon,
           imgSrc_active:myMusic_icon_active,
           text:'我的音乐'
         },
         {
           router: '/friends',
           imgSrc:friends_icon,
           imgSrc_active:friends_icon_active,
           text:'朋友'
         },
         {
           router: '/account',
           imgSrc:personal_icon,
           imgSrc_active:personal_icon_active,
           text:'账号'
         },
       ]
      }
    },
    mounted(){
        if(this.$route.path.indexOf('/') !== -1){
          this.activeNunber = 0
        }
        if(this.$route.path.indexOf('/myMusic') !== -1){
          this.activeNunber = 1
        }
        if(this.$route.path.indexOf('/friends') !== -1){
          this.activeNunber = 2
        }
        if(this.$route.path.indexOf('/account') !== -1){
          this.activeNunber = 3
        }
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

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.6);
    padding: 0.3rem 0;
    ul {
      display: flex;
      a {
        flex: 1;
      }
      .router-link-active {
        div {
          color: #e6e6e6;
        }
      }
      li {
        @include px2rem(font-size, 10);
        flex-direction: row;
        flex: 1;
        img {
          @include px2rem(width, 30);
        }
        div {
          color: #bebebe;
        }
      }
    }
  }
</style>

