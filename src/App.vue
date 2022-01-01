<template>
  <v-app class="root">
    <v-main>
      <v-container
        class="create"
        tag="form"
        @submit.prevent="createFormHandler(name)"
      >
        <v-card>
          <v-card-text>
            <v-text-field :label="`Create NewX To-do: ${name}`" v-model="name">
            </v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              :disabled="name === ''"
              color="secondary"
              class="md-primary"
              >Create</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-container>
      <v-container class="list">
        <v-card
          v-for="todo in todos().data"
          :key="todo.id"
          @submit.prevent="remove(todo.id)"
          tag="form"
          elevation="2"
        >
          <v-card-header :title="todo.id">
            <v-card-header-text>
              <v-card-title>{{ todo.name }}</v-card-title>
            </v-card-header-text>
          </v-card-header>
          <v-card-actions>
            <v-btn type="submit" color="primary">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return { name: '' }
  },
  computed: {
    ...mapGetters({
      todos: 'todos/find'
    })
  },
  methods: {
    ...mapActions('todos', ['find', 'create', 'remove']), // getters have live queries
    async createFormHandler(name) {
      await this.create({ name })
      this.name = ''
    }
  },
  created: async function () {
    await this.find()
  }
}
</script>

<style lang="scss" scoped>
form.create {
  background: url('http://bit.ly/2LPV0uo');
}

form.create > .v-card {
  margin: auto;
  width: 320px;
}

form.create .v-text-field {
  margin-bottom: auto;
}

.list > form {
  display: inline-block;
  margin: 8px;
}

.list > form {
  width: 320px;
}
</style>
