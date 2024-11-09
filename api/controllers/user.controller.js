import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
import e from 'express';
import Listing from '../models/listing.model.js';


export const test = (req, res) => {
    res.json({
        message: 'Hello World'
    });
}

export const updateUserInfo = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You're not authorized to perform this action"));
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

<<<<<<< HEAD
        const updateUserInfo = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
=======
        const  updateUserInfo = await User.findByIdAndUpdate(req.params.id ,{
            $set: {
                username : req.body.username,
                email : req.body.email,
                password: req.body.password,
                avatar : req.body.avatar,
>>>>>>> e249a16fc403de5249b7495d799fe4ccb27be350

        if (!updateUserInfo) {
            return next(errorHandler(404, "User not found"));
        }

        const { password, ...rest } = updateUserInfo._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
<<<<<<< HEAD
};

export const getUserListings = async (req, res, next) => {
    if(req.user.id === req.params.id){
        try{
            const listings = await Listing.find({userRef: req.params.id});
            if(!listings){
                return next(errorHandler(404, "User not found"));
            }
            
            res.status(200).json(listings);

        }catch(error){
            next(error);
        }
    }else{
        return next(errorHandler(401, "You're not authorized to perform this action"));
    }
=======
}


export const  getUserListings = async(req, res, next) =>{

    if(req.user.id === req.params.id){
  
     try{

        const listings = await Listing.find({userRef: req.params.id});
        res.satus(200).json(listings);

     }catch(error){
        next(error)
     }
    
    }else{
        return next(errorHandler(401, 'You can only view'));
    }


>>>>>>> e249a16fc403de5249b7495d799fe4ccb27be350
}