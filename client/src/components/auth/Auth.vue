<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <Login
      @dialog="dialog = false"
      @signup="active = 'signup'"
      v-if="active == 'login'"
    />
    <Signup
      @dialog="dialog = false"
      @login="active = 'login'"
      v-else-if="active == 'signup'"
    />
  </v-dialog>
</template>

<script>
import Login from './Login.vue'
import Signup from './Signup'

export default {
  name: 'Auth',
  components: {
    Login,
    Signup
  },
  data() {
    return {
      active: 'login',
      dialog: true
    }
  },
  created() {
    this.dialog = !localStorage.getItem('user')
  }
}
</script>

<style></style>
