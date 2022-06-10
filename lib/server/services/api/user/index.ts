import { createUser, findUser } from "lib/server/repositories/user"
import { GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } from "utils"


export type UserSignupInput = {
    username: string
    email: string
    password: string
}
export type UserSigninInput = {
    username: string
    password: string
}

export const signup = async (userInput: UserSignupInput) => {
    const { username, email, password } = userInput
    try {
        let salt = await GenerateSalt()

        let hashPassword = await GeneratePassword(password, salt)

        const existingUser = await createUser({ username, email, password: hashPassword, salt })
        const token = await GenerateSignature({ username: username, email: existingUser.email })
        
        return {
            token,
            user: {
                username: existingUser.username,
                email: existingUser.email
            },
        }
    } catch (err: any) {
        throw new Error(err)
    }
}

export const signin = async (userInput: UserSigninInput) => {
    const { username, password } = userInput
    try {
        const existingUser = await findUser(username)
        if (!existingUser) {
            throw new Error("User not found")
        }
        const validPassword = await ValidatePassword(password, existingUser.password, existingUser.salt)
        if (!validPassword) {
            throw new Error("Password is not valid")
        }
        const token = await GenerateSignature({ username: existingUser.username, email: existingUser.email })
        return {
            token,
            user: {
                username: existingUser.username,
                email: existingUser.email
            }
        }
    } catch (err: any) {
        throw new Error(err)
    }
}
