import React from "react"
import { observer } from "mobx-react"

const UserPickerView = observer(props => (
  <select value={props.user ? props.user.id : ""} onChange={e => props.onChange(e.target.value)}>
    <option value="">-none-</option>
    {props.store.users.map((user, i) => (
      <option key={i} value={user.id}>
        {user.name}
      </option>
    ))}
  </select>
))

export const TodoView = observer(props => (
  <div>
    <input type="checkbox" checked={props.todo.done} onChange={e => props.todo.toggle()} />
    <input type="text" value={props.todo.name} onChange={e => props.todo.setName(e.target.value)} />
    <UserPickerView
      user={props.todo.user}
      store={props.store}
      onChange={userId => props.todo.setUser(userId)}
    />
  </div>
))
