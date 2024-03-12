import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@models/user";
import { connectToDB } from "@utils/database";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
      },
      async authorize(credentials, req) {
        console.log({ credentials, req });
        // Add logic here to look up the user from the credentials supplied
        const email = credentials?.email;
        const user = { email };

        // check if email is amoung valid ones

        if (user) {
          try {
            await connectToDB();

            // check if user already exists
            const userExists = await User.findOne({ email });

            // if not, create a new document and save user in MongoDB
            if (!userExists) {
              await User.create({
                email,
              });
            }

            return user;
          } catch (error) {
            console.log("Error checking if user exists: ", error.message);
            return false;
          }
        }

        return null;

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user;
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null;

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ account, user, credentials }) {
      try {
        await connectToDB();
        const email = user?.email;
        const password = user?.password;

        // check if user already exists
        const userExists = await User.findOne({ email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email,
            username: email,
            password,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
