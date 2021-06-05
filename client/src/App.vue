<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3 pa-16">
      <Auth />
      <Navbar />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'
import Auth from '@/components/auth/Auth'

export default {
  components: { Navbar, Auth }
}
</script>
