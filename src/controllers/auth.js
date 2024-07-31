import { v4 as uuidv4 } from 'uuid'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')

const readUsers = () => {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
}

/**
 * The function `writeUsers` writes the `users` data to a file in JSON format with indentation for
  readability. @param users - The `users` parameter is an array of user objects that you want to write to a file.
 */
const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

export const registerUser = (req, res) => {
    const { email, password, name } = req.body
    const users = readUsers()

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = {
        id: uuidv4(),
        email,
        password: hashedPassword,
        name,
        role: 'user'
    }

    users.push(newUser)
    writeUsers(users)

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    res.status(201).json({ message: 'User registered successfully' })
}

export const loginUser = (req, res) => {
    const { email, password } = req.body
    const users = readUsers()
    const user = users.find(user => user.email === email)

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    res.json({ token })
}