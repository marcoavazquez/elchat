// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
firebase.initializeApp(process.firebase)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        this.$store.dispatch('user/autoSignIn', firebaseUser)
      }
    })
  }
})
