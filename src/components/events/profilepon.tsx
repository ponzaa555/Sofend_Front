import React , {use, useEffect, useState} from 'react'
import user from '../../../public/images/events/user.png'
import Editprofile from '../../components/eachprofileeiment/edit_profile'





const profilepage = () => {
    
    const [show1,Setshow1] = useState(true)
    const [show2,Setshow2] = useState(false)
    const [show3,Setshow3] = useState(false)
    const setshowfunc =(e)=>{
        console.log(e)
        if(e === "show1"){
            Setshow1(true)
            Setshow2(false)
            Setshow3(false)
            console.log("show1")
        }
        if(e === "show2"){
            Setshow1(false)
            Setshow2(true)
            Setshow3(false)
            console.log("show2")
        }
        if(e === "show3"){
            Setshow1(false)
            Setshow2(false)
            Setshow3(true)
            console.log("show3")
        }
    }
    return(
        <>
        <div className=' flex justify-center gap-10 '>
            <div className='  w-[18%] bg-white h-[500px]   mt-20 shadow-lg rounded-2xl  '>
                    <div className=' grid justify-items-center h-1/2 bg-white rounded-2xl w-full grid-cols-1'>
                        <div className=' h-[30px]'></div>
                        <img src=  {"images/events/user.png"}   className='  h-[120px] justify-center '/>
                        <h1 className='text-3xl font-montserrat text-center mt-1 text-black font-bold'>Name</h1>
                        <h2 className='text-xl font-montserrat text-center text-gray-400'>xxxxxx@gmail.com</h2>
                        <div className='h-[4px] w-4/5 bg-slate-200 mt-4 rounded-2xl  mb-4'></div>
                    </div>
                    <div className=' h-1/2  rounded-2xl w-full'>
                            <button className=' flex h-1/3 bg-white hover:bg-slate-50 shadow-2xl cursor-pointer w-full ' value="show1" onClick={() => {setshowfunc("show1")}}  >
                            {
                                show1 && <div className=' w-[10px] h-3/4 mt-2 bg-black' ></div>
                            }
                            {
                                show1 &&<h1 className=' text-3xl py-4 pl-6 font-montserrat  font-bold'>Edit Profile</h1>
                            }
                            {
                                !show1 && <h1 className=' text-3xl py-4 pl-6 font-montserrat '>Edit Profile</h1>
                            }
                            </button>
                    
                        <button className=' flex h-1/3 bg-white hover:bg-slate-50 shadow-lg cursor-pointer w-full' value="show2" onClick={() => {setshowfunc("show2")}}>
                            {
                            show2 && <div className=' w-[10px] h-3/4 bg-black mt-2 '></div>
                            }
                            {
                              !show2 &&  <h1 className=' text-3xl py-4 pl-6 font-montserrat'>Change Password</h1>
                            }
                            {
                                show2 &&  <h1 className=' text-3xl py-4 pl-6 font-montserrat font-bold'>Change Password</h1>
                            }
                        </button>
                        <button className=' flex h-1/3 bg-white hover:bg-slate-50  rounded-b-2xl cursor-pointer w-full' value="show3" onClick={() =>{setshowfunc("show3")}}>
                            {
                                show3 && <div className=' w-[10px] h-3/4 bg-black mt-2 '></div>
                            }
                            {
                                !show3 &&<h1 className=' text-3xl py-4 pl-6 font-montserrat '>Staff</h1>
                            }
                            {
                                show3 &&<h1 className=' text-3xl py-4 pl-6 font-montserrat font-bold'>Staff</h1>
                            }
                        </button>
                    </div>
            </div>
            {/* edit profile */}
            {show1 &&
                <div className='justify-end  w-[55%] h-[500px]  bg-white mt-20 rounded-2xl shadow-xl'>
                <div className=' mt-20  mx-14'>
                    <h1 className='text-4xl  font-montserrat  font-bold'>Edit Profile</h1>
                    <div className='flex mt-5 '>
                        <h1 className='text-2xl  font-montserrat  font-medium mt-1 '>First Name</h1>
                        <h1 className='text-2xl  font-montserra text-red-600 font-bold ml-1'>*</h1>
                        <h1 className='text-sm  font-montserrat text-gray-500 ml-10 pt-3'>as it appears on ID card or passport</h1>
                        <h1 className='text-2xl  font-montserrat  font-medium ml-14 mt-1 '>Last Name</h1>
                        <h1 className='text-2xl  font-montserra text-red-600 font-bold'>*</h1>
                        <h1 className='text-sm  font-montserrat text-gray-500 ml-10 pt-3'>as it appears on ID card or passport</h1>
                    </div>
                    <div className='flex mt-2 gap-14'>
                        <input type="text" className=' border-gray-300 w-[430px]  h-12  border-2 rounded-lg pl-4 text-2xl  font-montserra pb-2' />
                        <input type="text" className=' border-gray-300 w-[430px]  h-12  border-2 rounded-lg pl-4 text-2xl  font-montserra pb-2' />
                    </div>
                    <div className='flex mt-5 '>
                        <h1 className='text-2xl  font-montserrat  font-medium mt-1'>Email</h1>
                        <h1 className='text-2xl  font-montserra text-red-600 font-bold ml-1 mr-7'> *</h1>
                        <h1 className='text-2xl  font-montserrat  font-medium ml-14 mt-1 ml-96'>Mobile Phone Number</h1>
                    </div>
                    <div className='flex mt-2 gap-14'>
                        <input type="text" className=' border-gray-300 w-[430px]  h-12  border-2 rounded-lg pl-4 text-2xl  font-montserra pb-2' />
                        <input type="text" className=' border-gray-300 w-[430px]  h-12  border-2 rounded-lg pl-4 text-2xl  font-montserra pb-2' />
                    </div>
                    <div className='flex justify-end w-full'>
                        <button className=' items-end w-3/12 h-12 bg-black mt-10 rounded-2xl '>
                            <h1 className=' text-white text-xl  font-montserrat font-semibold '>Save</h1>
                        </button>
                    </div>
                   
                </div>
            </div>
            }
            {/* change password */}
            { show2 &&
                <div className='justify-end  w-[55%] h-[500px]  bg-white mt-20 rounded-2xl shadow-xl'>
                 <div className=' mt-20  mx-14'>
                    <h1 className='text-4xl  font-montserrat  font-bold'>Change Password</h1>
                    <div className='flex mt-5 '>
                        <h1 className='text-2xl  font-montserrat  font-medium mt-1 '>Current Password</h1>
                        <h1 className='text-2xl  font-montserra text-red-600 font-bold ml-1'>*</h1>
                        
                    </div>
                    <div className='flex mt-2 gap-14'>
                        <input type="text" 
                        placeholder='Enter Current Password'
                        className=' border-gray-300 w-[430px]  h-12  border-2 rounded-lg pl-4 text-2xl  font-montserra pb-2' />
                    </div>
                    <div className='flex mt-5 '>
                        <h1 className='text-2xl  font-montserrat  font-medium mt-1'>New Password</h1>
                        <h1 className='text-2xl  font-montserra text-red-600 font-bold ml-1 mr-9'> *</h1>
                        <h1 className='text-2xl  font-montserrat  font-medium  mt-1 ml-64'>Password Confirmation</h1>
                        <h1 className='text-2xl  font-montserra text-red-600 font-bold ml-1 mr-9'> *</h1>
                    </div>
                    <div className='flex mt-2 gap-14'>
                        <input type="text"
                        placeholder='Enter New Password' 
                        className=' border-gray-300 w-[430px]  h-12  border-2 rounded-lg pl-4 text-2xl  font-montserra pb-2' />
                        <input type="text" 
                        placeholder='Confirm Your New Password'
                        className=' border-gray-300 w-[430px]  h-12  border-2 rounded-lg pl-4 text-2xl  font-montserra pb-2' />
                    </div>
                    <div className='flex justify-end w-full'>
                        <button className=' items-end w-3/12 h-12 bg-black mt-10 rounded-2xl '>
                            <h1 className=' text-white text-xl  font-montserrat font-semibold '>Save</h1>
                        </button>
                    </div>
                   
                    </div>
                </div>   
            }
            {/* Staff */}
            {
                show3 && 
                <div className='grid grid-row-1 grid-col-1 place-content-center w-[55%] h-[500px]  bg-white mt-20 rounded-2xl shadow-xl'>
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