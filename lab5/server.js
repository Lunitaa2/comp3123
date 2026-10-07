/**
 * use express routes to serve the page app.use()
 */

const express = require("express");
const fs = require("fs");
let dateFormat = require("dateformat");
if (dateFormat.default) {
  dateFormat = dateFormat.default;
}

// Relative local imports
const books = require("./Book.js");
const computers = require("./Computers.js");

const app = express();
const router = express.Router();

// Helper function to append to log file
let writeData = (data) => {
  data += "\n";
  fs.appendFile("server_log.txt", data, function (error) {
    if (error) {
      throw error;
    }
    console.log("Log saved!");
  });
};

// Global logger middleware
let logger = (request, response, next) => {
  const todays = dateFormat(new Date(), "dddd, mmmm dS, yyyy, h:mm:ss TT");
  let data = `[${todays}] ${request.originalUrl}`;
  writeData(data);
  next();
};

// Apply logger middleware
app.use(logger);

// Route-specific logger for /books
let booksLogger = (request, response, next) => {
  console.log("Books logger called");
  next();
};

// Mount route handlers
app.use("/books", booksLogger, books);
app.use("/books/computers", computers);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log("Web server is listening at port: " + PORT);
});
