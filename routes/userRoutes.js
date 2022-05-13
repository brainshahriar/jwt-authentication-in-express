import express from 'express'
const router = express.Router();
import userController from '../controller/userController.js';
import checkUserAuth from '../middleware/authmiddleware.js'

//protect route
router.use('/changepassword',checkUserAuth)

//public route

router.post('/register',userController.userRegistration)
router.post('/login',userController.userLogin)



//protected route

router.post('/changepassword',userController.changePassword)


export default router