import { authenticateUser } from '../services/authenticate.user.js'

export const loginUser = async (req, res) => {
    /* Take the email and password to verify*/
    const { email, password } = req.body

    try {
        /* Generate token JWT */
        const token = await authenticateUser(email, password)
        res.json({ accessToken: token })


    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}