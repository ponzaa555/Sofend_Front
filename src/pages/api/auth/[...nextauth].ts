import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const options: NextAuthOptions = {

    session:{
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            id: "user",
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
                    return user;
                }
                return null;
            },}),
        CredentialsProvider({
            id: "eventorganizer",
            type: "credentials",
            credentials: {},
            async authorize(credentials,req){
                // const {email,password} = credentials as {email:string,password:string};
                //perform login logic
                //find user in database
                const res = await fetch("https://eventbud-jujiu2awda-uc.a.run.app/eo_signin",{
                    method:"POST",
                    body:JSON.stringify(credentials),
                    headers:{
                        "Content-Type":"application/json",
                    },
                });
                const user = await res.json();
                // console.log(user);
                if (res.ok && user) {
                    return user;
                }
                return null;
            },}),
    ],
    pages:{
        signIn: "/auth/signin",
    },

    // callbacks: {
    //     async session({session,token,user}) {
    //         session.user.email = token.email;
    //         session.user.firstName = token.firstName;
    //     }
    // },
};


export default NextAuth(options);