<template>
  <div>
    <div class="window chat">
      <div class="window__titlle"></div>
      <div class="window__header chat__header">
        <ul class="chat__header__tabs">
          <li class="chat__header__tabs__tab"
              :class="{'chat__header__tabs__tab--active': !isPrivate}"
              @click="startPublicChat">All</li>
          <li class="chat__header__tabs__tab" v-text="chatWith"
             :class="{'chat__header__tabs__tab--active': isPrivate}"></li>
        </ul>
      </div>
      <div class="chat__body">
        <div class="chat__chat">
          <div class="chat__messages" id="messages">
            <div class="chat__messages__message" v-for="message in messages">
              <div class="chat__messages__message__name" v-text="formatName(message)"></div>
              <div class="chat__messages__message__text" v-text="message.text"></div>
            </div>
          </div>
          <form class="chat__send" @submit.prevent="send">
            <div class="chat__send__tools"> ### </div>
            <div class="chat__send__writter">
              <textarea v-model="message" @keypress.prevent.enter="send()"></textarea>
            </div>
            <div class="chat__send__options">
              <input type="submit" value="Send">
            </div>
          </form>
        </div>
        <div class="chat__avatars">
          <div class="chat__avatars__avatar avatar">
            <img src="https://firebase.google.com/_static/images/firebase/touchicon-180.png" 
                 alt="avatar">
          </div>
          <div class="chat__avatars__avatar avatar">
            <img src="https://firebase.google.com/_static/images/firebase/touchicon-180.png" 
                 alt="avatar">
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
      messages: [],
      message: null,
      user: null,
      profile: null
    }
  },
  created () {
    this.$store.dispatch('chat/loadMessages', () => {
      this.loadMessages()
    })
    this.user = this.$store.getters['user/getUser']
  },
  methods: {
    send () {
      this.profile = this.$store.getters['user/getProfile']
      let action = ''
      let payload = {
        name: this.profile.name,
        text: this.message,
        date: Date.now(),
        userId: this.user.uid
      }
      if (this.isPrivate) {
        action = 'chat/sendPrivateMessage'
        payload.toUserId = this.$store.getters['chat/getChatWith'].key
        payload.toUserName = this.$store.getters['chat/getChatWith'].name
      } else {
        action = 'chat/sendMessage'
      }
      this.$store.dispatch(action, payload).then(() => {
        this.message = null
      })
    },
    loadMessages () {
      this.setMessages().then(() => {
        this.scrollToBottom('#messages')
      })
    },
    setMessages () {
      let action = this.isPrivate
        ? `chat/getPrivateMessages`
        : 'chat/getMessages'
      return new Promise((resolve, reject) => {
        let messages = this.$store.getters[action]
        console.log('messages', messages)
        this.messages = []
        for (let key in messages) {
          this.messages.push(messages[key])
        }
        resolve()
      })
    },
    formatName (message) {
      return `${message.name} said:`
    },
    formatDate (date) {
      return new Date(date).toDateString()
    },
    scrollToBottom (selector) {
      let elem = document.querySelector(selector)
      elem.scrollTop = elem.scrollHeight
    },
    startPublicChat () {
      this.$store.dispatch('chat/togglePrivateChat', false)
      this.loadMessages()
    }
  },
  computed: {
    chatWith () {
      return this.$store.getters['chat/getChatWith']
        ? this.$store.getters['chat/getChatWith'].name
        : '...'
    },
    isPrivate () {
      return this.$store.getters['chat/getIsPrivate']
    }
  },
  watch: {
    isPrivate () {
      if (this.isPrivate) {
        this.$store.dispatch('chat/loadPrivateMessages', {
          userId: this.user.uid,
          toUserId: this.$store.getters['chat/getChatWith'].key,
          callback: this.loadMessages
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chat {
  background: linear-gradient(0deg, rgb(200, 227, 236), #CBE9EB);
  width: 52em;

  &__header {
    padding: 0.5em 0.5em 0 0.5em;
    &__tabs {
      display: flex;
      &__tab {
        list-style: none;
        font-size: 0.8em;
        font-weight: bold;
        color: #789;
        border-radius: 0.5em 0.5em 0 0;
        border: 1px solid #CCC;
        border-bottom: none;
        padding: 0.5em 1em;
        cursor: pointer;
        &--active {
          background: white;
          cursor: initial;
        }
      }
    }
  }

  &__body {
    display: flex;
    padding: 0 0.5em;
  }

  &__chat {
    width: 100%;
  }

  &__messages {
    background: white;
    border: 1px solid #CCC;
    height: 24em;
    overflow: auto;
    &__message {
      padding: 0.5em;
      &__name {
        font-size: 0.9em;
        padding: 0.5em 0;
        color: orange;
        font-weight: bold;
      }
      &__text {
        padding-left: 1em;
        color: #333;
        position: relative;
        &:before {
          content: '';
          border: 0.2em solid #bcd;
          border-radius: 50%;
          display: block;
          position: absolute;
          left: 0;
          top: 0.5em;
        }
      }
      &__date {
        font-size: 0.8em;
        color: #999;
        font-style: italic;
      }
    }
  }

  &__send {
    padding: 0.5em 0;
    &__tools {
      padding: 0.5em;
      border: 1px solid #ccc;
      border-bottom: none;
      border-radius: 0.2em 0.2em 0 0;
    }
    &__writter {
      background: white;
      border: 1px solid #ccc;
      textarea {
        width: 100%;
        height: 100%;
        border: none;
        padding: 0.5em;
      }
    }
    &__options {
      padding: 0.1em 0;
      text-align: right;
      input {
        background: #FAFAFA;
        color: #666;
        border: 1px solid #ccc;
        border-radius: 0.2em;
        padding: 0.1em 1em;
      }
    }
  }

  &__avatars {
    padding: 0.5em;
    width: 12em;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 2.5em;
    &__avatar {
      height: 9.5em;
    }
  }
}
</style>
