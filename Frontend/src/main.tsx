import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import { Provider } from 'react-redux'
render(
  <Provider store={}>
    <App />
  </Provider>,
  document.getElementById('app') as HTMLElement
)
