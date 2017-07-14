import Vue from 'vue'
import Vuex from 'vuex'

//import user from './modules/user'
//import sport from './modules/sport'
//import travel from './modules/travel'
//import detail from './modules/detail'
//import com from './modules/com'
import search from './modules/search'
import filterSongSheet from './modules/filterSongSheet'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        search,
        filterSongSheet
        //sport,
        //travel,
        //detail,
        //com
    }
})
