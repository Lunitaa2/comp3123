/*
This file will be used for computer book routes
*/

const express = require("express");
const router = express.Router();

router.route("/java").post((request, response) => {
  response.send("used POST METHOD - /books/computers/java");
});

router.route("/python").put((request, response) => {
  response.send("used PUT METHOD - /books/computers/python");
});

router.route("/game-dev").get((request, response) => {
  response.send("used GET METHOD - /books/computers/game-dev");
});

module.exports = router;
