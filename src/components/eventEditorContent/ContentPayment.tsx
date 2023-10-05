import React, { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'

// type Props = {}

const ContentPayment = () => {
  const [bank,Setbank] = useState()
  const [accountname,Setaccountname] = useState()
  const [accountype, Setaccountype] = useState()
  const [accountnum, Setaccountnum] = useState()
  const [branch, Setbranch] = useState()
  const onSubmit:FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    Setbank("")
    Setaccountname("")
    Setaccountype("")
    Setaccountnum("")
    Setbranch("")
  }

  

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