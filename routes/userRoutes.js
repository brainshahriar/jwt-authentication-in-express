import express from 'express'
import todoController from '../controller/todoController.js';
const router = express.Router();
import userController from '../controller/userController.js';
import checkUserAuth from '../middleware/authmiddleware.js'

//protect route
router.use('/changepassword',checkUserAuth)
router.use('/todo',checkUserAuth)
//public route

router.post('/register',userController.userRegistration)
router.post('/login',userController.userLogin)

router.get('/getAllUser',userController.getAllUser)

//todo

router.post('/todo',todoController.postTodo)
router.get('/todo',todoController.getTodo)



//protected route

router.post('/changepassword',userController.changePassword)


export default router