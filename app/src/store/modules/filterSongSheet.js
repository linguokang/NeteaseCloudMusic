
import * as types from '../types'

const state = {
    // 用户搜搜信息
    keyword: '全部',
    show:false
}

const actions = {
    //设置是否显示筛选歌单界面
    setSongSheetShow({ commit }, res) {
        commit(types.SET_SONGSHEET_SHOW, res)
    },
//获取是否显示筛选歌单界面
//  getSongSheetShow({ commit }, id) {
//        commit(types.GET_SONGSHEET_SHOW)
//    },
// 设置筛选歌单关键字
  setSongSheetKeyword({ commit }, res) {
      commit(types.SET_SONGSHEET_KEYWORD, res)
    },
  // 获取筛选歌单关键字
  //getSongSheetKeyword({ commit }, id) {
  //    commit(types.GET_SONGSHEET_KEYWORD)
  //  },
}

const getters = {
  getSongSheetShow: state => state.show,
  getSongSheetKeyword: state => state.keyword
}

const mutations = {
    [types.SET_SONGSHEET_SHOW](state, res) {
        state.show = res
    },
    [types.SET_SONGSHEET_KEYWORD](state, res) {
      state.keyword = res
    },
  //[types.GET_SONGSHEET_KEYWORD](state, res) {
  //  return state.keyword
  //},
  //[types.GET_SONGSHEET_SHOW](state, res) {
  //  return state.show
  //},
}

export default {
    state,
    actions,
    getters,
    mutations
}
