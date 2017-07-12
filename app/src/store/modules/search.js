//import api from '../../fetch/api'
import * as types from '../types'

const state = {
    // 用户搜搜信息
    keyword: '',
    type:1
}

const actions = {
    //搜索关键字
    setSearchInfo({ commit }, res) {
        commit(types.SET_SEARCH_INFO, res)
    },

    getSearchData({ commit }, id) {
        commit(types.GET_SEARCH_INFO)
    },
//  搜索类型
    setSearchType({ commit }, res) {
      commit(types.SET_SEARCH_TYPE, res)
    },
    getSearchType({ commit }, id) {
      commit(types.GET_SEARCH_TYPE)
    },
}

const getters = {
  getSearchData: state => state.keyword,
  getSearchType: state => state.type
}

const mutations = {
    [types.SET_SEARCH_INFO](state, res) {
        state.keyword = res
    },
    [types.SET_SEARCH_TYPE](state, res) {
      state.type = res
    },

    //[types.SET_LOGIN_STATUS](state, status) {
    //    state.loginStatus = status
    //},
    //
    //[types.GET_USER_DATA](state, res) {
    //    state.userData = res
    //}

}

export default {
    state,
    actions,
    getters,
    mutations
}
