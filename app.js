import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import formData from 'express-form-data';
import bodyParser from 'body-parser'
import path from 'path'

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy
app.use(cors())
app.use(bodyParser.json())

app.use('/public',express.static('./uploads'));

// Database Connection
connectDB(DATABASE_URL)

// JSON
// app.use(express.json())
// app.use(formData.parse());

// Load Routes
app.use("/api/user", userRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})