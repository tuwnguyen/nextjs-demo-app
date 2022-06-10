import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken'
const secret: string = process.env.APP_SECRET_KEY!
export const GenerateSalt = async () => {
    return await bcrypt.genSalt()
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt)
}

export const GenerateSignature = async (payload: { username: string, email: string }) => {
    return await jwt.sign(payload, secret, {expiresIn: '1d'})
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await GeneratePassword(enteredPassword, salt) === savedPassword
}









