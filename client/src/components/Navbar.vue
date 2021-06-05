<template>
  <v-app-bar app color="white" flat dense class="px-16">
    <v-img class="ml-16" src="@/assets/logo.png" max-width="75"></v-img>
    <v-tabs class="ml-8" color="primary">
      <v-tab v-for="tab in tabs" :key="tab.name" :to="tab.route">
        <v-icon>{{ tab.icon }}</v-icon>
      </v-tab>
    </v-tabs>
    <v-text-field
      class="mt-6 mr-4"
      prepend-inner-icon="mdi-magnify"
      placeholder="Search Quora"
      outlined
      dense
    ></v-text-field>

    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar
          v-bind="attrs"
          v-on="on"
          class="mr-16"
          color="primary"
          size="25"
        ></v-avatar>
      </template>
      <v-list>
        <v-list-item>
          <h4>{{ $store.state.user ? $store.state.user.name : '' }}</h4>
        </v-list-item>
        <v-list-item class="mt-n6">
          <small>{{ $store.state.user ? $store.state.user.email : '' }}</small>
        </v-list-item>
        <v-list-item @click="onLogout">
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    tabs: [
      { name: 'Home', icon: 'mdi-home-outline', route: '/' },
      { name: 'Following', icon: 'mdi-newspaper-variant', route: '/following' },
      { name: 'Answer', icon: 'mdi-pencil-box-outline', route: '/answer' },
      { name: 'Spaces', icon: 'mdi-account-group-outline', route: '/spaces' },
      { name: 'Notification', icon: 'mdi-bell-outline', route: '/notification' }
    ]
  }),
  methods: {
    onLogout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
