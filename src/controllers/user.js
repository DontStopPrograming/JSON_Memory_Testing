// import user from '../data/user.json' assert { type: "json"}
import { getAllUsers, getUserById } from '../services/user.js'

export const getUsersList = async (req, res) => {
    try {
        const users = await getAllUsers()
        res.send(users)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR GET DATA' })
    }
}

// export const getUserList = async (req, res) => {
//     try {

//         const users = await user
//         const userId = req.params.id
//         const findUser = users.find(u => u.id === userId)

//         const response = findUser
//             ? res.status(200).send(findUser)
//             : res.status(404).json({ error: 'USER NOT FOUND' })
//         return response
//     }
//     catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'ERROR GET DATA' })
//     }
// }

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


// export const postUserList = async (req, res) => {
//     try {
//         const users = await user
//         const newUser = req.body

//         const newUserWithId = { ...newUser, id: uuidv4() }

//         const updateUserAction = users.find(u => u.email === newUser.email)

//         const result = updateUserAction

//             ? res.status(400).json({ error: 'EMAIL ALREADY REGISTERED' })
//             : (() => {

//  Update the user data in your JSON file

//                 const updatedUserList = [...users, newUserWithId]

//                 const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')
//                 fs.writeFileSync(filePath, JSON.stringify(updatedUserList, null, 2))

//                 return updatedUserList
//             })()

//         res.status(201).json(result)
//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'ERROR POST DATA' })
//     }
// }

export const postUserList = async (req, res) => {
    try {
        const newUser = req.body
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


// export const patchUserList = async (req, res) => {
//     try {
//         const users = await user
//         const usersId = req.params.id
//         const updateUser = req.body

//         const index = users.findIndex(u => u.id === usersId)

//         const userNotFound = (index === -1)
//         userNotFound
//             ? res.status(404).json({ error: 'USER NOT FOUND' })

//             : (() => {
//                 const updatedUser = { ...users[index], ...updateUser }
//                 const updatedUserList = [
//                     ...users.slice(0, index),
//                     updatedUser,
//                     ...users.slice(index + 1)
//                 ]

//                 const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')
//                 fs.writeFileSync(filePath, JSON.stringify(updatedUserList, null, 2))

//                 res.status(200).json(updatedUser)

//             })()

//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'ERROR UPDATING USER' })
//     }
// }

export const patchUserList = async (req, res) => {
    try {
        const userId = req.params.id
        const updateUser = req.body

        const updatedUser = await updateUser(userId, updateUser)

        if (!updatedUser) {
            return res.status(404).json({ error: 'USER NOT FOUND' })
        }
        res.status(200).json(updatedUser)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR UPDATING USER' })
    }
}


// export const delUserList = async (req, res) => {
//     try {
//         const users = await user
//         const usersId = req.params.id

//         const index = users.findIndex(u => u.id === usersId)

//         const userNotFound = (index === -1)
//         userNotFound
//             ? res.status(404).json({ error: 'USER NOT FOUND' })
//             : (() => {
//                 const deleteUser = users[index]
//                 const updatedUserList = [...users.slice(0, index), ...users.slice(index + 1)]

//                 const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')
//                 fs.writeFileSync(filePath, JSON.stringify(updatedUserList, null, 2))

//                 res.status(200).json(deleteUser)
//             })()



//     } catch (error) {
//         console.error(error)
//         res.status(500).json({ error: 'ERROR DELETING USER' })
//     }
// }


export const delUserList = async (req, res) => {
    try {
        const userId = req.params.id
        const deleteUser = await deleteUser(userId)

        if (!deletedUser) {
            return res.status(404).json({ error: 'USER NOT FOUND' })
        }
        res.status(200).json(deletedUser)

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'ERROR DELETING USER' })
    }
}

export default { getUsersList, getUserList }