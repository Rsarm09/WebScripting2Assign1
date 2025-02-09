const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const booksRouter = require('./routes/books');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//path to public folder for static images
app.use(express.static(path.join(__dirname, 'public')));

//use the booksRouter for all routes starting with /bookapi
app.use('/bookapi', booksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}/`);
});


