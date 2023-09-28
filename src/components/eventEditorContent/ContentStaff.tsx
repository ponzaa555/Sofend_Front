import React from 'react'
import { useState, useEffect } from 'react'

// type Props = {}

const ContentStaff = () => {
  const [addemail, setaddemail] = useState("")
  return (
    <>
      <div className='flex justify-between mb-5'>
        <div className='w-1/6 text-3xl body-font font-montserrat font-bold'>Staff</div>
        <form className='w-5/6 flex justify-end'>
          <input className="w-4/12 border-2 border-gray-300 rounded-md px-3 font-montserrat font-medium text-base mx-4 " type="email" placeholder="New Staff Email"
            value={addemail}
            onChange={e => setaddemail(e.target.value)}
            name="email"
            required
          />
          <button className='w-1/12 font-montserrat font-bold bg-black rounded-lg text-white '> add </button>
        </form>
      </div>
      {/*table header*/}
      <div className='w-full h-[0.125rem] bg-gray-300 rounded-lg mb-5' />
      <div className='font-montserrat text-xl font-bold mb-5 '>
        <div className='mx-6 flex '>
        <div className='w-4/12'>First Name</div>
        <div className='w-4/12'>Last Name</div>
        <div className='w-5/12'>Email</div>
        <div className='w-1/12'></div>
        </div>
      </div>
      <div className='w-full h-[0.125rem] bg-gray-300 rounded-lg mb-5' />
      {/*table content*/}
      <div className='font-montserrat mb-5 '>
        <div className='mx-6 flex '>
        <div className='w-4/12 truncate'>First Name</div>
        <div className='w-4/12 truncate'>Last Name</div>
        <div className='w-5/12 truncate'>Email</div>
        <button className='w-1/12 font-bold text-red-500 '> remove </button>
        </div>
      </div>
      <div className='font-montserrat mb-5 '>
        <div className='mx-6 flex'>
        <div className='w-4/12 truncate'>First Name12345555555555555555555555555555</div>
        <div className='w-4/12 truncate'>Last Name</div>
        <div className='w-5/12 truncate'>Email22222222222222222222222222222222222222222222243332</div>
        <button className='w-1/12 font-bold text-red-500 '> remove </button>
        </div>
      </div>
    </>
  )
}

export default ContentStaff