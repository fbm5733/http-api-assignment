const fs = require('fs');

// load page
const index = fs.readFileSync(`${__dirname}/../client/client.html`);

// handles the index
const getIndex = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

module.exports = {
  getIndex,
};
