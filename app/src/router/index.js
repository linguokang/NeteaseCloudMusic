import Vue from 'vue'
import Router from 'vue-router'
//import Hello from '@/components/Hello'
import discoverMusic from '@/page/discoverMusic'
import myMusic from '@/page/myMusic'
import friends from '@/page/friends'
import account from '@/page/account'
import search from '@/page/search'
import searchResult from '@/page/searchResult'

import searchSingle from '@/components/searchSingle'
import searchSinger from '@/components/searchSinger'
import searchAlbum from '@/components/searchAlbum'

import personalityRecommen from '@/page/personalityRecommen'
import anchorStation   from '@/page/anchorStation'
import rankingList  from '@/page/rankingList'
import songSheet  from '@/page/songSheet'
import filterSongSheet  from '@/page/filterSongSheet'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'discoverMusic',
      component: discoverMusic,
      children:[
        {
          path: '/',
          component: personalityRecommen
        },
        {
          path: '/songSheet',
          component: songSheet
        },
        {
          path: '/anchorStation',
          component: anchorStation
        },
        {
          path: '/rankingList',
          component: rankingList
        }
      ]
    },
    {
      path: '/myMusic',
      name: 'myMusic',
      component: myMusic
    },
    {
      path: '/friends',
      name: 'friends',
      component: friends
    },
    {
      path: '/account',
      name: 'account',
      component: account
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      children: [
        {
          path: 'searchSingle',
          component: searchSingle
        },
        {
          path: 'searchSinger',
          component: searchSinger
        },
        {
          path: 'searchAlbum',
          component: searchAlbum
        }
      ]
    },
    {
      path: '/filterSongSheet',
      component: filterSongSheet
    }
  ]
})
