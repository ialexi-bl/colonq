import 'styles/index.scss'
import { Wrapper } from 'components/Wrapper'
import React from 'react'
import ShapesManager from 'components/ShapesManager'

const styled = { div: (a: any) => a[0] }
const styles = styled.div`
  :root {
    --primary: #151529;
  }
  body {
    font-family: Roboto, Ubuntu, Helvetica, sans-serif;
    background: var(--primary);
    color: #eee;
  }
  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  * {
    box-sizing: border-box;
  }
`

export default ({ children }: HTMLProps.div) => {
  const el = document.body.firstChild!
  if (el.nodeType === 3 && el.textContent?.startsWith('/static/media/'))
    el.remove()

  return (
    <Wrapper applyClassName={() => {}}>
      <ShapesManager />
      <style>{styles}</style>
      {children}
    </Wrapper>
  )
}
