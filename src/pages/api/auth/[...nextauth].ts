import User from '@/lib/models/User';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/mondodb';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {
          label: 'Username',
          type: 'email',
          placeholder: 'test@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        await dbConnect();

        // TODO: add sign in?
        const { email, password } = credentials as { email: string; password: string };

        const user = await User.findOne({ email: email });

        if (!user) {
          return null;
        }

        const verifiedPassword = await bcrypt.compare(password, user.password);

        if (!verifiedPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  // fixes wrong redirect after login
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // pages: {}
};

export default NextAuth(authOptions);
