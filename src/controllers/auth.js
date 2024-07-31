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

const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

export const registerUser = (req, res) => {
    const { email, password } = req.body
    const users = readUsers()

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ error: 'User already exists' })
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = {
        id: uuidv4(),
        email,
        password: hashedPassword,
        role: 'user'
    }

    users.push(newUser)
    writeUsers(users)
    res.status(201).json({ message: 'User registered successfully' })
}

export const loginUser = (req, res) => {
    const { email, password } = req.body
    const users = readUsers()
    const user = users.find(user => user.email === email)

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
    res.json({ token })
}