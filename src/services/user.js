import { getAllUsers as usersRepository } from '../repositories/user.js'

export const getAllUsers = async () => {
    return await usersRepository()
}