import './styles/fonts.scss'
import './styles/index.scss'
import 'react-hot-loader'
import * as serviceWorker from './service-worker'
import App from 'components/global/App'
import ReactDOM from 'react-dom'
import Wrapper from 'components/global/Wrapper'

const root = document.getElementById('root')!
const maintenance = ['true', '1'].includes(process.env.MAINTENANCE_MODE || '')

// Used in error handler to detect that old browser prevented
// page from rendering
window.TREE_MOUNTED = true
ReactDOM.render(
  <Wrapper>
    <App maintenance={maintenance} />
  </Wrapper>,
  root,
)

serviceWorker.register()
