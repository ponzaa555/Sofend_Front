import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Router from "next/router";


const options: NextAuthOptions = {
    session:{
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            // authorize(credentials,req){
            //     const {email,password} = credentials as {email:string,password:string};
            //     //perform login logic
            //     //find user in database
            //     if (email !== "admin@email.com" && password !== "admin") {
            //         throw new Error("Invalid login");
            //     }

            //     //if everything is ok, return user object
            //     return {id:'1',name:'Admin', email:'admin@email.com'}
                
            // },
            async authorize(credentials,req){
                const {email,password} = credentials as {email:string,password:string};
                //perform login logic
                //find user in database
                const res = await fetch("https://eventbud-jujiu2awda-uc.a.run.app/signin/",{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email,password}),
                })
                const user = await res.json();
                console.log(user);
                if (user.mail === email && user.password === password) {
                    return user;
                }

                throw new Error(user?.message ?? "Something went wrong");
                
            },}),
    ],
    pages:{
        signIn: "/auth/signin",

    },


};


export default NextAuth(options);