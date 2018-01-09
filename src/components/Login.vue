<template>
  <div>
    <div class="login window">
      <div class="window__title">
        another mesenger
      </div>
      <div class="window__header">
        <div class="window__header__cont-avatar">
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
          <div class="window__login__form__group window__login__form__group--submit">
            <input type="submit" value="Sign In">
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

export default {
  data () {
    return {
      avatar: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png',
      email: null,
      password: null,
      loginAs: 'online',
      isLogin: false
    }
  },
  mounted () {
    let user = firebase.auth().currentUser
    console.log(user)
    if (user) {
      this.$router.push('/')
    }
  },
  methods: {
    login () {
      if (!this.signup()) {
        this.signin()
      }
    },
    signin () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          console.error('Error Code', error.code)
          console.error('Error Message', error.message)

          if (error.code === 'auth/user-disabled') {
            alert('user disabled')
          }
          if (error.code === 'auth/wrong-password') {
            alert('wrong password')
          }
        })
    },
    signup () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push('/')
        })
        .catch(error => {
          console.error('Error Code', error.code)
          console.error('Error Message', error.message)

          if (error.code === 'auth/email-already-use') {
            return false
          }
          if (error.code === 'auth/invalid-email') {
            alert('invalid email')
          }
          if (error.code === 'auth/weak-password') {
            alert('weak password')
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>

.login {
  background: linear-gradient(0deg, #EBF6F8 85%, #CBE9EB, #94C4D6);
  width: 28em;
  height: 95vh;
}
.window {
  &__header {
    padding: 2em 1em;
    &__cont-avatar {
      background:  
        radial-gradient(circle at top, rgba(white, 0.2) 60%, rgba(#AAA, 0.1) 60%),
        linear-gradient(transparent, #A4D0E6);
      
      box-shadow: 0 0 0 0.1em rgba(0,0,0,0.1);
      border-radius: 1em 1em;
      line-height: 0;

      position: relative;

      margin: 0 auto;
      padding: 0.5em;
      width: 9.5em;

      &:hover {
        cursor: pointer;
        box-shadow: 0 0 0.5em rgba(0,0,0,0.3);
      }
    }
    &__avatar {
      width: 100%;
      border:1px solid #AAA;
      border-radius: 0.3em;
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
            padding: 0.1em 1em;
            display: inline-block;
          }
        }
      }
    }
  }
}

</style>
