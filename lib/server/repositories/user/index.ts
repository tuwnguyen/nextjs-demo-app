import User from 'lib/server/models/user'
import dbConnect from 'lib/server/services/mongodb'
type UserData = {
    username: string
    email: string
    password: string
    salt: string
}

export const createUser = async ({username, email, password, salt}: UserData)  => {
    try {
        await dbConnect()
        return await User.create({ username, email, password, salt })
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export const findUser = async (username: string) => {
    try {
        await dbConnect()
        return await User.findOne({ username })
    } catch (err: any) {
        throw new Error(err.message)
    }
}