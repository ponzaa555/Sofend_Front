import React,{ useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import { Toaster, toast } from 'react-hot-toast'
import { useRouter } from 'next/router';

const SignupEO = () => {
    const [info, setInfo] = useState({email: "", password: "", password_confirmation: "", organization_name: "", phone_number: ""});
    const router = useRouter();

    const onSubmit = async (e:React.FormEvent) => {
        console.log(info)
        e.preventDefault();
        if (info.password !== info.password_confirmation) {
            toast.error('Password does not match')
            return
        }
        else if (info.password.length < 8) {
            toast.error('Password must be at least 8 characters')
            return
        }
        else {
            toast.loading('Signing up...')
            const sendInfo = {email: info.email, password: info.password, organizerName: info.organization_name, organizerPhone: info.phone_number}
            console.log(sendInfo)
            try{
                const res = await fetch('http://127.0.0.1:8000/eo_signup',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sendInfo)
                })
                if(!res.ok){
                    toast.remove()
                    toast.error('Sign up failed')
                }
                else{
                    toast.remove()
                    toast.success('Sign up success')
                    router.push('/auth/signinEO')
                }
            }
            catch(err){
                toast.remove()
                toast.error('There is an error')
            }
        }
    }

    return(
        <>
            <Head>
                <title>Sign Up as Event Organizer</title>
                <meta name="description" content="Generated by create-t3-app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-900">
                <div className='flex flex-row h-full'>
                    <Toaster />
                    <div className="w-1/2 h-full">
                        <Image src="/images/1login.png" width={500} height={500} style={{ width: '100%', height: '100%' }} alt="vdo" />
                    </div>
                    <div className="w-1/2 flex items-center justify-center h-full">
                        <div className="flex flex-col w-1/2">
                            <div className="flex flex-col justify-start">
                                <h1 className="font-montserrat text-white text-4xl font-bold">Sign Up as</h1>
                                <h1 className="font-montserrat text-white text-4xl font-bold">Event Organizer</h1>
                                <form onSubmit={onSubmit}>
                                        <label className="font-montserrat text-white" htmlFor='email_signUp'>Email</label>
                                        <span className="text-red-600 ml-1">*</span>
                                        <input className="border-2 border-gray-300 rounded-md pl-2 w-full py-2" type="email" placeholder="Email" id='email_signUp'
                                            value={info.email}
                                            onChange={e => setInfo({...info, email: e.target.value})}
                                            name="email"
                                            required
                                        />
                                        <label className="font-montserrat text-white" htmlFor='password_signUp'>Password</label>
                                        <span className="text-red-600 ml-1">*</span>
                                        <input className="border-2 border-gray-300 rounded-md pl-2 w-full py-2" type="password" placeholder="" id='password_signUp' minLength={8} maxLength={20}
                                            value={info.password}
                                            onChange={e => setInfo({...info, password: e.target.value})}
                                            name="password"
                                            required
                                        />
                                        <label className="font-montserrat text-white" htmlFor='confirm_password_signUp'>Password Confirmation</label>
                                        <span className="text-red-600 ml-1">*</span>
                                        <input className="border-2 border-gray-300 rounded-md pl-2 w-full py-2" type="password" placeholder="" id='confirm_password_signUp' minLength={8} maxLength={20}
                                            value={info.password_confirmation}
                                            onChange={e => setInfo({...info, password_confirmation: e.target.value})}
                                            name="password_confirmation"
                                            required
                                        />
                                        <label className="font-montserrat text-white" htmlFor='organizationName_signUp'>Organization Name</label>
                                        <span className="text-red-600 ml-1">*</span>
                                        <input className="border-2 border-gray-300 rounded-md pl-2 w-full py-2" type="text" placeholder="" id='organizationName_signUp'
                                            value={info.organization_name}
                                            onChange={e => setInfo({...info, organization_name: e.target.value})}
                                            name="organization_name"
                                            required
                                        />
                                        <label className="font-montserrat text-white" htmlFor='phoneNumber_signUp'>Phone Number</label>
                                        <span className="text-red-600 ml-1">*</span>
                                        <input className="border-2 border-gray-300 rounded-md pl-2 w-full py-2" type="text" placeholder="" id='phoneNumber_signUp'
                                            value={info.phone_number}
                                            onChange={e => setInfo({...info, phone_number: e.target.value})}
                                            name="phone_number"
                                            required
                                        />
                                        <button className="bg-white border-2 hover:bg-black hover:text-white active:scale-95 border-white duration-300 text-black font-bold py-2 w-full rounded mt-10" type="submit">Sign Up</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
export default SignupEO