const express = require('express')
const app = express()

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  // first route

  app.get('/', (request, response) => {
    response.send('<h1>Hello Jose! Love you sooo much!!!</h1>')
  })
  
  // second route
  app.get('/api/notes', (request, response) => {
    response.json(notes)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })