import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@repo/db/client";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: {
          label: "Phone Number",
          type: "number",
          placeholder: "123456789",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials: any) {
        try {
          const phoneNumber = credentials.phoneNumber;
          const password = credentials.password;
        
          // console.log(phoneNumber,password)
          if (!phoneNumber || !password) {
            return null ;
          }
          const existingUser = await db.user.findUnique({
            where: { phoneNumber: phoneNumber },
          });
          if (existingUser) {
            const matchPassword = await bcrypt.compare(
              password,
              existingUser.password
            );
            if (matchPassword) {
              console.log("matchPassword","existingUser",existingUser)
              return {
                id: existingUser.id.toString(),
                name: existingUser.phoneNumber
              };
            } else {
              return null ;
            }
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await db.user.create({
            data: {
              password: hashedPassword,
              phoneNumber: phoneNumber,
            },
          });
          return { id: newUser.id.toString(), email: newUser.phoneNumber };
        } catch (error) {
          console.log(error);
         return null;
        }
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    jwt({ token, user } : any) {
      // console.log("TOKEN,USER",token,user)
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({token,session} : any) {
      // console.log("TOKEN,SESSION",token,session)
      if (session?.user) {
        session.user.id = token.id;
      }
      return session;
    },
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
