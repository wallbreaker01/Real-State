import { test, updateUserInfo, getUserListings } from '../controllers/user.controller.js';
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test',test);
router.post('/update/:id', verifyToken,updateUserInfo);
router.get('/listings/:id', verifyToken,getUserListings);

export default router;
