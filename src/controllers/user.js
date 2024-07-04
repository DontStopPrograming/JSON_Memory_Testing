import user from '../data/user.json' assert { type: "json"}

export const getUserList = (req, res) => {
    try {

        res.send(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error in the list of users' })
    }
}

export default getUserList