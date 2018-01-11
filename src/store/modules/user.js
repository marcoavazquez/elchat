import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

console.log(firebase.auth().currentUser)

export default {
  namespaced: true,
  state: {
    firebaseUser: firebase.auth().currentUser,
    name: null,
    email: null,
    state: null
  },
  getters: {
    isLogin (state, getters, rootState) {
      return state.firebaseUser !== null
    }
  }
}
