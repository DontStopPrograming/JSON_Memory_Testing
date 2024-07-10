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

        const updatedUser = users.find(u => u.email === newUser.email)
            ? res.status(400).json({ error: 'EMAIL ALREADY REGISTERED' })
            : (() => {
                const newUserWithId = { ...newUser, id: uuidv4() }
                const updatedUserList = [...users, newUserWithId]

                // Update the user data in your JSON file
                const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')
                fs.writeFileSync(filePath, JSON.stringify(updatedUserList, null, 2))

                return updatedUserList
            })()

        res.status(201).json(updatedUser)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR POST DATA' })
    }
}



export default { getsUserList, getUserList, postUserList }