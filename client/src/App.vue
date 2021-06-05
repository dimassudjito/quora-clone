<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3 pa-16">
      <Login />
      <Navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Login from '@/components/Login'

export default {
  components: { Navbar, Login }
}
</script>
