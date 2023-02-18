import { UserDatabase } from "../database/UserDatabase";
import { GetUsersInput, GetUsersOutput, LoginUserInputDTO, SignupUserInputDTO, SignupUserOutputDTO } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager, TokenPayload } from "../services/TokenManager";
import { UserDB, Role } from "../Types";

export const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) { }

    public getUser = async (input: GetUsersInput): Promise<GetUsersOutput> => {
        const { q, token } = input

        if (typeof q !== "string" && q !== undefined) {
            throw new BadRequestError("'q' deve ser string ou undefined");
        }

        if (typeof token !== "string") {
            throw new BadRequestError("'token' está vazio");
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("token não é válido");
        }

        if(payload.role !== Role.ADMIN) {
            throw new BadRequestError("permissão não é suficiente"); 
        }

        const usersDB = await this.userDatabase.findUsers(q)

        const users = usersDB.map((userDB) => {
           const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
            )

            return user.toBusinessModel()
        })

        const output: GetUsersOutput = users

        return output
    }

    public signupUser = async (input: SignupUserInputDTO) => {
        const { name, email, password } = input

        if (!email.match(regexEmail)) {
            throw new BadRequestError("'email' deve possuir letras minúsculas, deve ter um @, letras minúsculas, ponto (.) e de 2 a 4 letras minúsculas")
        }

        if (!password.match(regexPassword)) {
            throw new BadRequestError("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial");
        }

        const id = this.idGenerator.generate()

        const passwordHash = await this.hashManager.hash(password)

        const newUser = new User(
            id,
            name,
            email,
            passwordHash,
            Role.NORMAL,
            new Date().toISOString()
        )

        const newUserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }

        await this.userDatabase.insertUser(newUserDB)

        const tokenPayload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(tokenPayload)

        const output = {
            message: "usuário criado com sucesso",
            token: token
        }

        return output
    }

    public loginUser = async (input: LoginUserInputDTO) => {
        const { email, password } = input

        const userDB = await this.userDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado");
        }

        const passwordHash = await this.hashManager.compare(password, userDB.password)
        console.log(password);
        

        // if(!passwordHash) {
        //     throw new BadRequestError("'email' ou 'password' incorretos");
        // }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output = {
            message: "usuário logado com sucesso",
            token: token
        }

        return output
    }
}