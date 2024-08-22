import { getUserByEmail } from "../repositories/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/userModel'

export const authenticateUser = async (email, password) => {
    /* Search for the user by email */
    const user = getUserByEmail(email)

    /* Verify if the user exist and if the password is correct */
    if (!user) {
        throw new Error('Incorrect email or password')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        throw new Error('Incorrect email or password')
    }

    const userModel = new UserModel(user)
    return userModel.generateAuthToken()
}