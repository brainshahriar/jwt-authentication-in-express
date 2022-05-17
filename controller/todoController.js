import todoModel from "../model/Todo.js";
import UserModel from "../model/User.js";

class todoController{
    static postTodo = async (req,res)=>{
        const newTodo = new todoModel({
            ...req.body,
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
}
export default todoController