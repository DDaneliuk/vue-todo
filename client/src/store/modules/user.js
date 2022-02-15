const state = () => ({
    userId: null
})

const mutations = {
    setUser(state, userId) {
        state.userId = userId
    },
}

const getters = {
    getUserId(state) {
        return state;
    },
}


export default {
    state,
    getters,
    mutations,
}