<template>
  <v-container class="px-16">
    <v-row>
      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268"> </v-sheet>
      </v-col>

      <v-col cols="12" sm="8">
        <v-card
          v-for="question in getQuestions"
          :key="question.body"
          class="mt-2 pa-4"
          min-height="200"
        >
          <v-icon>mdi-account-circle-outline</v-icon>
          <span>{{ question.email }}</span>
          <h4>{{ question.body }}</h4>
          <p v-if="question.answers[0]">
            {{ question.answers[0].body }}
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" sm="2">
        <v-sheet rounded="lg" min-height="268"> </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Home',
  apollo: {
    getQuestions: gql`
      query {
        getQuestions {
          body
          email
          id
          answers {
            comments {
              id
              email
              body
            }
            email
            id
            body
            upvotes {
              email
            }
            downvotes {
              email
            }
          }
          upvotes {
            email
          }
          downvotes {
            email
          }
        }
      }
    `
  }
}
</script>
