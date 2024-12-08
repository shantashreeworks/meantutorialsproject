import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();


/* --------------- Route for Save a new Book ------------------------  */

// Using Express -> Router Post method to create / insert data  ------------------------------ Create in CRUD-----------------

router.post('/', async (request, response) => {
    // check request - all the parameters are available and no ne of the fields are empty
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message : 'Send all required fields: title, author, publishYear',
            }); 
        }     
        
        const newBook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear,
        };

        const book = await Book.create(newBook); // usinf mongoose schema for creating record
        return response.status(201).send(book);  // success message

    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message : error.message
        });
        
    }
});



// find ----------all the books Using Express -> Router GET method ------------------------------ Read in CRUD-----------------
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});

// find ----------specific book by id from the books Using Express -> Router GET method --------- Read in CRUD-----------------
router.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;

        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).json({ message : "Book not found"});
        } //---------------end-if----------

        return response.status(200).json(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});



// Using Express -> Router Put method to update data  ------------------------------ Update in CRUD-----------------

router.put('/:id', async (request, response) => {
    // check request - all the parameters are available and no ne of the fields are empty
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message : 'Send all required fields: title, author, publishYear',
            }); 
        } //---------------end-if---------

        const { id } = request.params;  // check the requested id of which data to be updated 

        const result = await Book.findByIdAndUpdate(id, request.body);  // send the data to mongoDB with the id to update using mongoose DB query

        if (!result) {
            return response.status(404).json({ message : "Book not found"});
        } //---------------end-if----------

        return response.status(201).json({message : "Details updated!"});  // success message

    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message : error.message
        });
        
    } //---------------end-Try-Catch---------
});


// Using Express -> Router delete method to delete data  ------------------------------ Delete in CRUD-----------------

router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;  // check the requested id of which data to be Deleted
        const result = await Book.findByIdAndDelete(id, request.body);  // send the data to mongoDB with the id to Delete using mongoose DB query
        if (!result) {
            return response.status(404).json({ message : "Book not found"});
        } //---------------end-if----------

        return response.status(201).json({message : "Book Deleted!"});  // success message

    } catch (error) {
        console.log(error.message);
        response.status(500).send({
            message : error.message
        });
    } //---------------end-Try-Catch---------
});

export default router;