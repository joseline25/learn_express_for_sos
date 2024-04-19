const express = require("express");
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// first route

app.get("/", (request, response) => {
  response.send("<h1>Hello Jose! Love you sooo much!!!</h1>");
});

// second route : fetch all the data from the ressource
app.get("/api/notes", (request, response) => {
  response.json(notes);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/*
  REST APIs 
  to access and modify ressources
  */

// fetch all data of the ressources



// fetching a single ressource

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

// deleting a ressource : can only be seen in postman

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

// Post request

app.use(express.json());

// app.post('/api/notes', (request, response) => {
//   const note = request.body // most important for the POST request
//   console.log(note)
//   response.json(note)
// })

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false, // par défaut, si il n'y a pas la clé "important", on set à false
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});
/*
    {   
    "id":4,
	"content": "My first post request",
    "important": true
}

{
    "name": "sample",
    "time": "Wed, 21 Oct 2015 18:27:50 GMT"
}
*/
