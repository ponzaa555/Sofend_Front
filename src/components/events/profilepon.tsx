import React , {use, useEffect, useState} from 'react'
import user from '../../../public/images/events/user.png'
import Editprofile from '../../components/eachprofileeiment/edit_profile'
import edit_profile from '../../components/eachprofileeiment/edit_profile';
import { Form } from 'react-bootstrap';
import { set, useForm } from 'react-hook-form';
import { clear } from 'console';
import { useSession } from 'next-auth/react';
import { Session } from 'inspector';
import { eventNames } from 'process';

// ใชั usesession แล้ว undefind คณะ usestae ทำให้ Editprofile ไม่ได้ !!!!!!!!



interface edit_profile {
    Firstname : string;
    Lastname : string;
    Email : string;
    Phone : string;
}
interface changepass{
    Email :string;
    Newpass :string;
}



const profilepage = (props:any) => {

    const Event = props
    const name = Event.Name
    console.log("name", name)
    
    const [show1,Setshow1] = useState(true)
    const [show2,Setshow2] = useState(false)
    const [show3,Setshow3] = useState(false)
    const [inputF,SetinputF] = useState("Napon")
    const [inputL,SetinputL] = useState("Tansiri")
    const [inputE,SetinputE] = useState("napon.ta@ku.th")



    const setshowfunc =(e) =>{
        console.log(e)
        if(e === "show1"){
            Setshow1(true)
            Setshow2(false)
            Setshow3(false)
        }
        if(e === "show2"){
            Setshow1(false)
            Setshow2(true)
            Setshow3(false)
           
        }
        if(e === "show3"){
            Setshow1(false)
            Setshow2(false)
            Setshow3(true)
            
        }
    }
    const ChangeF =(e) =>{
        SetinputF(e.target.value)
    }
    const ChangeL = (e) => {
        SetinputL(e.target.value)
    }
    const ChangeE = (e) =>{
        SetinputE(e.target.value)
    }
    const submitefromeditprofile = () => {
        const inputfname = document.getElementById('inputFirstname').value;
        const inputlname = document.getElementById('inputlastname').value;
        const inputemail = document.getElementById('inputemail').value;
        const inputmb = document.getElementById('inputmobile phone').value;
        const Jsonedit:edit_profile = {
            Firstname: inputfname,
            Lastname: inputlname,
            Email: inputemail,
            Phone: inputmb,
        }
        console.log("Jsonedit",Jsonedit)
    }
    const changepassbutton = () => {
        const inputoldpass = document.getElementById('currentpas').value
        const inputnewpass = document.getElementById('Newpass').value
        const inputconpass = document.getElementById('passwordcon').value
        const JsonChangepass:changepass ={
            Email:Event.Gmail,
            Newpass:inputnewpass
        }
        console.log("JsonChangepass",JsonChangepass)
    }
    return(
        <>
        <div className=' flex justify-center gap-10 md:text-base lg:text-xl sm:text-sm h-1/2  '>
            <div className='  w-[18%] bg-white    h-full shadow-lg rounded-2xl '>
                    <div className=' grid justify-items-center h-1/2 bg-white rounded-2xl w-full grid-cols-1'>
                        <div className=' h-5'></div>
                        <img src=  {"images/events/user.png"}   className='h-16 justify-center '/>
                        <h1 className='font-montserrat text-center mt-1 text-black font-bold md:text-base sm:text-sm'>{Event.Name}</h1>
                        <h2 className='font-montserrat text-center text-gray-400 md:text-base sm:text-sm '>{Event.Gmail}</h2>
                        <div className='h-1 w-4/5 bg-slate-200 mt-2 rounded-2xl  '></div>
                    </div>
                    <div className=' h-1/2  rounded-2xl w-full'>
                            <button className=' flex h-1/3 bg-white hover:bg-slate-50 shadow-2xl cursor-pointer w-full ' value="show1" onClick={() => {setshowfunc("show1")}}  >
                            {
                                show1 && <div className=' w-2 h-8 mt-2 bg-black' ></div>
                            }
                            {
                                show1 &&<h1 className=' py-4 pl-2 font-montserrat  font-bold md:text-base sm:text-xs '>Edit Profile</h1>
                            }
                            {
                                !show1 && <h1 className=' py-4 pl-3 font-montserrat md:text-base sm:text-xs'>Edit Profile</h1>
                            }
                            </button>
                    
                        <button className=' flex h-1/3 bg-white hover:bg-slate-50 shadow-lg cursor-pointer w-full' value="show2" onClick={() => {setshowfunc("show2")}}>
                            {
                            show2 && <div className=' w-2 h-8 bg-black mt-2 '></div>
                            }
                            {
                              !show2 &&  <h1 className=' py-4  pl-3 font-montserrat md:text-base  sm:text-xs' >Change Password</h1>
                            }
                            {
                                show2 &&  <h1 className='py-4 pl-2 font-montserrat font-bold md:text-base sm: text-xs'>Change Password</h1>
                            }
                        </button>
                        <button className=' flex h-1/3 bg-white hover:bg-slate-50  rounded-b-2xl cursor-pointer w-full' value="show3" onClick={() =>{setshowfunc("show3")}}>
                            {
                                show3 && <div className=' w-2 h-8 bg-black mt-2 '></div>
                            }
                            {
                                !show3 &&<h1 className='  py-4 pl-3 font-montserrat md:text-base  sm:text-xs '>Staff</h1>
                            }
                            {
                                show3 &&<h1 className='  py-4 pl-2 font-montserrat font-bold md:text-base  sm:text-xs '>Staff</h1>
                            }
                        </button>
                    </div>
            </div>
            {/* edit profile */}

            {show1 &&
            <div className=' w-3/5   bg-white  rounded-2xl shadow-xl'>
                <div className='pt-10 px-10'>
                    <h1 className=' font-montserrat  font-bold md:text-xl sm:text-base '>Edit Profile</h1>
                        <div className='flex  w-full gap-7'>
                            <div className='flex w-1/2 '>
                                <div className='font-montserrat mt-1 md:text-base  sm:text-xs '>First Name</div>
                                <h1 className='text-base  font-montserrat text-red-600 font-bold  '>*</h1>
                                <h1 className='font-montserrat text-gray-500  md:text-xs lg:text-xs sm:text-xs pt-2 pl-1'>as it appears on ID card or passport</h1>
                            </div>
                            <div className='flex w-1/2 '>
                                <h1 className='font-montserrat mt-1 md:text-base  sm:text-sm  '>Last Name</h1>
                                <h1 className='text-base  font-montserrat text-red-600 font-bold '>*</h1>
                                <h1 className='font-montserrat text-gray-500  md:text-xs lg:text-xs sm:text-xs pt-2 pl-1'>as it appears on ID card or passport</h1>
                            </div>
                        </div>
                        <div className='flex mt-2 gap-7 w-full'>
                                <div className='w-1/2'>
                                <input type="text" id='inputFirstname' value={inputF} onChange={(e) => ChangeF(e)}  className=' border-gray-300 w-full h-8  border-2 rounded-lg pl-4 text-base  font-montserra pb-1' />
                                </div>
                                <div className='w-1/2'>
                                    <input type="text" id='inputlastname'  value={inputL} onChange={(e) => ChangeL(e)} className=' border-gray-300 w-full  h-8  border-2 rounded-lg pl-4 text-base font-montserra pb-1' />
                                </div>
                                    
                            </div>
                           <div className='flex w-full gap-7'>
                                <div className='flex w-full'>
                                    <h1 className='font-montserrat mt-1 md:text-base  sm:text-sm  '>Email</h1>
                                    <h1 className='text-base  font-montserrat text-red-600 font-bold '>*</h1>
                                </div>
                                <div className='flex w-full'>
                                    <h1 className='font-montserrat mt-1 md:text-base  sm:text-sm '>Mobile Phone Number</h1>
                                </div>

                           </div>
                            <div className='flex w-full gap-7 mt-2'>
                                <div className='flex w-1/2'>
                                    <input type="text" id='inputemail' value={inputE} onChange={(e) => ChangeE(e)} className=' border-gray-300 w-full h-8  border-2 rounded-lg pl-4 text-base  font-montserra pb-1' />
                                </div>
                                <div className='flex w-1/2'>
                                    <input type="tel" id='inputmobile phone'  className=' border-gray-300 w-full h-8  border-2 rounded-lg pl-4 text-base  font-montserra pb-1' />
                                </div>
                            </div>
                            <div className='flex  w-full mt-4 justify-end '>
                            <button className=' items-end w-2/12 h-8  bg-black  rounded-lg ' onClick={() => submitefromeditprofile()}>
                                <h1 className=' text-white text-base  font-montserrat font-semibold '>Save</h1>
                            </button>
                        </div>  
                </div>
            </div> 
            }
            {/* change password */}
            { show2 &&
                <div className=' w-3/5   bg-white  rounded-2xl shadow-xl'>
                    <div className=' pt-10 px-10'>
                        <h1 className='font-montserrat  font-bold md:text-xl sm:text-base '>Change Password</h1>
                        <div className='flex w-full'>
                            <div className='flex w-1/2'>
                            <h1 className='font-montserrat mt-1 md:text-base  sm:text-sm '>Current Password</h1>
                            <h1 className='text-base  font-montserrat text-red-600 font-bold '>*</h1>
                            </div>
                        </div>
                    <div className='flex w-full gap-7 pt-2'>
                        <div className='flex w-1/2'>
                            <input type="text" 
                            placeholder='Enter Current Password'
                            className='border-gray-300 w-full h-8  border-2 rounded-lg pl-4 md:text-base  font-montserra pb-1 sm:text-xs' 
                            id='currentpas'/>
                        </div >
                        <div className='flex w-1/2'>
                               <div className='w-full'></div>
                        </div>                       
                    </div>
                    <div className='flex w-full gap-7'>
                        <div className='flex w-1/2'>
                            <h1 className='font-montserrat mt-1 md:text-base  sm:text-sm'>New Password</h1>
                            <h1 className='text-base  font-montserrat text-red-600 font-bold '>*</h1>
                        </div>
                        <div className='flex w-1/2'>
                            <h1 className='font-montserrat mt-1 md:text-base  sm:text-sm'>Password Confirmation</h1>
                            <h1 className='text-base  font-montserrat text-red-600 font-bold'> *</h1>
                        </div>
                    </div>
                    <div className='flex w-full gap-7 pt-2'>
                        <div className='flex w-1/2'>
                            <input type="text"
                            placeholder='Enter New Password' 
                            className=' border-gray-300 w-full h-8  border-2 rounded-lg pl-4 md:text-base  font-montserra pb-1 sm:text-xs'
                            id='Newpass' />
                        </div>
                        <div className=' flex w-1/2'>
                            <input type="text" 
                            placeholder='Confirm Your New Password'
                            className='border-gray-300 w-full  h-8  border-2 rounded-lg pl-4 md:text-base font-montserra pb-1 sm:text-xs'
                            id='passwordcon' />
                        </div>
                    </div>
                    <div className='flex w-full mt-4 justify-end'>
                        <button className=' items-end w-2/12 h-8  bg-black  rounded-lg 'onClick={changepassbutton}>
                            <h1 className='text-white text-base  font-montserrat font-semibold '>Save</h1>
                        </button>
                    </div>
                   
                    </div>
                </div>     
                
            }
            {/* Staff */}
            {
                show3 && 
                <div className='grid grid-row-1 grid-col-1 place-content-center w-3/5 h-full  bg-white  rounded-2xl shadow-xl'>
                    <div className='items-center'>
                         <h1 className=' text-8xl font-montserrat font-bold'>EVENT</h1>
                    </div>
                </div>
            }
        </div>
           
        </>
        
    )
}
export default profilepage