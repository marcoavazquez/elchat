import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  namespaced: true,
  state: {
    messages: [],
    message: null,
    chatWith: null,
    privateMessages: [],
    privateMessage: null,
    isPrivate: false
  },
  getters: {
    getMessages (state, getters, rootState) {
      return state.messages
    },
    getPrivateMessages (state, getters, rootState) {
      return state.privateMessage
    },
    getChatWith (state, getters, rootState) {
      return state.chatWith
    },
    getIsPrivate (state, getters, rootState) {
      return state.isPrivate
    }
  },
  mutations: {
    setMessages (state, payload) {
      state.messages = []
      let messages = payload
      for (let key in messages) {
        state.messages.push(messages[key])
      }
    },
    setPrivateMessages (state, payload) {
      state.privateMessage = []
      let privMsg = payload
      for (let key in privMsg) {
        state.privateMessages.push(privMsg[key])
      }
    },
    setMessage (state, payload) {
      state.message = payload
    },
    setPrivateMessage (state, payload) {
      state.privateMessage = payload
    },
    setChatWith (state, payload) {
      state.chatWith = payload
    },
    setIsPrivate (state, payload) {
      state.isPrivate = payload
    }
  },
  actions: {
    sendMessage ({commit}, payload) {
      firebase.database().ref('/chat').push({
        name: payload.name,
        text: payload.text,
        date: payload.date,
        userId: payload.userId
      })
    },
    sendPrivateMessage ({commit}, payload) {
      let chat = {
        name: payload.name,
        text: payload.text,
        date: payload.date,
        userId: payload.userId,
        toUserId: payload.toUserId,
        toUserName: payload.toUserName
      }
      firebase.database().ref(`/privateChat/${payload.userId}/${payload.toUserId}`).push(chat)
      firebase.database().ref(`/privateChat/${payload.toUserId}/${payload.userId}`).push(chat)
    },
    loadMessages ({commit}, payload) {
      firebase.database().ref('/chat')
      .limitToLast(50)
      .on('value', snapshot => {
        commit('setMessages', snapshot.val())
        payload()
      })
    },
    loadPrivateMessages ({commit}, payload) {
      firebase.database().ref(`/privateChat/${payload.userId}/${payload.toUserId}`)
      .limitToLast(50)
      .on('value', snapshot => {
        commit('setPrivateMessage', snapshot.val())
        payload.callback()
      })
    },
    loadChatWith ({commit}, payload) {
      commit('setChatWith', payload)
    },
    togglePrivateChat ({commit}, payload) {
      commit('setIsPrivate', payload)
    }
  }
}
