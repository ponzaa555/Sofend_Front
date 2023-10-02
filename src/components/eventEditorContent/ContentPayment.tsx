import React from 'react'

// type Props = {}

const ContentPayment = () => {
  return (
  <div className=' h-full'>
      <div className=' flex justify-center  h-1/2  gap-10'>
        <form id='left' className=' relative w-2/3 h-full  font-montserrat '>
          <div className='text-2xl font-semibol'>
            Bank Accounts
          </div>
          <div>
            <div className='text-base pt-2'>
              <div className='flex'>
                <h1>Bank</h1>
                <h1 className=' text-red-600 pl-1'>*</h1>
              </div>
              <div>
                <input type="text" className='w-full rounded-md h-8  border-gray-600 border-[1.5px] bg-transparent ' />
              </div>
            </div>
          </div>
          <div id='Nameandtype' className='pt-2'>
            <div className='flex text-base gap-4'>
              <div className='w-3/5 flex'>
                <h1>Account Name</h1>
                <h1 className='pl-1 text-red-600'>*</h1>
              </div>
              <div className='w-2/5 flex'>
                <h1>Account Type</h1>
                <h1 className='pl-1 text-red-600'>*</h1>
              </div>
            </div>
              <div id='inputNametype' className='flex gap-4'>
                <div className='w-3/5'>
                  <input className='w-full rounded-md h-8  border-gray-600 border-[1.5px] bg-transparent ' />
                </div>
                <div className='w-2/5'>
                  <input className='w-full rounded-md h-8  border-gray-600 border-[1.5px] bg-transparent ' />
                </div>
              </div>
            <div>
            </div>
          </div>
          <div id='accountNo.Brach' className='pt-2'>
            <div className='text-base'>
              <div className='flex text-base gap-4'>
                <div className='flex w-3/5'>
                  <h1>Account No.</h1>
                  <h1 className='pl text-red-600'>*</h1>
                </div>
                <div className='flex w-2/5'>
                  <h1>Branch</h1>
                  <h1 className='pl text-red-600'>*</h1>
                </div>
              </div>
            </div>
            <div id='inputAccountNoandBranch' className='flex gap-4'>
              <div className='w-3/5'>
                <input className='w-full rounded-md h-8  border-gray-600 border-[1.5px] bg-transparent ' />
              </div>
              <div className='w-2/5'>
                <input className='w-full rounded-md h-8  border-gray-600 border-[1.5px] bg-transparent ' />
              </div>
            </div>
          </div>
          <div className='w-full flex justify-end pt-2'>
            <button className='  bg-black w-1/5 h-8 rounded-md text-white text-sm' type='submit'> Save</button>
          </div>
        </form>
       
        <div id='right' className=' w-1/3 h-full '>
          <div className='h-2'></div>
          <div className='pt-2'>
            <div>
              <h1 className=' font-semibold text-base '>Bank Accounts</h1>
            </div>
            <div className='text-xs '>
              <h1 className='flex'>Bank Account will need to get verified</h1>
              <h1 className='flex'>and approved before used on following</h1>
              <h1 className='flex'>purpose.</h1>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default ContentPayment