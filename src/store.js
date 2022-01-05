import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        homePageTimeValue: {
            "startTime": "1d",
            "endTime": "9d"
        },
    },
    mutations: {
        setTimeValue(state, timeValue) {
            console.log("set", timeValue)
            state.homePageTimeValue = timeValue
        },
    },
})