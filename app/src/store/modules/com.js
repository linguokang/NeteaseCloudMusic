import * as types from '../types'

/**
 * App通用配置
 */
const state = {
  showaudio:true
}

const actions = {

    showaudioplay({ commit }, status) {
        commit(types.SET_AUDIOPLAY_SHOW, status)
    },

}

const getters = {
    //loading: state => state.loading,

}


const mutations = {
    [types.SET_AUDIOPLAY_SHOW](state, status) {
        state.showaudio = status
    },


}


export default {
    state,
    actions,
    getters,
    mutations
}
