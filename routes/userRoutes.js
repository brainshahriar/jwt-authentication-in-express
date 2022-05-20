import express from 'express'
import todoController from '../controller/todoController.js';
const router = express.Router();
import userController from '../controller/userController.js';
import checkUserAuth from '../middleware/authmiddleware.js'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+ path.extname(file.originalname))
    }
  })
  

const upload = multer({
    storage:storage
}).single("image")

//protect route
router.use('/changepassword',checkUserAuth)
router.use('/todo',checkUserAuth)
//public route

router.post('/register',userController.userRegistration)
router.post('/login',userController.userLogin)

router.get('/getAllUser',userController.getAllUser)

//todo

router.post('/todo',upload,todoController.postTodo)
router.get('/todo',todoController.getTodo)
router.delete('/todoDelete/:id',todoController.deleteTodo)
router.patch('/todoupdate/:id',upload,todoController.updateTodo)


//protected route

router.post('/changepassword',userController.changePassword)


export default router