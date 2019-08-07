import Vue from 'vue'
import Vuex from 'vuex'
import argument from './modules/arguments'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
        argument
    },
    getters
})
export default store