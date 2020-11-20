import 'styles/index.scss'
import React from 'react'
import ShapesManager from 'components/ShapesManager'
import Wrapper from 'components/Wrapper'

const styled = { div: (a: any) => a[0] }
const styles = styled.div`
  :root {
    --primary: #151529;
  }
  body {
    font-family: Ubuntu Mono, sans-serif;
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

const Decorator = ({ children }: HTMLProps.div) => {
  const el = document.body.firstChild!
  if (el.nodeType === 3 && el.textContent?.startsWith('/static/media/'))
    el.remove()

  return (
    <Wrapper>
      <ShapesManager />
      <style>{styles}</style>
      {children}
    </Wrapper>
  )
}
export default Decorator
