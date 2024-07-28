import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
}