<template>
  <div>
    <div class="contacts window">
      <div class="window__title"></div>
      <div class="window__header">
        <div class="window__header__avatar avatar">
          <img :src="avatar" alt="this is the avatar">
        </div>
        <div class="window__header__info">
          <div class="window__header__info__name">
            <span contenteditable="true">
              Marco Antonio
            </span>
          </div>
          <div class="window__header__info__status" contenteditable="true">
            2b || !2b
          </div>
        </div>
      </div>
      <div class="window__search">
        <div class="window__search__item window__search__item--input">
          <input type="search" class="window__search__item__input" 
                 placeholder="search contact...">
        </div>
        <div class="window__search__item">
          <span class="windos__search__item__order"></span>
        </div>
      </div>
      <div class="window__contacts">
        <div class="window__contacts__group">
          <div class="window__contacts__group__title">
            <span></span>
            Online(10)
          </div>
          <div class="window__contacts__group__contact">
            <div class="window__contacts__group__contact__icon">
                  <img src="../assets/icon.svg">
            </div>
            <div class="window__contacts__group__contact__name">
              Someone who is not accountant - 
            </div>
            <div class="window__contacts__group__contact__status">
              The most beautiful girl in the world
            </div>            
          </div>
        </div>
        <div class="window__contacts__group">
          <div class="window__contacts__group__title">
            <span>v</span>
            Offline(210)
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      avatar: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png'
    }
  },
  mounted () {
    if (!this.$store.getters['user/getUser'] === null) {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
  .contacts {
    background: linear-gradient(0deg, #EBF6F8 60%, #CBE9EB, #94C4D6);
    width: 32em;
    height: 36em;
  }
  .window {
    &__header {
      padding: 1em;
      display: flex;
      box-shadow: 0 0.1em 0.1em rgba(0,0,0,0.3);
      &__avatar {
        font-size: 0.8em;
        width: 25%;
      }
      &__info {
        width: 75%;
        padding: 0 1em;
        color: white;
        &__name {
          font-weight: 600;
          font-size: 1.2em;
        }
        &__status {
          font-size: 1em;
          padding: 0.5em 0;
        }
      }
    }

    &__search {
      background: white;
      display: flex;
      padding: 1em 0;
      line-height: 2em;
      box-shadow: 0 0.1em 0.1em rgba(0,0,0,0.3) inset;
      border-bottom: 1px solid #DDD;
      &__item {
        padding: 0 1em;
        &__input {
          padding: 0.5em 1em;
          width: 100%;
          border: 1px solid transparent;
          box-shadow: 0 0 0.3em rgba(0,0,0,0.3) inset;
        }
        &--input {
          width: 100%;
        }
      }
    }

    &__contacts {
      background: white;
      height: 100%;
      overflow: auto;
      &__group {
        padding: 0.5em;
        &__title {
          padding: 0.5em 0;
          font-weight: 600;
        }
        &__contact {
          padding: 0.25em 0;
          display: flex;
          &__icon {
            width: 1.5em;
            fill: green;
            padding-right: 0.5em;
            img {
              width: 100%;
            }
          }
          &__name {
            color: black;
            white-space: nowrap;            
          }
          &__status {
            color: #888;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
