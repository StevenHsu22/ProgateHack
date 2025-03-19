import NextAuth from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { NextResponse } from 'next/server';
import { JWT } from 'next-auth/jwt';

// 開発モードではダミーのセッションを返す
const handler =
  process.env.NODE_ENV === 'development'
    ? async (req: any) => {
        return NextResponse.json({
          user: {
            name: 'サメチーム',
            email: 'test@test.com',
            image: null,
          },
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        });
      }
    : NextAuth({
        providers: [
          KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!,
          }),
        ],
        callbacks: {
          async jwt({ token, account }): Promise<JWT> {
            console.log('JWT callback called');
            console.log('Account:', account);
            if (account) {
              token.accessToken = account.access_token as string;
            }
            return token;
          },
          async session({ session, token }) {
            console.log('Session callback called');
            console.log('Token:', token);
            session.accessToken = token.accessToken as string;
            return session;
          },
          async signIn({ account, profile }) {
            console.log('SignIn callback called');
            if (account && profile) {
              return true; // サインイン成功
            }
            return true;
          },
        },
        pages: {
          signIn: '/auth/login',
        },
      });

export { handler as GET, handler as POST };
