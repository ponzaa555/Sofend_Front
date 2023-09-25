import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {

    session:{
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials,req){
                // const {email,password} = credentials as {email:string,password:string};
                //perform login logic
                //find user in database
                const res = await fetch("https://eventbud-jujiu2awda-uc.a.run.app/signin",{
                    method:"POST",
                    body:JSON.stringify(credentials),
                    headers:{
                        "Content-Type":"application/json",
                    },
                });
                const user = await res.json();
                // console.log(user);
                if (res.ok && user) {
                    const signupuser = {
                        name: user.name,
                        email: user.email,
                        id: user.userID,
                    }
                    return signupuser;
                }
                return null;
            },}),
    ],
    pages:{
        signIn: "/auth/signin",
    },

    callbacks: {
        async jwt({token,user,account,profile,isNewUser}) {
            if(user){
                token.accessToken = user.id;
            }
            return token;
        },

        async session({session,token,user}) {
            if(token){
                session.user.userID = token.accessToken;
            }
            return session;
        }
    },
};


export default NextAuth(options);