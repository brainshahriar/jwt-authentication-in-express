import todoModel from "../model/Todo.js";
import UserModel from "../model/User.js";
import fs from 'fs'


class todoController{
    static postTodo = async (req,res)=>{
        const newTodo = new todoModel({
            ...req.body,
            image:req.file.filename,
            user:req.user
        });
        try {
             const todo = await newTodo.save()
             await UserModel.updateOne({
                 _id:req.user
             },{
                 $push:{
                     todos:todo._id
                 }
             })
            return res.send({"status":"Data Inserted"})
        } catch (error) {
            console.log(error);
            return  res.send({"status":"Server side error"})
        }
    }

    static getTodo = async (req,res)=>{
        try {
            todoModel.find({})
            .populate("user","name")
            .exec((err,data)=>{
                if(err)
                {
                return res.send({"status":"Not found"})
                }
                else{
             res.status(200).json({
                result:data,
                message:"success"
            })
                }
            })        
        } catch (error) {
            console.log(error);
            return res.send({"status":"Something error"})
        }
    }
    static updateTodo = async(req,res)=>{

        try {
            const img = await todoModel.findById(req.params.id)
            fs.unlink('./uploads/'+img.image,(err)=>{
                if(err){
                    console.log(err);
                }
            })
            const todos = await todoModel.findByIdAndUpdate(req.params.id,({...req.body,
                image:req.file.filename,
                user:req.user}));
             await todos.save()
             return res.send({"status":"Updated"})

        } catch (error) {
            return res.send({"status":"Error"})
        }

    }

    static deleteTodo = async (req,res)=>{
        try {
            const img = await todoModel.findById(req.params.id)
            fs.unlink('./uploads/'+img.image,(err)=>{
                if(err){
                    console.log(err);
                }
            })
           await todoModel.findByIdAndDelete(req.params.id)
            return res.send({"status":"Deleted"})

        } catch (error) {
            return res.send({"status":"Error"})
        }
    }
}
export default todoController