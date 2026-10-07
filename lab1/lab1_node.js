/* purpose
we'll use Node to create a server and then listen on that server for any incoming requests. then return a response.
*/

var http = require("http");
http
  .createServer((request, response) => {
    response.writeHead(200, {
      "Content-Type": "text/html",
    });
    response.end("the server is now running successful and listening");
  })
  .listen(8088);
