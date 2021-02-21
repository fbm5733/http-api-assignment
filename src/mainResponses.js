// Utility function that turns a json object into the
// correct data type and then writes the response.
const respond = (request, response, status, content, type) => {
  let writeContent = content;

  if (type === 'text/xml') {
    // turns what it gets into XML, checks before adding something to be certain it exists
    let responseXML = '<response>';
    if (content.message) {
      responseXML = `${responseXML}<message>${content.message}</message>`;
    }
    if (content.id) {
      responseXML = `${responseXML}<id>${content.id}</id>`;
    }
    responseXML = `${responseXML}</response>`;
    // finally sets the content
    writeContent = responseXML;
  } else {
    // if it's supposed to be JSON, just stringify it
    writeContent = JSON.stringify(content);
  }

  response.writeHead(status, { 'Content-Type': type });
  response.write(writeContent);
  response.end();
};

const success = (request, response, type) => {
  // message to send
  const responseJSON = {
    message: 'This is a successful response.',
  };

  // calls our respond function
  return respond(request, response, 200, responseJSON, type);
};

const badRequest = (request, response, type, params) => {
  // message to send
  const responseJSON = {
    message: 'This request has the required parameters.',
  };
    // status starts as success
  let status = 200;

  // changes message and id if it's invalid
  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true.';
    responseJSON.id = 'badRequest';
    // also updates status
    status = 400;
  }

  // calls our respond function
  return respond(request, response, status, responseJSON, type);
};

const unauthorized = (request, response, type, params) => {
  // message to send
  const responseJSON = {
    message: 'You have successfully viewed the content.',
  };
    // status starts as success
  let status = 200;

  // changes message and id if it's not logged in
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes.';
    responseJSON.id = 'unauthorized';
    // also updates status
    status = 401;
  }

  // calls our respond function
  return respond(request, response, status, responseJSON, type);
};

const forbidden = (request, response, type) => {
  // message to send
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  // calls our respond function
  return respond(request, response, 403, responseJSON, type);
};

const notFound = (request, response, type) => {
  // message to send
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  // calls our respond function
  return respond(request, response, 404, responseJSON, type);
};

const internal = (request, response, type) => {
  // message to send
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  // calls our respond function
  return respond(request, response, 500, responseJSON, type);
};

const notImplemented = (request, response, type) => {
  // message to send
  const responseJSON = {
    message: 'A request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  // calls our respond function
  return respond(request, response, 501, responseJSON, type);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  internal,
  notImplemented,
};
