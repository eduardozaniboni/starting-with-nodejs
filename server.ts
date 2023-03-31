import http from "http";

http
  .createServer((request: any, response: any) => {
    response.writeHead(200, { "Content-Type": "application/json" });

    if (request.url === "/product") {
      response.end(
        JSON.stringify({
          message: "Product route",
        })
      );
    }

    if (request.url === "/user") {
      response.end(
        JSON.stringify({
          message: "User route",
        })
      );
    }

    response.end(
      JSON.stringify({
        message: "Route not found",
      })
    );
  })
  .listen(4001, () => console.log("Server starting up in 4001 port"));
