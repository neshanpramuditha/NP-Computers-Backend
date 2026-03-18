import express from 'express'
import { createUser, getUsers, loginUser } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post("/", createUser) 
userRouter.post("/login", loginUser)
userRouter.get("/profile", getUsers)

export default userRouter
