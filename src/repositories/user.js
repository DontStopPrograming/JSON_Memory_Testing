//Using uuidv4
import { v4 as uuidv4 } from 'uuid'

// Using import files
import fs from 'fs'

// Using import path url direction
import path from 'path'

const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')

/**
 * The `readUsers` function reads and parses JSON data from a file specified by `filePath`.
 * @returns The function `readUsers` is returning the data read from the file located at `filePath`
 * after parsing it as JSON.
 */
const readUsers = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8')
        return JSON.parse(data)
    } catch (error) {
        console.error('Error reading user data:', error)
        return []
    }
}

/**
 * The function `writeUsers` writes user data to a file in JSON format with proper indentation.
 * @param user - The `user` parameter in the `writeUsers` function is the data that you want to write
 * to a file. It should be an object that you want to convert to a JSON string and save to a file.
 */
const writeUsers = (users) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
    } catch (error) {
        console.error('Error writing user data', error)
    }
}

export const getUserByEmail = (email) => {
    const users = readUsers()
    return users.find(user => user.email === email) || null
}

export const getAllUsers = () => readUsers()

export const getUserById = (id) => {
    const users = readUsers()
    return users.find(user => user.id === id)
}

export const createUser = (newUser) => {
    const users = readUsers()

    if (!Array.isArray(users)) {
        throw new TypeError('User data should be an array')
    }

    const userExist = users.some(user => user.email === newUser.email)
    if (userExist) {
        return null
    }

    users.push(newUser)
    writeUsers(users)

    return newUser

    // const newUser = { ...user, id: uuidv4() }
    // users.push(newUser)
    // writeUsers(users)
    // return newUser
}

export const updateUser = (id, updatedData) => {
    const users = readUsers()
    const index = users.findIndex(u => u.id === id)
    if (index === -1) return null
    users[index] = { ...users[index], ...updatedData }
    writeUsers(users)
    return users[index]
}

export const deleteUser = (id) => {
    const users = readUsers()
    const index = users.findIndex(u => u.id === id)
    if (index === -1) return null
    const [deletedUser] = users.splice(index, 1)
    writeUsers(users)
    return deletedUser

}