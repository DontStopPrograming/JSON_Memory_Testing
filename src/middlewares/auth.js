import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
    /* This line of code is extracting the value of the 'Authorization' header from the request headers
    and storing it in the variable `authHeader`. */
    const authHeader = req.headers['authorization']
    /* This line of code is extracting the token from the authorization header. */
    const token = authHeader && authHeader.split(' ')[1]

    /* This line of code is checking if the `token` variable is null or not. If the token is null, it
    means that there is no token provided in the request headers. In this case, the code returns a
    status of 401 (Unauthorized) to indicate that the request lacks proper authentication
    credentials. */
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

export const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.sendStatus(403)
        next()
    }
}
