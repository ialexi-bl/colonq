const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const username = /^[\p{L}\p{N}\s_'-]+$/u
const usernameForbiddenChars = /([^\p{L}\p{N}\s_'-])/gu

const Regex = { email, username, usernameForbiddenChars }
export default Regex
