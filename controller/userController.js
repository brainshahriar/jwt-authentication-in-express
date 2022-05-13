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
                        res.status(201).send({"status":"Succesfully register"})
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
                        res.send({"status":"WELCOME TO DASHBOARD"})
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
}

export default userController