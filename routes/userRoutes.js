import express from 'express'
const router = express.Router();
import userController from '../controller/userController.js';

//public route

router.post('/register',userController.userRegistration)


//protected route


export default router