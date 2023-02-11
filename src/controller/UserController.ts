import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDTO } from "../dtos/UserDTO";
import { BaseError } from "../errors/BaseError";

export class UserController {
    constructor(
        private userDTO: UserDTO,
        private userBusinnes: UserBusiness
    ) { }

    public getUsers = async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.query.q
            }

            const outPut = await this.userBusinnes.getUser(input)

            res.status(200).send(outPut)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const input = this.userDTO.createUserInput(
                req.body.id,
                req.body.name,
                req.body.email,
                req.body.password,
                req.body.role
            )

            const outPut = await this.userBusinnes.signupUser(input)

            res.status(201).send(outPut)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public editUser = async (req: Request, res: Response) => {
        try {
            const input = this.userDTO.editUserInput(
                req.params.id,
                req.body.name,
                req.body.email,
                req.body.password,
                req.body.role
            )

            const outPut = await this.userBusinnes.editUser(input)

            res.status(200).send(outPut)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }

    public deleteUser = async (req: Request, res: Response) => {
        try {
            const input = { idToDelete: req.params.id }

            const outPut = await this.userBusinnes.deleteUser(input)

            res.status(200).send(outPut)

        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}