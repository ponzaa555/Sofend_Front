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
                const {email,password} = credentials as {
                    email: string, 
                    password: string
                };
                //find user in database
                if (email !== "test@gmail,com" && password !== "123456"){
                    return null;
                }

                //if user is found return user object
                return {id: 1, name: "Test User", email: "test@gmail.com"}
            },
        }),
    ],
};


export default NextAuth(options);