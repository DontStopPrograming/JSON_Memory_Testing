import {
    getAllUsers as usersRepository,
    getUserById as userByIdRepository,
    createUser as userNewRepository,
    updateUser as userUpdatedRepository,
    deleteUser as userDeletedRepository

} from '../repositories/user.js'

export const getAllUsers = async () => {
    return await usersRepository()
}

export const getUserById = async (id) => {
    return await userByIdRepository(id)
}

export const createUser = async (user) => {
    const users = await userNewRepository()
    if (users.some(u => u.email === user.email)) {
        return null
    }
    return await createUserRepo(user)
}

export const updateUser = async (id, updatedData) => {
    return await userUpdatedRepository(id, updatedData)
}

export const deleteUser = async (id) => {
    return await userDeletedRepository(id)
}