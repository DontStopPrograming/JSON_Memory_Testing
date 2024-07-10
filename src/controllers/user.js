import user from '../data/user.json' assert { type: "json"}

//Using uuidv4
import { v4 as uuidv4 } from 'uuid'

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
        if (findUser) {
            res.send(findUser)
        } else {
            res.status(400).json({ error: 'USER NOT FOUND' })
        }
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
        // newUser.id = Date.now().toString()

        const existUser = users.find(u => u.email === newUser.email)
        // if (existUser) {
        //     return res.status(400).json({ error: 'EMAIL ALREADY REGISTERED' })
        // }

        existUser
            ? res.status(400).json({ error: 'EMAIL ALREADY REGISTERED' })
            : (() => {
                newUser.id = uuidv4()
                users.push(newUser)
                res.status(201).json(newUser)
            })




    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR POST DATA' })
    }
}

export default { getsUserList, getUserList, postUserList }