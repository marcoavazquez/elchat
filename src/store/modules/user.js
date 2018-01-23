import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  namespaced: true,
  state: {
    user: null,
    name: null,
    profile: null,
    email: null,
    state: null,
    status: null,
    error: null,
    loading: null
  },
  getters: {
    isLogin (state, getters, rootState) {
      return state.user !== null
    },
    getUser (state, getters, rootState) {
      return state.user
    },
    getProfile (state, getters, rootState) {
      return state.profile
    },
    getError (state, getters, rootState) {
      return state.error
    },
    getLoading (state, getters, rootState) {
      return state.loading
    },
    getStatus (state, getters, rootState) {
      return state.status
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
    },
    setState (state, payload) {
      state.state = payload
    },
    setStatus (state, payload) {
      state.status = payload
    },
    setProfile (state, payload) {
      state.profile = payload
    },
    updateProfile (state, payload) {
      firebase.database().ref(`/contacts/${state.user.uid}`).set({
        name: payload.name,
        status: payload.status
      }).then(data => {
        state.profile = payload
      })
    }
  },
  actions: {
    showProfile ({commit}, payload) {
      commit('setProfile', payload)
      console.log('showprofile', payload)
    },
    updateInfo ({commit}, payload) {
      commit('updateProfile', payload)
    },
    signup ({commit}, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then((firebaseUser) => {
        commit('setUser', firebaseUser)
        commit('setState', 'OnLine')
        firebase.database().ref(`/contacts/${firebaseUser.uid}`).set({
          name: 'New User',
          state: 'online',
          status: ''
        }).then(data => {
          commit('setProfile', {name: data.name, status: data.status})
        })
      })
      .catch(error => {
        alert(error.code + ': ' + error.message)
      })
    },
    signin ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((firebaseUser) => {
          commit('setUser', firebaseUser)
        })
        .catch(error => {
          alert(error.code + ': ' + error.message)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload)
    }
  }
}
