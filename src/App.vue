<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

firebase.initializeApp(process.firebase)

export default {
  name: 'app'
}
</script>

<style lang="scss">

*, *::after, *::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(
                90deg, 
                rgba(#0A6675, 0.5), 
                rgba(#6FC071, 0.5), 
                rgba(#DAE36F, 0.5), 
                rgba(#6FC071, 0.5)),
              linear-gradient(
                -45deg, 
                rgba(#0A6675, 0.9), 
                rgba(#6FC071, 0.9), 
                rgba(#DAE36F, 0.9), 
                rgba(#FEFEFE, 0.9), 
                rgba(#DAE36F, 0.9), 
                rgba(#6FC071, 0.9));
  background-size: 100% 100vh;
  color: #333;

  font-family: 'Roboto', sans-serif;
  font-size: 13px;

  padding: 1em;

}

.app {
  display: flex;
}

.window {
  box-shadow: 0 0.1em 2em rgba(0,0,0,0.3);
  border: 1px solid #94C4D6;
  border-radius: 0.5em;

  &__title {
    color: #666;
    padding: 0.3em 0.5em;
  }
}

</style>
