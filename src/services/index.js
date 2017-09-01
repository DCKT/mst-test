import { types, process } from "mobx-state-tree"
import axios from "axios"

const User = types.model({
  id: types.identifier(types.string),
  name: types.optional(types.string, "")
})

const UsersStore = types
  .model({
    users: types.optional(types.array(User), []),
    state: types.optional(types.enumeration(["pending", "done", "error"]), "pending")
  })
  .actions(self => ({
    fetchAllUsers: process(function* fetchAllUsers() {
      self.state = "pending"
      try {
        self.users = yield axios.get("http://localhost:3000/users").then(res => res.data)
        self.state = "done"
      } catch (e) {
        console.error("Failed to fetch users", e)
        self.state = "error"
      }
    })
  }))

const Todo = types
  .model({
    name: types.optional(types.string, ""),
    done: types.optional(types.boolean, false),
    user: types.maybe(types.reference(types.late(() => User)))
  })
  .actions(self => ({
    setName(newName) {
      self.name = newName
    },
    toggle() {
      self.done = !self.done
    },
    setUser(user) {
      self.user = user ? user : null
    }
  }))

const TodoStore = types
  .model({
    todos: types.optional(types.map(Todo), {})
  })
  .views(self => ({
    get pendingCount() {
      return self.todos.values().filter(todo => !todo.done).length
    },
    get completedCount() {
      return self.todos.values().filter(todo => todo.done).length
    }
  }))
  .actions(self => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }))
    }
  }))

const RootStore = types.compose("Store", UsersStore, TodoStore)

export const store = RootStore.create()
