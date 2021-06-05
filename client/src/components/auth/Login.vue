<template>
  <div>
    <v-card class="py-2">
      <v-card-text class="text-center">
        By continuing I agree that I am at least 13 years old and agree to
        Quora’s Terms of Service and Privacy Policy.
      </v-card-text>
      <v-form @submit.prevent="onLogin" class="px-4">
        <v-text-field
          v-model="email"
          dense
          label="Email"
          outlined
          color="blue"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          dense
          label="Password"
          outlined
          color="blue"
        >
        </v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            medium
            color="blue"
            dark
            class="rounded-pill"
            @click="dialog = false"
            type="submit"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <p @click="$emit('signup')" class="white--text text-center ma-0">
      <small>Sign up with email</small>
    </p>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onLogin() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                token
                name
                email
              }
            }
          `,
          variables: {
            email: this.email,
            password: this.password
          }
        })
        .then((data) => {
          console.log(data.data.login) // DEBUG
          this.$store.dispatch('login', data.data.login)
          this.$emit('dialog')
        })
        .catch((err) => {
          console.error(err) // DEBUG
        })
    }
  }
}
</script>

<style></style>
