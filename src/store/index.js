import { createStore } from 'vuex'
import user from './modules/users'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    user
  }
})
