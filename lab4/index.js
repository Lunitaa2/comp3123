/* purpose:
serve multiple paths from an express server using routes
serve a static html file
extract GET params */

app.use(express.static("public"));
const express = require("express");
const app = express();

const SERVER_PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root
app.get("/", (request, response) => {
  response.send(
    "<h1>Welcome to the root of the server - using GET method</h1>",
  );
});

// Hello
app.get("/hello", (request, response) => {
  response
    .status(200)
    .send("<h1>welcome to the /hello path on the server</h1>");
});

// College
app.get("/college", (request, response) => {
  const college = {
    name: "George brown polytechnic",
    location: "toronto",
    established: 1967,
  };
  response.json(college);
});

// Query params: /students?name=John&age=20
app.get("/students", (request, response) => {
  if (!request.query.name || !request.query.age) {
    return response.status(400).json({ error: "missing query parameters" });
  }

  const name = request.query.name;
  const age = request.query.age;

  response.json({
    student_name: name,
    student_age: age,
  });
});

// Path params: /student/John/20
app.get("/student/:name/:age", (request, response) => {
  if (!request.params.name || !request.params.age) {
    return response
      .status(400)
      .json({ error: "you must pass in name and age" });
  }

  const name = request.params.name;
  const age = request.params.age;

  response.json({
    student_name: name,
    student_age: age,
  });
});

// POST body: /students
app.post("/students", (request, response) => {
  const student = request.body;
  const { name, age } = student;

  if (!name || !age) {
    return response
      .status(400)
      .json({ error: "missing either name or age in body" });
  }

  response.json({
    student_name: name,
    student_age: age,
  });
});

app.listen(SERVER_PORT, () => {
  console.log("Server is running on http://localhost:" + SERVER_PORT);
});
