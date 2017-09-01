import { types, process } from "mobx-state-tree"
import axios from "axios"

import { User, UsersStore } from "./users"

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
    todos: types.optional(types.array(Todo), [])
  })
  .views(self => ({
    get pendingCount() {
      return self.todos.filter(todo => !todo.done).length
    },
    get completedCount() {
      return self.todos.filter(todo => todo.done).length
    }
  }))
  .actions(self => ({
    addTodo(id, name) {
      self.todos.set(id, Todo.create({ name }))
    },
    fetchAllTodos: process(function* fetchAllTodos() {
      try {
        self.todos = yield axios.get("http://localhost:3000/todos").then(res => res.data)
      } catch (e) {
        console.error("Failed to fetch users", e)
      }
    })
  }))

const RootStore = types.compose("Store", UsersStore, TodoStore)

export const store = RootStore.create()
