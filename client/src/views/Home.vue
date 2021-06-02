<template>
  <div>
    <div v-for="question in getQuestions" :key="question.body">
      {{ question.body }}
    </div>
  </div>
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
        }
      }
    `
  }
}
</script>
