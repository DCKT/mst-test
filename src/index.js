import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App"
import registerServiceWorker from "./registerServiceWorker"
import { store } from "./services/index"
import { observer } from "mobx-react"

const State = observer(props => <pre>{JSON.stringify(props.store.toJSON(), null, 2)}</pre>)

ReactDOM.render(
  <div style={{ margin: "50px auto", width: "500px" }}>
    <App store={store} />
    <State store={store} />
  </div>,
  document.getElementById("root")
)
registerServiceWorker()
