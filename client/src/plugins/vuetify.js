import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#a82400',
        secondary: '#37474F',
        tertiary: '#acbf23',
        accent: '#8c9eff',
        error: '#b71c1c'
      }
    }
  }
})
