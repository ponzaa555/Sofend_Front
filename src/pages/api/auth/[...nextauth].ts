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
            authorize(credentials,req){
                const {email,password} = credentials as {email:string,password:string};
                //perform login logic
                //find user in database
                if (email !== "admin@email.com" && password !== "admin") {
                    throw new Error("Invalid login");
                }

                //if everything is ok, return user object
                return {id:'1',name:'Admin', email:'admin@email.com'}
                
            },
        }),
    ],
    pages:{
        signIn: "/auth/signin",

    },


};


export default NextAuth(options);