
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import useUser from "@/store/user/index";
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Credentials({
    name: "Credentials",
    credentials: {
        username: { label: "Username", type: "text", placeholder:"Usuario del Sistema de Avaluos" },
        password: { label: "Contraseña", type: "password" },
    },
    async authorize(creds, req) {
        const { signIn } = useUser((state) => state);
        const user = await signIn(creds);
  
        // If no error and we have user data, return it
        if (user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  session:{
    strategy: "jwt",//EXPIRES ON 12 HOURS
    maxAge: 12 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Agrega los datos del usuario al token
      if (user) {
        token.accessToken = user.token;
        token.expires = user.expires;
      }
      return token;
    },
    async session({ session, token }) {
      // Agrega el accessToken a la sesión
      session.accessToken = token.accessToken;
      session.expires = token.expires;
      return session;
    },
  },
})