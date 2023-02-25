import { createStore } from 'vuex'
import user from './modules/users'
import app from './modules/app'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    user,
    app
  }
})
