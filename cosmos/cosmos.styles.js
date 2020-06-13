;(() => {
  let style = document.createElement('style')
  style.innerHTML = `
  body { 
    font-family: Ubuntu, Helvetica, sans-serif; 
    background: #151529;
  }
  html, body, #root {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  * {
    box-sizing: border-box;
  }
  `

  document.body.append(style)
})()
