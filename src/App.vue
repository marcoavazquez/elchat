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
  background: linear-gradient(
                90deg, 
                rgba(#f5820c, 0.5), 
                rgba(#ffa610, 0.5), 
                rgba(#ffcb2d, 0.5), 
                rgba(#ffa610, 0.5)),
              linear-gradient(
                -45deg, 
                rgba(#f5820c, 0.9), 
                rgba(#ffa610, 0.9), 
                rgba(#ffcb2d, 0.9), 
                rgba(orange, 0.9), 
                rgba(#ffcb2d, 0.9), 
                rgba(#ffa610, 0.9));
  background-size: 100% 100vh;
  color: #333;

  font-family: 'Roboto', sans-serif;
  font-size: 13px;

  padding: 2em;

}

.app {
  //display: flex;
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

.avatar {
  background:  
    radial-gradient(circle at top, rgba(white, 0.2) 60%, rgba(#AAA, 0.1) 60%),
    linear-gradient(transparent, #A4D0E6);
  
  box-shadow: 0 0 0 0.1em rgba(0,0,0,0.1),
              0 0.1em 0.5em rgba(0,0,0,0.3);
  border-radius: 1em 1em;
  line-height: 0;

  position: relative;

  padding: 0.5em;
  width: 9.5em;
  height: 9.5em;

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 0.5em rgba(0,0,0,0.3);
  }
  img {
    width: 100%;
    border:1px solid #AAA;
    border-radius: 0.3em;
  }
}

</style>
