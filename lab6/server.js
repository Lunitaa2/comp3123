/* Purpose:
Set up Express web server, connect to MongoDB Atlas, and mount Note routes
*/

const express = require("express");
const mongoose = require("mongoose");
const noteRoutes = require("./routes/NoteRoutes");

const PORT = process.env.PORT || 8081;

// MongoDB Atlas connection string
const DB_URL =
  "mongodb+srv://101477171_db_user:LunaPass2026@week06cluster.fzjutf8.mongodb.net/notes_db?retryWrites=true&w=majority";

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get("/", (request, response) => {
  response.send(
    "<h1>Welcome to Note taking application - Week06 Exercise</h1>",
  );
});

// Mount routes at /api (endpoints will be /api/notes, /api/notes/:noteId)
app.use("/api", noteRoutes);

// Connect to MongoDB Atlas and start server
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Successfully connected to the MongoDB Atlas server");
    app.listen(PORT, () => {
      console.log(`Server listening at port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Could not connect to the MongoDB server:", error);
    process.exit(1);
  });
