/* 
Setting up all the routes for the /books path
*/

const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  response.send("Books base route");
});

module.exports = router;
