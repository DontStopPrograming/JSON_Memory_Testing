// import user from '../data/user.json' assert { type: "json"}
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../services/user.js'

export const getUsersList = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.send(users)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR GET DATA' })
    }
}




export const getUserList = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await getUserById(userId)

        if (!user) {
            return res.status(404).json({ error: 'USER NOT FOUND' })
        }
        res.status(200).send(user)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'ERROR RETRIEVING DATA BY ID' })
    }
}



export const postUserList = async (req, res) => {
    try {
        const { email, password, name, role } = req.body

        if (!email || !password || !name || !role) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        const newUser = { email, password, name, role }
        const createdUser = await createUser(newUser)

        if (!createdUser) {
            return res.status(400).json({ error: 'EMAIL ALREADY REGISTERED' })
        }
        res.status(201).json(createdUser)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR POST DATA' })
    }
}




export const patchUserList = async (req, res) => {
    try {
        const userId = req.params.id
        const updateUserDetails = req.body

        const updatedUser = await updateUser(userId, updateUserDetails)

        if (!updatedUser) {
            return res.status(404).json({ error: 'USER NOT FOUND' })
        }
        res.status(200).json(updatedUser)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR UPDATING USER' })
    }
}


export const delUserList = async (req, res) => {
    try {
        const userId = req.params.id
        const deletedUser = await deleteUser(userId)

        if (!deletedUser) {
            return res.status(404).json({ error: 'USER NOT FOUND' })
        }
        res.status(200).json(deletedUser)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR DELETING USER' })
    }
}

export default { getUsersList, getUserList, postUserList, patchUserList, delUserList }