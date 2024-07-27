//Using uuidv4
import { v4 as uuidv4 } from 'uuid'

// Using import files
import fs from 'fs'

// Using import path url direction
import path from 'path'

const filePath = path.join(process.cwd(), 'src', 'data', 'user.json')

const readUsers = () => {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
}

const writeUsers = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

export const getAllUsers = () => readUsers()

