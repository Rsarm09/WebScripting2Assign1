const express = require('express');
const booksRouter = express.Router();

//array of books w/ static image
const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', image: '/placeholder.jpg', year: 1925 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', image: '/placeholder.jpg', year: 1960 },
    { id: 3, title: '1984', author: 'George Orwell', image: '/placeholder.jpg', year: 1949 },
]

//GET a specific book by id
function findBookById(req, res, next) {

    // Convert the id to a number
    const requestedId = Number(req.params.id);

    //search through array of books, match each book's id to the requested id
    const bookData = books.find(book => book.id === requestedId);

    //check if the book is there, if it is, add it to the response object and call next
    //if not send a 404 status and a message
    if (bookData !== undefined) {

        //update bookData with the requested book, display requested book
        req.book = bookData;
        //move onto the next middleware/route handler
        next();

    } else {
        //send error message if book is not found
        res.status(404).send('Book not found');
        
    }
}

// GET /books
booksRouter.get('/books', (req, res) => {
    //display array of books
    res.send(books);

});

//GET a specific book by id by passing the middleware function findBookById then proceeding
booksRouter.get('/books/:id', findBookById, (req, res) => {
    //send the requested book as defined in the findBookById function
    res.send(req.book);

});

//POST a new book to the list
booksRouter.post('/books', (req, res) => {
    //assign the newly added book to the request's body
    const book = req.body;

    //add the new book to the array
    book.id = books.length + 1;

    //push will append the new book to the array
    books.push(book);

    //send a success code for creating a new book
    res.status(201).send(book);
});

//PUT/update a book in the list
booksRouter.put('/books/:id', findBookById, (req, res) => {

    //assign the updated book to the request's body
    const book = req.body;

    //find the index of the book in the array
    const index = books.indexOf(req.book);

    //replace the book at the index with the new book
    books[index] = book;

    //send the updated book
    res.send(book);
});

//DELETE a book from the list
booksRouter.delete('/books/:id', findBookById, (req, res) => {

    // Convert the id to a number
    const requestedId = Number(req.params.id);

    //search through array of books, match each book's id to the requested id
    const requestedData = books.find(book => book.id === requestedId);

    //check if the book exists, if it does, delete it and send a 204 status
    if (requestedData !== undefined) {
        books.splice((requestedData.id - 1), 1);

        res.status(204).send('Book deleted');

    } else {

        res.status(404).send('Book not found');

    }


});

//export the booksRouter to the main app
module.exports = booksRouter;