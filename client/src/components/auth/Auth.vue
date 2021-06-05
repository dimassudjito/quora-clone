<template>
  <v-container>
    <Login @signup="active = 'signup'" v-if="active == 'login'" />
    <Signup @login="active = 'login'" v-else-if="active == 'signup'" />
  </v-container>
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
      active: 'login'
    }
  }
}
</script>

<style></style>
