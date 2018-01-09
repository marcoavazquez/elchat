let firebase = require('firebase/app')
require('firebase/database')
require('firebase/auth')

firebase.initializeApp(process.firebase)

export default firebase