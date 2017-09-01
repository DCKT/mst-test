import React, { Component } from "react"
import { observer } from "mobx-react"

/**
 * Components
 */
import { TodoView } from "./Todo"

const TodoCounter = observer(props => <h5>Remaining {props.store.pendingCount}</h5>)

class App extends Component {
  componentDidMount() {
    this.props.store.fetchAllUsers()
  }
  render() {
    return (
      <div>
        <h3>Todos</h3>
        <hr />
        <TodoCounter store={this.props.store} />
        <button onClick={e => this.props.store.addTodo(Date.now(), "test")}>Add task</button>
        {this.props.store.todos
          .values()
          .map((todo, i) => <TodoView key={i} todo={todo} store={this.props.store} />)}
      </div>
    )
  }
}

export default observer(App)
