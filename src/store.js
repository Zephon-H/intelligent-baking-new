import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        homePageTimeValue: [new Date("2021-09-10 10:39:44"), new Date("2021-09-10 11:09:44")]
        ,
    },
    mutations: {
        setTimeValue(state, timeValue) {
            console.log("set", timeValue)
            state.homePageTimeValue = timeValue
        },
    },
})