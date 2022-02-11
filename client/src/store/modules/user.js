const state = () => ({
    authStatus: '',
    token: null,
})

const mutations = {
    setToken(state, token) {
        state.token = token
    },
    setAuthStatus(state, status) {
        state.authStatus = status
    }
}

const getters = {}
const actions = {
    async userLogin({commit}, payload) {
        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                payload,
                withCredentials: true,
                credentials: 'include',

            })
            if (response && response.data){
                commit('setAuthStatus', true)
            } else {
                commit('setAuthStatus', false)
            }
        } catch (e) {
            console.log(e)
        }

    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}