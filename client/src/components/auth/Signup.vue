<template>
  <div>
    <v-card class="py-2">
      <v-card-text class="text-center">
        By continuing I agree that I am at least 13 years old and agree to
        Quora’s Terms of Service and Privacy Policy.
      </v-card-text>
      <v-form @submit.prevent="onLogin" class="px-4">
        <v-text-field
          v-model="name"
          dense
          label="Name"
          outlined
          color="blue"
        ></v-text-field>
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
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <p @click="$emit('login')" class="white--text text-center ma-0">
      <small>Login</small>
    </p>
  </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onLogin() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($name: String!, $email: String!, $password: String!) {
              register(
                registerInput: {
                  name: $name
                  email: $email
                  password: $password
                }
              ) {
                token
                name
                email
              }
            }
          `,
          variables: {
            name: this.name,
            email: this.email,
            password: this.password
          }
        })
        .then((data) => {
          console.log(data.data.register) // DEBUG
          this.$store.dispatch('login', data.data.register)
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
