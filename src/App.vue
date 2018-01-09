<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>

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
  background:  #789;
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
  border: 1px solid gray;
  border-top: 1px solid rgb(166, 197, 243);
  border-radius: 0.5em;

  &__title {
    color: #333;
    padding: 0.3em 0.5em;
  }
}

</style>
