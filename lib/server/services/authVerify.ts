import * as next from 'next'
import nookies ,{ parseCookies } from 'nookies'
import * as jwtn from 'jsonwebtoken'

const secret: string = process.env.APP_SECRET_KEY!

type Context =
    | next.GetServerSidePropsContext
    | ({
        req: next.NextApiRequest
    } & {
        res: next.NextApiResponse
    })

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: true,
    path: '/',
}
export async function verify(context: Context) {
    const cookie = parseCookies(context)
    const jwt = cookie.AccessToken

    try {
        const payload = userPayload(jwt)
        nookies.set(context, "AccessToken", cookie.AccessToken, COOKIE_OPTIONS)
        return {
            payload,
        }
    } catch (err: any) {
        return false
    }
}
const userPayload = (jwt: string | undefined) => {
    if (!jwt) throw new Error('Invalid jwt')
    return jwtn.verify(jwt, secret)
}