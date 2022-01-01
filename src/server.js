import feathers from '@feathersjs/feathers'
import { softDelete } from 'feathers-hooks-common'
import ls from 'feathers-localstorage'
import mem from 'feathers-memory'

// #################### Isomorphic Server ####################
const app = feathers()

try {
  app.use('todos', ls({ storage: window.localStorage }))
} catch (e) {
  app.use('todos', mem()) // LS treated as Third party in iFrame
}

const todoService = app.service('todos') // Get the service we registered above
todoService.hooks({
  before: {
    all: [softDelete()]
  }
})
async function addBuiltInTodo(query, once = false) {
  // server-side built-in todo
  const list = await todoService.find({
    query,
    disableSoftDelete: once // paramsFromClient
  })
  if (list.length === 0) {
    todoService.create({ name: `${query.name}` })
  }
}
addBuiltInTodo({ name: 'Learn feathers-vuex' }, true)
setInterval(() => addBuiltInTodo({ name: 'Deprecated, see index.js' }), 10000)

export default () => app // making this server look normal
