// It should be a RESTful JSON API that listens on a port of your choice.

// When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want.

// Require global modules
const http = require('http');
const uRL = require('url');
const port = 3000;

// Require configuration for the current environment
const currEnvironment = require('./config.js')



// Create the server
const server = http.createServer((req, res) => {
  // Grab properties from request object to determing how the requst should be handled
  const { method, url, headers } = req;

  const parsedUrl = uRL.parse(url, true);
  const trimmedPath = parsedUrl.path.replace(/^\/+|\/+$/g, '');

  let body = [];
  // Handle errors on the request
  req.on('error', (err) => {
    console.error(err)
  }).on('data', (chunk) => {
    body.push(chunk)
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    // Determine which handler to use based on the path
    const handler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    const data = {
      'method': method,
      'headers': headers,
      'query': parsedUrl.query,
      'payload': body
    };

    handler(data, (statusCode, payload) => {

      statusCode = typeof(statusCode) == 'number' ? statusCode : 200
      payload = typeof(payload) == 'object' ? payload : {};

      const payloadString = JSON.stringify(payload)

      res.writeHead(statusCode, {
        'Content-Type': 'application/json'
      });
      res.end(payloadString)
      console.log(`Returning this response ${payloadString}`);
    })
  });








}).listen(port, () => {
  console.log(`You are listening on ${port}`)
});

// Create the handlers for the different request.
const handlers = {};

handlers.hello = (data, callback) => {
  callback(200, {'greeting': 'I hope you had a great day!'})
}

handlers.notFound = (data, callback) => {
  callback(404)
}

const router = {
  'hello': handlers.hello
}
