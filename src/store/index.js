import { createStore } from 'vuex'
import user from './modules/users'
import app from './modules/app'
import permission from './modules/permission'
import theme from './modules/theme'
import getters from './getters'
export default createStore({
  getters,
  modules: {
    user,
    app,
    permission,
    theme
  }
})
