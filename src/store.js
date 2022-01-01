import { createStore } from 'vuex'
import feathersVuex from '@feathersjs/vuex'
import feathers from './server' // This would typically be feathers

const apiClient = feathers()
const { makeServicePlugin, BaseModel, FeathersVuex } = feathersVuex(apiClient, {
  idField: 'id'
})

class Todo extends BaseModel {
  static modelName = 'Todo'
  static instanceDefaults() {
    return {
      name: ''
    }
  }
}

const store = createStore({
  plugins: [
    makeServicePlugin({
      Model: Todo,
      service: apiClient.service('todos'),
      servicePath: 'todos'
    })
  ]
})

export { store, FeathersVuex, Todo }
