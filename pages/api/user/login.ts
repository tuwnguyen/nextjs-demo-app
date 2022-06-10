import { signin } from "lib/server/services/api/user";
import { NextApiRequest, NextApiResponse } from "next";

type Data =
    | {
        accessToken: string
        currentUser : {}
    } | {
        error: string
    }
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        const { username, password } = req.body as {
            username: string
            password: string
        }
    
        const { token, user } = await signin({ username, password })
        res.status(200).json({
            accessToken: token,
            currentUser: user
        })
    } catch (err: any) {
        res.status(400).json({ error: err.message })
    }
}