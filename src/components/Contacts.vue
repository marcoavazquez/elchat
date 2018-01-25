<template>
  <div class="main">
    <div class="contacts window">
      <div class="window__title"></div>
      <div class="window__header">
        <div class="window__header__avatar avatar">
          <img :src="avatar" alt="this is the avatar">
        </div>
        <div class="window__header__info">
          <div class="window__header__info__name">
            <span contenteditable="true" v-text="name" data-field="name" 
                  @blur="updateInfo($event)">
            </span>
          </div>
          <div class="window__header__info__status" contenteditable="true" v-text="status" 
               @blur="updateInfo($event)" data-field="status">
          </div>
        </div>
      </div>
      <div class="window__search">
        <div class="window__search__item window__search__item--input">
          <input type="search" class="window__search__item__input" 
                 placeholder="search contact..." v-model="search">
        </div>
        <div class="window__search__item">
          <span class="windos__search__item__order"></span>
        </div>
      </div>
      <div class="window__contacts">
        <div class="window__contacts__group">
          <div class="window__contacts__group__title">
            <span></span>
            Online({{ contactsCount }})
          </div>
          
          <div class="window__contacts__group__contact" @click="openChat(null)" 
               :class="{'window__contacts__group__contact--active' : chatWithAll }">
            <div class="window__contacts__group__contact__icon">
              <img src="../assets/icon.svg">
            </div>
            <div class="window__contacts__group__contact__name">
              Chat with everibody - &nbsp;
            </div>
            <div class="window__contacts__group__contact__status">
              with everyone
            </div>            
          </div>

          <div class="window__contacts__group__contact" v-for="contact in contacts" 
               @click="openChat(contact)" 
               :class="{'window__contacts__group__contact--active' : isActive(contact) }">
            <div class="window__contacts__group__contact__icon">
              <img src="../assets/icon.svg">
            </div>
            <div class="window__contacts__group__contact__name">
              {{ contact.name }} - &nbsp;
            </div>
            <div class="window__contacts__group__contact__status">
              {{contact.status}}
            </div>            
          </div>
        </div>
        <div class="window__contacts__group">
          <div class="window__contacts__group__title">
            <span></span>
            Offline(210)
          </div>
        </div>
      </div>
    </div>

    <chat></chat>

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import chat from './Chat.vue'

export default {
  data () {
    return {
      avatar: 'https://firebase.google.com/_static/images/firebase/touchicon-180.png',
      user: null,
      name: null,
      status: null,
      profile: null,
      search: null,
      contacts: [],
      contactsCount: 0,
      chatWith: null,
      chatWithAll: false
    }
  },
  components: {
    chat
  },
  mounted () {
    this.user = this.$store.getters['user/getUser']
    if (this.user === null) {
      this.$router.push('/login')
    } else {
      firebase.database().ref('/contacts').on('value', snapshot => {
        this.loadContacts(snapshot.val())
        this.contactsCount = this.contacts.length
      })
    }
  },
  methods: {
    updateInfo (event) {
      if (event.target.dataset.field === 'name') {
        this.name = event.target.innerHTML
      }
      if (event.target.dataset.field === 'status') {
        this.status = event.target.innerHTML
      }
      this.$store.dispatch('user/updateInfo', {name: this.name, status: this.status})
    },
    loadContacts (contacts) {
      this.contacts = []
      for (let key in contacts) {
        if (this.user.uid === key) {
          this.loadInfo(contacts[key])
        }
        contacts[key].key = key
        this.contacts.push(contacts[key])
      }
    },
    loadInfo (contact) {
      this.$store.dispatch('user/showProfile', contact)
      this.profile = contact
      this.name = this.profile.name
      this.status = this.profile.status
    },
    openChat (contact) {
      if (contact !== null) {
        this.chatWithAll = false
        this.chatWith = contact
        this.$store.dispatch('chat/loadChatWith', contact)
        this.$store.dispatch('chat/togglePrivateChat', true)
      } else {
        this.chatWithAll = true
        this.chatWith = null
        this.$store.dispatch('chat/loadChatWith', null)
        this.$store.dispatch('chat/togglePrivateChat', false)
      }
    },
    isActive (contact) {
      if (this.chatWith !== null) {
        return contact.key === this.chatWith.key
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
  .main {
    display: flex;
    justify-content: space-between;
  }
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
          cursor: pointer;
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

          &--active {
            border: 1px solid orange;
            border-radius: 0.3em;
            background: rgba(orange, 0.1);
            padding: 0.1em;
            cursor: initial;
          }
        }
      }
    }
  }
</style>
