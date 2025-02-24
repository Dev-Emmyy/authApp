import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { fetchUsers } from "../../../../utils/api";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = await fetchUsers();
        interface User {
          id: string;
          email: string;
          password: string;
        }

        const user = users.find((u: User) => u.email === credentials.email);

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };