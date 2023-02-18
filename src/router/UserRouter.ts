import express from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserController } from "../controller/UserController"
import { UserDatabase } from "../database/UserDatabase"
import { UserDTO } from "../dtos/UserDTO"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"

export const userRouter = express.Router()

const userController = new UserController(
    new UserDTO(),
    new UserBusiness(
        new UserDatabase(),
        new IdGenerator,
        new TokenManager,
        new HashManager()
    )
)

userRouter.get("/", userController.getUsers)
userRouter.post("/signup", userController.signupUser)
userRouter.post("/login", userController.loginUser)
