import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { get } from "mongoose";
import { Book } from './models/bookModel.js';
import bookRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express(); // create a applicacation with express framework

app.use(express.json()); // middleware for parsing request body

// test NODE App is running ? 
// app.listen(PORT, () => { 
//     console.log(`App is listning to port : ${PORT}`);
//     console.log('App is listning to port :' + PORT  );
// });



//--------------- CORS - Cross Origin Resource Sharing Policy --------------
// Middleware for handling CORS Policy 
// Option 1: We can Allow All Origins with Default by cors(*):
app.use(cors());
// Option 2: We can Allow Specific Origin like IP/DNS with Custom Pre-Defined Policy
// app.use(cors({
//     origin:'http://localhost/3000',         //  port for the ReactJS Frontend application
//     methods:['GET','POST','PUT','DELETE'],  //  HTTP Methods that we have used in the middleware, Models and Routs ex. - bookRoute.js 
//     allowedHeaders:['Content-Type'],        //  check requets header as content-type
// }));




/* using HTTP get method */

app.get('/', (request,response) => {
    return response.status(234).send('Welcome to mern stack'); 
});


// using this bookRoute as middleware call all functionality of book module and via bookRoute. 
// This will also help to remove /book from bookRoutes and lets us use the parameters directly
app.use('/books', bookRoute); 


/* using mongoose MongoDB connection */

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log('DB Connection Successful')
    
    app.listen(PORT, () => { 
        console.log(`DB Connection Successful with : ${PORT}`);
    });
})
.catch((error)=>{
    console.error();
});


