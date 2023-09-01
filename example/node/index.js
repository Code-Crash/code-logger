const logger = require('code-logger');
const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  console.log('do-console....');
  console.log(logger.helpers.isApiEnabled());
  res.json({ message: 'test' });
});

app.get('/do-start', (req, res) => {
  console.log('do-start....');
  logger.doStart();
  logger.helpers.setApi('https://test.in.sg');
  res.json({ message: 'test' });
});

app.get('/do-stop', (req, res) => {
  console.log('do-stop....');
  logger.doStop();
  res.json({ message: 'test' });
});

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`)
});

const gFetch = global.fetch;

global.fetch = async (...args) => {
  // console.log('arguments: ', args);
  return gFetch.apply(this, args);
}

fetch('http://google.com').then(data => { console.log('data.ok: ', data.ok) }).catch((error) => { console.log('error:', error) });