const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const cssHandler = require('./cssResponses.js');
const responseHandler = require('./mainResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// pairs urls with the calls
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': cssHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);

  // query parameters
  const params = query.parse(parsedUrl.query);

  const acceptedType = request.headers.accept.split(',')[0];

  // calls the correct thing based on the struct
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](request, response, acceptedType, params);
  } else {
    urlStruct.notFound(request, response, acceptedType, params);
  }
};

// run server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
