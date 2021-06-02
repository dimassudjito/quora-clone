<template>
  <v-app id="inspire">
    <Navbar />
    <v-main class="grey lighten-3">
      <v-main>
        <router-view />
      </v-main>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: { Navbar }
}
</script>
