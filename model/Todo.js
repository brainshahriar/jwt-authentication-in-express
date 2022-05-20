import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
        title: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true },
        user:{
            type:mongoose.Types.ObjectId,
            ref:"user"
        },
        image:{
            type:String,
            required:true
        }
})

const todoModel = mongoose.model("todo",todoSchema)

export default todoModel