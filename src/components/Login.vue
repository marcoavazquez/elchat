<template>
  <div>
    <div class="login window">
      <div class="window__title">
        another mesenger
      </div>
      <div class="window__header">
        <div class="window__header__cont-avatar avatar">
          <img :src="avatar" alt="" class="window__header__avatar">
        </div>   
      </div>

      <div class="window__login">
        <form class="window__login__form" @submit.prevent="login" method="POST">
          <div class="window__login__form__group">
            <label for="email">e-mail</label>
            <input type="email" v-model="email" name="email" required>
          </div>
          <div class="window__login__form__group">
            <label for="password">Password</label>
            <input type="password" name="password" v-model="password" required>
          </div>
          <div class="window__login__form__group window__login__form__group--options">
            <label for="options">Login as:</label>
            <select name="options" id="" v-model="loginAs">
              <option value="online">OnLine</option>
              <option value="busy">Busy</option>
              <option value="invisible">Invisible</option>
            </select>
          </div>
          <div class="window__login__form__group">
            <label>
              <input v-model="newUser" type="checkbox" name="newUser">
              New User?
            </label>
          </div>
          <div class="window__login__form__group window__login__form__group--submit">
            <input type="submit" value="Sign In">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      avatar: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png',
      user: this.$store.state.user,
      email: null,
      password: null,
      loginAs: 'online',
      newUser: false,
      chatWith: null
    }
  },
  mounted () {
    if (this.$store.getters['user/getUser'] !== null) {
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      if (this.newUser) {
        this.$store.dispatch('user/signup', {email: this.email, password: this.password})
      } else {
        this.$store.dispatch('user/signin', {email: this.email, password: this.password})
      }
      if (this.$store.getters['user/getUser'] !== null) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.login {
  background: linear-gradient(0deg, #EBF6F8 85%, #CBE9EB, #94C4D6);
  width: 28em;
  height: 90vh;
}
.window {
  &__header {
    padding: 2em 1em;
    &__cont-avatar {
      width: 9.5em;
      margin: 0 auto;
    }
  }
  &__login {
    padding: 0 3em;
    &__form {
      &__group {
        padding: 0.5em 0;
        label {
          display: block;
          width: 100%;
          padding: 0.25em 0;
        }
        input[type='email'], input[type="password"] {       
          line-height: 1.6em;
          padding: 0 0.5em;
          width: 100%;
        }
        input[type='checkbox'] {
          display: inline-block;
          border: 1px solid gray;
          background: red;
        }

        &--options {
          padding: 1em 0;
          label {
            display: inline-block;
            width: auto;
          }
          select {
            background: none;
            border: none;
          }
        }

        &--submit {
          padding: 1em 0;
          text-align: center;
          input {
            background: linear-gradient(0deg, #DDD, white);
            border: 1px solid gray;
            padding: 0.2em 1em;
            display: inline-block;
          }
        }
      }
    }
  }
}

</style>
