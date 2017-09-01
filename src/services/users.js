import { types, process } from "mobx-state-tree"
import axios from "axios"

export const User = types.model({
  id: types.identifier(types.string),
  name: types.optional(types.string, "")
})

export const UsersStore = types
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
