
import express, { request } from 'express'
import mongoose from 'mongoose'
import userRouter from './router/useRouter.js'
import productRouter from './router/productRouter.js'
import authorizedUser from './lib/jwtMiddleware.js'

import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI).then( // mongoose.connect(mongoURI) - is a promise
    ()=>{
        console.log("MongoDB is connected...") //if the promise is correct, it is run
    }
) .catch( 
    ()=>{
        console.log("Error connecting to MongoDB!") //if the promise is wrong, it is run
    }
)

const app = express()
app.use(cors()) //middleware to allow cross-origin requests
app.use(express.json()) //middleware to parse json data
app.use(authorizedUser)

app.use("/api/users",userRouter)
app.use("/api/products",productRouter)


function started(){
    console.log("Server Started.....")
}

app.listen(3000,started)
//It's can also type like this - Using arrow functions
//app.listen(3000, ()=>{console.log("Server Started.....")})
