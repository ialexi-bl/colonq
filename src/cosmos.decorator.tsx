import React from 'react'

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

export default ({ children }: HTMLProps.div) => (
  <>
    <style>{styles}</style>
    {children}
  </>
)
