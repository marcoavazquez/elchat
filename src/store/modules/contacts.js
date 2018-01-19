import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  namespaced: true,
  state: {
    contacts: [],
  },
  getters: {
    getContacts (state, getters, rootState) {
      return state.contacts
    },
    getCount (state, getters, rootState) {
      return state.contacts.length
    }
  }
}