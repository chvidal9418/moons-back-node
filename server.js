const express = require('express');
const { SERVER_PORT } = require('./congif');
const app = express();
const ioServer = require('./socket')(app);


app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success'
  });
});


ioServer.listen(SERVER_PORT, () => console.log(`App running on port ${SERVER_PORT}`));




