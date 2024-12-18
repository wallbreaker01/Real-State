import express from 'express';
import { createListing , deleteListing , updateListing , getListing } from '../controllers/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const listingRouter = express.Router();
listingRouter.post('/create',verifyToken, createListing);
listingRouter.post('/update/:id' , verifyToken , updateListing);
listingRouter.delete('/delete/:id', verifyToken , deleteListing);
listingRouter.get('/get/:id' , getListing);
 

export default listingRouter;