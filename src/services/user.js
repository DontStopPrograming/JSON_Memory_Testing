import { getAllUsers as usersRepository } from '../repositories/user'

export const getAllUsers = async () => {
    return await usersRepository()
}