import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Provider as ReduxProvider} from "react-redux";
import store from './store'
import {HashRouter} from 'react-router-dom'

const root = createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <ReduxProvider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </ReduxProvider>
)
