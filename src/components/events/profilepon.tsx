import React, { use, useEffect, useState } from 'react'
import user from '../../../public/images/events/user.png'
import Editprofile from '../../components/eachprofileeiment/edit_profile'
import edit_profile from '../../components/eachprofileeiment/edit_profile';
import { Form } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import { signIn, signOut, useSession } from 'next-auth/react';
import { eventNames } from 'process';
import axios, { Axios } from 'axios';
import toast, { Toaster } from "react-hot-toast";
import EventSchedule from '~/components/events/eventschedule';
import { Session } from 'inspector';
import { useRouter } from "next/router";

interface edit_profile {
    userID: string;
    newEmail: string;
    newFirstName: string;
    newLastName: string;
    newTelephoneNumber: string;
}
interface changepass {
    userID: string;
    oldPassword: string;
    newPassword: string;
}

const profilepage = (props: any) => {
    const Event = props
    const router = useRouter()
    const { data: session } = useSession()
    const [show1, Setshow1] = useState(true)
    const [show2, Setshow2] = useState(false)
    const [show3, Setshow3] = useState(false)
    const [inputF, SetinputF] = useState()
    const [inputL, SetinputL] = useState()
    const [inputE, SetinputE] = useState()
    const [inputtel, Setinputtel] = useState()
    const [inputoldpas, Setinputoldpas] = useState()
    const [inputnewpas, Setinputnewpas] = useState()
    const [inputconpas, Setinputconpas] = useState()
    const [data1, Setdata1] = useState({})
    const [getSessionFinish, setgetSessionFinish] = useState(false)

    const userID = session?.user?.userID
    let check = 0
    console.log('check: ',check)
   
    useEffect(() => {
        if (userID !== undefined) {
            const url = `https://eventbud-jujiu2awda-uc.a.run.app/profile/${userID!}`
            axios.get(url)
                .then((res) => {
                    Setdata1(res.data)
                    SetinputF(res.data.firstName)
                    SetinputL(res.data.lastName)
                    SetinputE(res.data.email)
                    Setinputtel(res.data.telephoneNumber)
                    setgetSessionFinish(true)
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [userID])
    
    if(session === null && check ===0){
        router.push('/main')
       }
    // get all events


    const setshowfunc = (e) => {
        console.log(e)
        if (e === "show1") {
            Setshow1(true)
            Setshow2(false)
            Setshow3(false)
        }
        if (e === "show2") {
            Setshow1(false)
            Setshow2(true)
            Setshow3(false)

        }
        if (e === "show3") {
            Setshow1(false)
            Setshow2(false)
            Setshow3(true)

        }
    }
    console.log("data1",data1)
    const ChangeF = (e) => {
        SetinputF(e.target.value)
    }
    const ChangeL = (e) => {
        SetinputL(e.target.value)
    }
    const ChangeE = (e) => {
        SetinputE(e.target.value)
    }
    const Changetel = (e) => {
        Setinputtel(e.target.value)
    }
    const Changeoldp = (e) => {
        Setinputoldpas(e.target.value)
    }
    const ChangeNewp = (e) => {
        Setinputnewpas(e.target.value)
    }
    const Changeconp = (e) => {
        Setinputconpas(e.target.value)
    }
    const submitefromeditprofile = (e:React.FocusEvent) => {
        const inputfname = document.getElementById('inputFirstname').value;
        const inputlname = document.getElementById('inputlastname').value;
        const inputemail = document.getElementById('inputemail').value;
        const inputmb = document.getElementById('inputmobile phone').value;
        const Jsonedit: edit_profile = {
            userID: userID,
            newFirstName: inputfname,
            newLastName: inputlname,
            newEmail: inputemail,
            newTelephoneNumber: inputmb,
        }
        console.log("Jsonedit", Jsonedit)
        e.preventDefault()
        fetch('https://eventbud-jujiu2awda-uc.a.run.app/update_profile', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Jsonedit)
            }).then(respone =>{
                let responestatus =respone.status
                if (responestatus === 400){
                    toast.error("Duplicate Email")
                    SetinputF(data1.firstName)
                    SetinputL(data1.lastName)
                    SetinputE(data1.email)
                    Setinputtel(data1.telephoneNumber)
                }else{
                    if(data1.email != inputemail){
                        check = 1
                        signOut()
                        .then(() => {
                            signIn()
                        })
                    }else{
                        toast.success('Editprofile Success')
                        window.location.reload(false)
                    }
                }
            })
            
    }
    const changepassbutton = (e:React.FocusEvent) => {
        e.preventDefault()
        const inputoldpass = document.getElementById('currentpas').value
        const inputnewpass = document.getElementById('Newpass').value
        const inputconpass = document.getElementById('passwordcon').value
    if(inputnewpass.length >=8){
        if (inputnewpass === inputconpass) {
            const JsonChangepass: changepass = {
                userID: userID,
                oldPassword: inputoldpass,
                newPassword: inputnewpass
            }
            console.log("JsonChangepass", JsonChangepass)
            const urlchangeprofile = 'https://eventbud-jujiu2awda-uc.a.run.app/reset_password'
            fetch(urlchangeprofile, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(JsonChangepass)
            }).then(response => {
                let statuscode = response.status
                console.log("statuscode:", statuscode)
                if (statuscode === 400) {
                    toast.error("Current Password Incorrect")
                    Setinputoldpas('')
                    Setinputnewpas('')
                    Setinputconpas('')
                }
                else {
                    toast.success("Change Password Succes")
                    check = 1
                    signOut()
                        .then(() => {
                            signIn()
                        })

                }
            }).catch(err => {
                console.log(err)
            })
        } else {
            toast.error("Password not match")
            Setinputoldpas('')
            Setinputnewpas('')
            Setinputconpas('')
        }
    }else{
        toast.error("Password must be at least 8 characters")
    }
    }
    return (
        <>
            <Toaster />
            <div className=' flex justify-center gap-10 md:text-base lg:text-xl sm:text-sm w-full'>
                <div className='  w-[18%] bg-white    h-1/2  shadow-lg rounded-2xl '>
                    { getSessionFinish == true?
                        <div className=' grid justify-items-center h-1/2 bg-white rounded-2xl w-full grid-cols-1'>
                            <div className=' h-5'></div>
                            <img src={"images/events/user.png"} className=' h-16 justify-center ' />
                            <p className='font-montserrat text-center mt-1 text-black font-bold md:text-base sm:text-sm'>{data1.firstName} {data1.lastName}</p>
                            <h2 className='font-montserrat text-center text-gray-400 md:text-base sm:text-sm '>{data1.email}</h2>
                            <div className='h-1 w-4/5 bg-slate-200 mt-2 rounded-2xl  '></div>
                        </div> : 
                        <div className=' grid justify-items-center h-1/2 bg-white rounded-2xl w-full grid-cols-1'>
                            <div className=' h-5'></div>
                            <img src={"images/events/user.png"} className=' h-16 justify-center ' />
                            <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
                                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="font-montserrat">Loading...</span>
                            </div>                            
                            <div className='h-1 w-4/5 bg-slate-200 mt-2 rounded-2xl  '></div>
                        </div>
                    }   
                    <div className=' h-1/2  rounded-2xl w-full'>
                        <button className=' flex h-1/3 bg-white hover:bg-slate-50 shadow-2xl cursor-pointer w-full ' value="show1" onClick={() => { setshowfunc("show1") }}  >
                            {
                                show1 && <div className=' w-2 h-8 mt-2 bg-black' ></div>
                            }
                            {
                                show1 && <p className=' py-4 pl-2 font-montserrat  font-bold md:text-base sm:text-xs '>Edit Profile</p>
                            }
                            {
                                !show1 && <p className=' py-4 pl-3 font-montserrat md:text-base sm:text-xs'>Edit Profile</p>
                            }
                        </button>

                        <button className=' flex h-1/3 bg-white hover:bg-slate-50 shadow-lg cursor-pointer w-full' value="show2" onClick={() => { setshowfunc("show2") }}>
                            {
                                show2 && <div className=' w-2 h-8 bg-black mt-2 '></div>
                            }
                            {
                                !show2 && <p className=' py-4  pl-3 font-montserrat md:text-base  sm:text-xs' >Change Password</p>
                            }
                            {
                                show2 && <p className='py-4 pl-2 font-montserrat font-bold md:text-base sm: text-xs'>Change Password</p>
                            }
                        </button>
                        <button className=' flex h-1/3 bg-white hover:bg-slate-50  rounded-b-2xl cursor-pointer w-full' value="show3" onClick={() => { setshowfunc("show3") }}>
                            {
                                show3 && <div className=' w-2 h-8 bg-black mt-2 '></div>
                            }
                            {
                                !show3 && <p className='  py-4 pl-3 font-montserrat md:text-base  sm:text-xs '>Staff</p>
                            }
                            {
                                show3 && <p className='  py-4 pl-2 font-montserrat font-bold md:text-base  sm:text-xs '>Staff</p>
                            }
                        </button>
                    </div>
                </div>
                {/* edit profile */}

                {show1 &&
                <form onSubmit={submitefromeditprofile} className='w-3/5   bg-white  rounded-2xl shadow-xl'>
                    <div >
                            <div className='pt-10 px-10'>
                                <h2 className=' font-montserrat  font-bold md:text-xl sm:text-base mb-4'>Edit Profile</h2>
                                <div className='flex  w-full gap-7'>
                                    <div className='flex w-1/2 '>
                                        <div className='font-montserrat mt-1 md:text-base  sm:text-xs '>First Name</div>
                                        <p className='text-base  font-montserrat text-red-600 font-bold  '>*</p>
                                        <p className='font-montserrat text-gray-500  md:text-xs lg:text-xs sm:text-xs pt-2 pl-1'>as it appears on ID card or passport</p>
                                    </div>
                                    <div className='flex w-1/2 '>
                                        <p className='font-montserrat mt-1 md:text-base  sm:text-sm  '>Last Name</p>
                                        <p className='text-base  font-montserrat text-red-600 font-bold '>*</p>
                                        <p className='font-montserrat text-gray-500  md:text-xs lg:text-xs sm:text-xs pt-2 pl-1'>as it appears on ID card or passport</p>
                                    </div>
                                </div>
                                <div className='flex mt-1 gap-7 w-full'>
                                    <div className='w-1/2'>
                                        <input type="text" id='inputFirstname' value={inputF} onChange={(e) => ChangeF(e)} className=' border-gray-300 w-full h-9  border-2 rounded-lg pl-4 text-base  font-montserrat pb-1 re' required />
                                    </div>
                                    <div className='w-1/2'>
                                        <input type="text" id='inputlastname' value={inputL} onChange={(e) => ChangeL(e)} className=' border-gray-300 w-full  h-9  border-2 rounded-lg pl-4 text-base font-montserrat pb-1' required/>
                                    </div>

                                </div>
                                <div className='flex w-full gap-7 mt-3'>
                                    <div className='flex w-full'>
                                        <p className='font-montserrat mt-1 md:text-base  sm:text-sm  '>Email</p>
                                        <p className='text-base  font-montserrat text-red-600 font-bold '>*</p>
                                    </div>
                                    <div className='flex w-full'>
                                        <p className='font-montserrat mt-1 md:text-base  sm:text-sm '>Mobile Phone Number</p>
                                    </div>

                                </div>
                                <div className='flex w-full gap-7 mt-1'>
                                    <div className='flex w-1/2'>
                                        <input type="email" id='inputemail' value={inputE} onChange={(e) => ChangeE(e)} className=' border-gray-300 w-full h-9  border-2 rounded-lg pl-4 text-base  font-montserrat pb-1' />
                                    </div>
                                    <div className='flex w-1/2'>
                                        <input type="text" inputMode='numeric' pattern='[0-9]+' id='inputmobile phone' value={inputtel} onChange={(e) => Changetel(e)} className=' border-gray-300 w-full h-9  border-2 rounded-lg pl-4 text-base  font-montserrat pb-1' />
                                    </div>
                                </div>
                                <div className='flex  w-full mt-6 justify-end '>
                                    <button className=' items-end w-2/12 h-8  bg-black  rounded-lg  hover:bg-gray-500  ' type='submit'>
                                        <p className=' text-white text-base  font-montserrat font-semibold '>Save</p>
                                    </button>
                                </div>
                            </div>
                    </div>
                </form>

                }
                {/* change password */}
                {show2 &&
                <form onSubmit={changepassbutton} className='w-3/5   bg-white  rounded-2xl shadow-xl'>
                    <div>
                        <div className=' pt-10 px-10'>
                            <p className='font-montserrat  font-bold md:text-xl sm:text-base mb-4'>Change Password</p>
                            <div className='flex w-full'>
                                <div className='flex w-1/2'>
                                    <p className='font-montserrat mt-1 md:text-base  sm:text-sm '>Current Password</p>
                                    <p className='text-base  font-montserrat text-red-600 font-bold '>*</p>
                                </div>
                            </div>
                            <div className='flex w-full gap-7 pt-1'>
                                <div className='flex w-1/2'>
                                    <input type="text"
                                        placeholder='Enter Current Password'
                                        value={inputoldpas}
                                        onChange={(e) => Changeoldp(e)}
                                        className='border-gray-300 w-full h-8  border-2 rounded-lg pl-4 md:text-base  font-montserrat pb-1 sm:text-xs'
                                        type="password"
                                        id='currentpas'
                                        required />
                                </div >
                                <div className='flex w-1/2'>
                                    <div className='w-full'></div>
                                </div>
                            </div>
                            <div className='flex w-full gap-7 mt-3'>
                                <div className='flex w-1/2'>
                                    <p className='font-montserrat mt-1 md:text-base  sm:text-sm'>New Password</p>
                                    <p className='text-base  font-montserrat text-red-600 font-bold '>*</p>
                                </div>
                                <div className='flex w-1/2'>
                                    <p className='font-montserrat mt-1 md:text-base  sm:text-sm'>Password Confirmation</p>
                                    <p className='text-base  font-montserrat text-red-600 font-bold'> *</p>
                                </div>
                            </div>
                            <div className='flex w-full gap-7 pt-1'>
                                <div className='flex w-1/2'>
                                    <input type="text"
                                        placeholder='Enter New Password'
                                        value={inputnewpas}
                                        onChange={(e) => ChangeNewp(e)}
                                        className=' border-gray-300 w-full h-9  border-2 rounded-lg pl-4 md:text-base  font-montserrat pb-1 sm:text-xs'
                                        id='Newpass'
                                        type="password"
                                        minLength={8}
                                        maxLength={20} 
                                        required/>
                                </div>
                                <div className=' flex w-1/2'>
                                    <input type="text"
                                        placeholder='Confirm Your New Password'
                                        value={inputconpas}
                                        onChange={(e) => Changeconp(e)}
                                        className='border-gray-300 w-full  h-9  border-2 rounded-lg pl-4 md:text-base font-montserrat pb-1 sm:text-xs'
                                        id='passwordcon' 
                                        type="password"
                                        minLength={8}
                                        maxLength={20}
                                        required/>
                                </div>
                            </div>
                            <div className='flex w-full mt-6 justify-end'>
                                <button className=' items-end w-2/12 h-8  bg-black  rounded-lg  hover:bg-gray-500' type='submit'>
                                    <p className='text-white text-base  font-montserrat font-semibold '>Save</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                }
                {/* Staff */}
                
                {
                    show3 &&
                    <div className='  w-3/5 bg-white  rounded-2xl shadow-xl '>
                        <EventSchedule />
                    </div>
                }
            </div>
        </>
    )
}
export default profilepage