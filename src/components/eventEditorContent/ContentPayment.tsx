import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
// type Props = {}
type Bankinfo = {
  bankAccount:JSON
}
const ContentPayment = () => {
  const [bank,Setbank] = useState<string>("")
  const [checkchange,Setcheckchange] = useState<Bankinfo>()
  const [accountname,Setaccountname] = useState<string>("")
  const [accountype, Setaccountype] = useState<string>("")
  const [accountnum, Setaccountnum] = useState<string>("")
  const [branch, Setbranch] = useState<string>("")
  const { data: session } = useSession()
  const router = useRouter()
  const eventId = router.query.id as string;
  const organizerid = session?.user?.userID as string
  const onSubmit:FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();
    if(checkchange?.bank === bank && 
      checkchange?.accountName === accountname &&
      checkchange?.accountType === accountype &&
      checkchange?.accountNo === accountnum &&
      checkchange.branch === branch  ){
      toast.remove()
      toast.error("Not Change")
    }else{
      toast.loading("Updating...")
    const posturl = `https://eventbud-jujiu2awda-uc.a.run.app/eo_post_bank_account/${organizerid}/${eventId}`
    const bankinformation = {
      "bank":bank,
      "accountName":accountname,
      "accountNo":accountnum,
      "accountType":accountype,
      "branch":branch,
    }
    const res = await fetch(posturl,{
      method:"POST",
      body:JSON.stringify(bankinformation),
      headers:{
        "Content-Type":"application/json",
      },
    }).then(response =>{
      if(response.ok){
        toast.remove()
        toast.success("Updated")
      }
      else{
        toast.remove()
        toast.error("Failed to update")
      }
    })
  }
}
  const getEventDetail = async () => {
    const BASE_URL = `https://eventbud-jujiu2awda-uc.a.run.app/event/${eventId}`;
    const respone = await fetch(BASE_URL)
    const eventData = await respone.json() as Bankinfo
    const bankinfo = eventData.bankAccount
    Setcheckchange(bankinfo)
    console.log("bankAccount:",bankinfo)
    Setbank(bankinfo?.bank)
    Setaccountname(bankinfo.accountName)
    Setaccountype(bankinfo.accountType)
    Setaccountnum(bankinfo.accountNo)
    Setbranch(bankinfo.branch)
  }

  useEffect(() => {
   getEventDetail()
  }, [])

  const onchangebank = (e) =>{
    Setbank(e.target.value)
  }
  const onchangeaccountname = (e) =>{
    Setaccountname(e.target.value)
  }
  const onchangeaccounttype = (e) => {
    Setaccountype(e.target.value)
  }
  const onchangeaccountnum = (e) => {
    Setaccountnum(e.target.value)
  }
  const onchangebranch = (e) => {
    Setbranch(e.target.value)
  }
  return (
  <div className=' font-montserrat'>
    <Toaster/>
    <h2 className='font-bold text-3xl mb-4'> Bank Accounts</h2>
    <form onSubmit={onSubmit}>
      {/* Bank */}
        <div className=' flex flex-row  gap-10'>
          <div className='flex flex-col justify-start w-2/3'>
              <label htmlFor="es-event-name" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Bank</label>
              <input type="text" className='w-full rounded h-9  border-gray-500 border mb-3 font-montserrat px-2 ' value={bank}  onChange={(e) =>onchangebank(e)} required/>
          </div>
          <div className='flex flex-col w-1/3 justify-start'>
            <div>
              <h3 className='font-bold text-lg mb-2'>Bank Accounts</h3>
              <p className='mb-4'>Bank Account will need to get verified and approved before used on following purpose.</p>
            </div>
          </div>
        </div>
        {/* Account Name กับ Account Type */}
        <div className=' flex flex-row  gap-10'>
          <div className='flex flex-col justify-start w-2/3'>
            <div className='flex flex-row justify-start gap-7'>
                <div className='flex flex-col justify-start w-7/12'>
                  <label htmlFor="es-start-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Account Name</label>
                  <input type="text" id='Account Name' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={accountname} onChange={(e) => onchangeaccountname(e)} required/>
                </div>
                <div className='flex flex-col justify-start w-5/12'>
                  <label htmlFor="es-start-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Account Type</label>
                  <input type="text" id='Account Type' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={accountype} onChange={(e) => onchangeaccounttype(e)} required/>
                </div>
            </div>
          </div>
          <div className='flex flex-col w-1/3 justify-start'></div>
        </div >

        {/* Account No and Branch */}
        <div className=' flex flex-row  gap-10'>
          <div className='flex flex-col justify-start w-2/3'>
            <div className='flex flex-row justify-start gap-7'>
                <div className='flex flex-col justify-start w-7/12'>
                  <label htmlFor="es-start-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Account No</label>
                  <input type="text" id='Account Name' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2'  value={accountnum} onChange={(e) => onchangeaccountnum(e)} required/>
                </div>
                <div className='flex flex-col justify-start w-5/12'>
                  <label htmlFor="es-start-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Branch</label>
                  <input type="text" id='Account Type' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={branch} onChange={(e) => onchangebranch(e)} required/>
                </div>
            </div>
          </div>
          <div className='flex flex-col w-1/3 justify-start'></div>
        </div >
        <div className=' flex flex-row  gap-10'>
        <div className='w-2/3 flex justify-end pt-2'>
          <button className='  bg-black w-1/5 h-8 rounded-md text-white text-sm' type='submit'> Save</button>
        </div>
        <div  className='flex flex-col w-1/3 justify-start'>
        </div>
        </div>
    </form>
  </div>
  )
}

export default ContentPayment