import {
    getAllUsers as usersRepository,
    getUserById as userByIdRepository

} from '../repositories/user.js'

export const getAllUsers = async () => {
    return await usersRepository()
}

export const getUserById = async (id) => {
    return await userByIdRepository(id)
}