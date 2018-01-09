<template>
  <div>
    <div class="contacts window">
      <div class="window-title"></div>
      <div class="contacts-header"></div>
      <div class="contacts-search"></div>
      <div class="contacts-list"></div>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  mounted () {
    let user = firebase.auth().currentUser
    console.log(user)
    if (!user) {
      this.$router.push('login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .contacts {
    width: 28em;
    height: 90vh;
  }
</style>
