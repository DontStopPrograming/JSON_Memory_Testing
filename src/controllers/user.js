import user from '../data/user.json' assert { type: "json"}

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
        const users = await user
        const userId = req.params.id
        const findUser = users.find(u => u.id === userId)
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

export default { getsUserList, getUserList }