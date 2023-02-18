import { BadRequestError } from "../errors/BadRequestError";
import { User } from "../models/User";
import { Role, UserModel } from "../Types";

export interface GetUsersInput {
    q: unknown,
    token: string | undefined
}

export type GetUsersOutput = UserModel[]

export interface SignupUserInputDTO {
    name: string,
    email: string,
    password: string
}

export interface SignupUserOutputDTO {
    message: string,
    user: {
        id: string,
        name: string,
        email: string,
        password: string,
        role: Role,
        createdAt: string
    }
}
export interface LoginUserInputDTO {
    email: string,
    password: string
}

export interface LoginUserOutputDTO {
    message: string,
}

export class UserDTO {
    constructor () {}

    public signupUserInput(
        name: unknown,
        email: unknown,
        password: unknown
    ): SignupUserInputDTO {

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser bolean")
        }

        const dto: SignupUserInputDTO = {
            name,
            email,
            password
        }

        return dto
    }

    public signupUserOutput(user: User): SignupUserOutputDTO {
        const dto: SignupUserOutputDTO = {
            message: "usuário registrado com sucesso",
            user: {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole(),
                createdAt: user.getCreatedAt()
            }
        }

        return dto
    }

    public loginUserInput(
        email: unknown,
        password: unknown
    ): LoginUserInputDTO {

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser bolean")
        }

        const dto: LoginUserInputDTO = {
            email,
            password
        }

        return dto
    }

    public loginUserOutput(user: User): LoginUserOutputDTO {
        const dto: LoginUserOutputDTO = {
            message: "usuário conectado com sucesso",
        }

        return dto
    }
}