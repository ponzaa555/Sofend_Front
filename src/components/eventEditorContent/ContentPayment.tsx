import React, { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";
import { Dropdown } from 'react-bootstrap';
// type Props = {}
type Bankinfo = {
  bankAccount:JSON
}
const ALLbankName:string[] = ["KBank","BBL","KTB","Krungsri","CIMB","ttb","SCB","UOB","LH Bank","SCBT",
                     "GSB","KKP","Citit","GHBA","BAAC","MHCB","ibank","Tisco","ICBC","SNMBC","HSBC",
                     "DEUTSCH","BOC"]
const ContentPayment = () => {
  const [defaultbank,Setdefaultbank] = useState() 
  const [bank,Setbank] = useState<string>("")
  const [checkchange,Setcheckchange] = useState<Bankinfo>()
  const [accountname,Setaccountname] = useState<string>("")
  const [accountype, Setaccountype] = useState<string>("")
  const [accountnum, Setaccountnum] = useState<string>("")
  const [branch, Setbranch] = useState<string>("")
  const [getFinish, setgetFinish] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const eventId = router.query.id as string;
  const organizerid = session?.user?.userID as string
  const onSubmit:FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault();
    const bankName = document.getElementById('bankname').value
    const banktype = document.getElementById('banktype').value
    console.log("BankName :" ,bankName)
    console.log("Banktype :", banktype)
    if(checkchange?.bank === bankName && 
      checkchange?.accountName === accountname &&
      checkchange?.accountType === banktype &&
      checkchange?.accountNo === accountnum &&
      checkchange.branch === branch  ){
      toast.remove()
      toast.error("Not Change")
    }else{
      toast.loading("Updating...")
    const posturl = `https://eventbud-jujiu2awda-uc.a.run.app/eo_post_bank_account/${organizerid}/${eventId}`
    const bankinformation = {
      "bank":bankName,
      "accountName":accountname,
      "accountNo":accountnum,
      "accountType":banktype,
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
    setgetFinish(true)
    const dropdown = document.getElementById('bankname') as HTMLSelectElement
    Setcheckchange(bankinfo)
    console.log("bankAccount:",bankinfo)
    Setbank(bankinfo.bank)
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
  const Setshowbank = () =>{
    const Dropdownbank = document.getElementById('bankname')
    Dropdownbank?.classList.remove("h-9")
    Dropdownbank?.classList.add("max-h-40")
  }
  return (
  <div className=' font-montserrat'>
    <Toaster/>
    <h2 className='font-bold text-3xl mb-4'> Bank Accounts</h2>
    {getFinish ?
    <form onSubmit={onSubmit} >
      {/* Bank */}
        <div className=' flex flex-row  gap-10'>
          <div className='flex flex-col justify-start w-2/3'>
              <label htmlFor="es-event-name" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Bank</label>
              <select className='w-full rounded border-gray-500 border mb-3 font-montserrat px-2 h-9 max-h-40 overflow-y-scroll ' id='bankname'  defaultValue={bank} >
                  { ALLbankName.map((d)=> (
                      <option value={d} className='w-full'>{d}</option>
                    ))}
              </select>
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
                  <select  id="banktype" className='w-full rounded border-gray-500 border mb-3 font-montserrat px-2 h-9' defaultValue={accountype}>
                    <option value="Savings">Savings</option>
                    <option value="current">current</option>
                  </select>
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
                  <input type="text" inputMode='numeric' pattern='[0-9]+' minLength={10} maxLength={10} id='Account No' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2'  value={accountnum} onChange={(e) => onchangeaccountnum(e)}  required/>
                </div>
                <div className='flex flex-col justify-start w-5/12'>
                  <label htmlFor="es-start-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Branch</label>
                  <input type="text" id='Branch' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={branch} onChange={(e) => onchangebranch(e)} required/>
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
    </form>: 
        <div role="status" className='flex flex-row items-center justify-center h-10'>
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="font-montserrat">Loading...</span>
        </div> }
  </div>
  )
}

export default ContentPayment