import './styles/fonts.scss'
import './styles/index.scss'
import 'react-hot-loader'
import * as serviceWorker from './service-worker'
import { App } from 'components/App'
import { Wrapper } from 'components/Wrapper'
import React from 'react'
import ReactDOM from 'react-dom'

const root = document.getElementById('root')!
const applyClassName = (className: string) => {
  root.className += ` ${className}`
}

const maintenance = ['true', '1'].includes(process.env.MAINTENANCE_MODE || '')
if (maintenance) {
  applyClassName('p-0')
}

// Used in error handler to detect that old browser prevented
// page from rendering
window.TREE_MOUNTED = true
ReactDOM.render(
  <Wrapper applyClassName={applyClassName}>
    <App maintenance={maintenance} />
  </Wrapper>,
  root,
)

// If you want your app to work offline and load faster, you can ch a nge
// unregister() to register() below. Note this comes with some pit f al ls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
