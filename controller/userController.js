import UserModel from "../model/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class userController{
    static userRegistration = async (req,res)=>{
        const {name,email,password,password_confirmation,tc} = req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            res.send({"status":"email already exist"})
        }
        else{
            if(name && email && password && password_confirmation && tc){
                if(password === password_confirmation)
                {
                    try {
                        const salt = await bcrypt.genSalt(10)
                        const hassPassword = await bcrypt.hash(password,salt)
                        const doc = new UserModel({
                            name:name,
                            email:email,
                            password:hassPassword,
                            tc:tc
                        })
                        await doc.save();
                        const saved_user = await UserModel.findOne({email:email})

                        //Generate jwt Token

                        const token = jwt.sign({userID:saved_user._id},
                            process.env.JWT_SECRET_KEY,{expiresIn:'5d'})

                        return res.status(201).send({"status":"Succesfully register","token":token})
                    } catch (error) {
                        console.log(error);
                        res.send({"status":"Unable to register"})
                    }
                }
                else{
                    res.send({"status":"password doesn't match "})
                }
            }
            else{
                res.send({"status":"All fields are required"})
            }
        }
    }

    static userLogin = async (req,res) =>{
        try {
            const {email,password} = req.body
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user != null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email) && isMatch){
                        const saved_user = await UserModel.findOne({email:email})

                        //Generate jwt Token

                        const token = jwt.sign({userID:saved_user._id},
                            process.env.JWT_SECRET_KEY,{expiresIn:'5d'})
                        res.send({"status":"WELCOME TO DASHBOARD","name": user.email , "token" : token})
                    }
                    else{
                        res.send({"status":"Password or email doesnt valid"})
                    }  
                }
                else{
                    res.send({"status":"You are not registered user"})  
                }
            }
            else{
                res.send({"status":"All fields are required"})
            }
        } catch (error) {
            console.log(error);
            res.send({"status":"Unable to login"})
        }
    }
    static changePassword = async(req,res)=>{
        const {password,password_confirmation} =req.body
        if(password && password_confirmation){
            if(password !== password_confirmation){
                res.send({"status":"Password and confirm password does not match"})
            }
            else{
                const salt = await bcrypt.genSalt(10)
                const newHashPassword = await bcrypt.hash(password,salt)
                await UserModel.findByIdAndUpdate(req.user._id,{$set:{password:newHashPassword}})
                res.send({"status":"Password successfully changed"})
            }
        }
        else{
            res.send({"status":"All fields are required"})
        }
    }
    static getAllUser = async(req,res)=>{
        try {
            const users = await UserModel.find({})
             .populate("todos")
            res.status(200).json({
                data:users,
                message:"success"
            })
        } catch (error) {
            console.log(error);
            res.send({"status":"server error"})
        }
    }

}

export default userController