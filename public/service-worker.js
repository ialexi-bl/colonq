self.addEventListener('push', (e) => {
  const { title, ...data } = e.data.json()
  self.registration.showNotification(title, data)
})
