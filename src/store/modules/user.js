import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  namespaced: true,
  state: {
    user: null,
    name: null,
    email: null,
    state: null,
    error: null,
    loading: null
  },
  getters: {
    isLogin (state, getters, rootState) {
      console.log('from User.js', state.user)
      return state.user !== null
    },
    getUser (state, getters, rootState) {
      return state.user
    },
    getError (state, getters, rootState) {
      return state.error
    },
    getLoading (state, getters, rootState) {
      return state.loading
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    signup ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((firebaseUser) => {
        commit('setUser', firebaseUser)
      })
      .catch(error => {
        console.error('Error Code', error.code)
        console.error('Error Message', error.message)

        alert(error.message)
      })
    },
    signin ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((firebaseUser) => {
          commit('setUser', firebaseUser)
        })
        .catch(error => {
          console.error('Error Code', error.code)
          console.error('Error Message', error.message)
          alert(error.message)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload)
    }
  }
}
