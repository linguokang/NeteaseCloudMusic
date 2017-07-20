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
import songSheetItem  from '@/page/songSheetItem'
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
          component: songSheet,
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
    //{
    //  path: '/filterSongSheet',
    //  component: filterSongSheet
    //},
    {
      path: '/songsheetItem',
      component: songSheetItem
    },
  ],
  scrollBehavior
})

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition
  } else {
    const position = {}
    // new navigation.
    // scroll to anchor by returning the selector
    if (to.hash) {
      position.selector = to.hash
    }
    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0
      position.y = 0
    }
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position
  }
}
