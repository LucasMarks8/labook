import { UserDatabase } from "../database/UserDatabase";
import { EditUserInputDTO } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { UserDB } from "../Types";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase
    ) { }

    public getUser = async (input: any) => {
        const { q } = input

        const usersDB = await this.userDatabase.findUsers(q)

        const users: User[] = usersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        ))
        return ({
            message: "Lista de usuários",
            users: users
        })
    }

    public createUser = async (input: any) => {
        const { id, name, email, password, role } = input

        const userDBExists = await this.userDatabase.findUserById(id)

        if (userDBExists) {
            throw new BadRequestError("'id' já existe");
        }

        const newUser = new User(
            id,
            name,
            email,
            password,
            role,
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

        return ({
            message: "usuário criado com sucesso",
            newUser: newUser
        })
    }

    public editUser = async (input: EditUserInputDTO) => {
        const { idToEdit, name, email, password, role } = input

        if (idToEdit[0] !== "u") {
            throw new BadRequestError("'id' deve iniciar com a letra 'u'")
        }

        const user = await this.userDatabase.findUserById(idToEdit)

        if (!user) {
            throw new NotFoundError("usuário não encontrado")
        }

        const newUser = new User(
            user.id,
            user.name,
            user.email,
            user.password,
            user.role,
            user.created_at
        )

        if (name !== undefined) {
            newUser.setName(name)
        }

        if (email !== undefined) {
            newUser.setEmail(email)
        }

        if (password !== undefined) {
            newUser.setPassword(password)
        }

        if (role !== undefined) {
            newUser.setRole(role)
        }

        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail(),
            password: newUser.getPassword(),
            role: newUser.getRole(),
            created_at: newUser.getCreatedAt()
        }

        await this.userDatabase.editUser(newUserDB, idToEdit)

        const outPut = {
            message: "usuário atualizado com sucesso",
            user: newUser
        }

        return outPut
    }

    public deleteUser = async (input: any) => {
        const { idToDelete } = input

        const userDBExists = await this.userDatabase.findUserById(idToDelete)

        if (!userDBExists) {
            throw new NotFoundError("usuário não encontrado");
        }

        await this.userDatabase.deleteUser(idToDelete)

        const outPut = {
            message: "usuário deletado com sucesso"
        }

        return outPut
    }
}