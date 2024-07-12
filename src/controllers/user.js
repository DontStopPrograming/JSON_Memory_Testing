import user from '../data/user.json' assert { type: "json"}

//Using uuidv4
import { v4 as uuidv4 } from 'uuid'

import fs from 'fs'
import path from 'path'

export const getsUserList = async (req, res) => {
    try {
        const users = await user
        res.send(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR GET DATA' })
    }
}

export const getUserList = async (req, res) => {
    try {
        const userId = req.params.id

        const findUser = user.find(u => u.id === userId)
        res.status(200).send(findUser || res.status(400).json({ error: 'USER NOT FOUND' }))

    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR GET DATA' })
    }
}

export const postUserList = async (req, res) => {
    try {
        const users = await user
        const newUser = req.body

        const newUserWithId = { ...newUser, id: uuidv4() }
        const updatedUserList = [...users, newUserWithId]

        const updateUserAction = users.find(u => u.email === newUser.email)
            ? res.status(400).json({ error: 'EMAIL ALREADY REGISTERED' })
            : (() => {
                // Update the user data in your JSON file
                const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')
                fs.writeFileSync(filePath, JSON.stringify(updatedUserList, null, 2))

                return updatedUserList
            })()

        res.status(201).json(updateUserAction)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR POST DATA' })
    }
}

export const patchUserList = async (req, res) => {
    try {
        const users = await user
        const usersId = req.params.id
        const updateUser = req.body

        const index = users.findIndex(u => u.id === usersId)

        if (index === -1) {
            return res.status(404).json({ error: 'USER NOT FOUND' })
        }

        const updateUser = { ...users[index], ...updateUser }
        const updateUserList = [...users.slice(0, index), updateUser, ...users.slice(index + 1)]

        const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')
        fs.writeFileSync(filePath, JSON.stringify(updatedUserList, null, 2))

        res.status(200).json(updatedUser)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR UPDATING USER' })
    }
}

export const deleteUserList = async (req, res) => {
    try {
        const users = await user
        const usersId = req.params.id

        const index = users.findIndex(u => u.id === usersId)

        if (index === -1) {
            return res.status(404.json({ error: 'USER NOT FOUND' }))
        }

        const deleteUser = user[index]
        const updatedUserList = [...users.slice(0, index), ...users.slice(index + 1)]

        const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')
        fs.writeFileSync(filePath, JSON.stringify(updateUserList, null, 2))

        res.status(200).json(deleteUser)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR DELETING USER' })
    }
}



export default { getsUserList, getUserList, postUserList, patchUserList, deleteUserList }