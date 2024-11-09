<<<<<<< HEAD
import { test, updateUserInfo, getUserListings } from '../controllers/user.controller.js';
=======
import { test, updateUserInfo , getUserListings } from '../controllers/user.controller.js';
>>>>>>> e249a16fc403de5249b7495d799fe4ccb27be350
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken,updateUserInfo);
<<<<<<< HEAD
router.get('/listings/:id', verifyToken,getUserListings);
=======
router.get('/listings/:id' , verifyToken , getUserListings);
>>>>>>> e249a16fc403de5249b7495d799fe4ccb27be350

export default router;
