import * as types from '../types'

/**
 * App通用配置
 */
const state = {
  showaudio:true,
  songId:33638523
}

const actions = {

    showaudioplay({ commit }, status) {
        commit(types.SET_AUDIOPLAY_SHOW, status)
    },
    setsongId({ commit }, status) {
      commit(types.SET_SONG_ID, status)
    },
}

const getters = {
    //loading: state => state.loading,

}


const mutations = {
    [types.SET_AUDIOPLAY_SHOW](state, status) {
        state.showaudio = status
    },
    [types.SET_SONG_ID](state, status) {
      state.songId = status
    }

}


export default {
    state,
    actions,
    getters,
    mutations
}
