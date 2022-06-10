# nextjs setup custom server

use cookie based auth system we need have both client and server running on same origin/domain
we need to use proxy for that because our client/nextjs is running on 3000 and our server is running on 8000

# use proxy in nextjs

need to create custom server
this is only for development mode
in production, we will use same origin/domain ==> don't worry about it
we can simply run build the start next app

# login flow

Check username and password are correct
Take password and hash it then compare the hashed password saved
Generate json web token(JWT) and send to client
