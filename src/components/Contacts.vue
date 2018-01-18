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

export default {
  mounted () {
    if (!this.$store.getters['user/getUser'] === null) {
      this.$router.push('/login')
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
