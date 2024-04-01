import React, { use } from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

// type Props = {}

const ContentStaff = () => {
  const [inputemail, setInputmail] = useState("")
  const [getFinish, setgetFinish] = useState(false)
  const [staff, setstaff] = useState([])
  const router = useRouter()
  const { id } = router.query;
  const eventid = id as string
  const { data: session } = useSession()
  console.log("session: ", session)
  const eoid = session?.user?.userID as string


  const handleaddstaff = async (e: React.FormEvent) => {
    e.preventDefault()
    setInputmail("")
    toast.loading(`Adding ${inputemail}...`)
    {/**add to database*/ }
    const add_url = `http://127.0.0.1:8000/eo_add_staff/${eoid}/${eventid}/${inputemail}`;
    // const add_url = `http://127.0.0.1:8000/eo_add_staff/${eoid}/${eventid}/${inputemail}`;
    console.log(add_url);
    const response = await fetch(add_url, {
      method: 'POST',
    });
    const res = await response.json();
    console.log(res);
    if (response.ok) {
      fetchStaff("add", inputemail)
    } else {
      console.log(res.detail)
      toast.remove()
      toast.error(`Add ${inputemail} failed (${res.detail})`)
    }
  }

  const handleremovestaff = async (removestaff: string) => {
    toast.loading(`Removing ${removestaff}...`)
    {/**remove from database*/ }
    // setstaff(staff.filter((item) => item.email !== removestaff))
    const remove_url = `http://127.0.0.1:8000/eo_remove_staff/${eoid}/${eventid}/${removestaff}`;
    // const remove_url = `http://127.0.0.1:8000/eo_remove_staff/${eoid}/${eventid}/${removestaff}`;
    console.log(remove_url);
    const response = await fetch(remove_url, {
      method: 'POST',
    });
    const res = await response.json();
    console.log(res);
    if (response.ok) {
      fetchStaff("remove", removestaff)
    } else {
      console.log(res.detail)
      toast.remove()
      toast.error(`Remove ${inputemail} failed (${res.detail})`)
    }
  }

  useEffect(() => {
    fetchStaff("", "")
  }, [])

  {/**fetch staff*/ }
  const fetchStaff = async (typefetch: string, showmail: string) => {
    console.log("fetching staff")
    const BASE_URL = `http://127.0.0.1:8000/eo_get_all_staff/${eoid}/${eventid}`;
    // const BASE_URL = `http://127.0.0.1:8000/eo_get_all_staff/${eoid}/${eventid}`;
    try {
      const response = await axios.get(`${BASE_URL}`);
      const data = response.data;
      setstaff(data)
      setgetFinish(true)
      console.log("fetching staff success : ", data)
      toast.remove()
      if (typefetch === "add") {
        toast.success(`Add ${showmail} success`)
      }
      else if (typefetch === "remove") {
        toast.success(`Remove ${showmail} success`)
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }


  return (
    <>
      <Toaster />
      <div className='flex justify-between mb-5'>
        <div className='w-1/6 text-3xl body-font font-montserrat font-bold'>Staff</div>
        <form onSubmit={handleaddstaff} className='w-5/6 flex justify-end'>
          <input className="w-4/12 border-2 border-gray-300 rounded-md px-3 font-montserrat font-medium text-base mx-4 " type="email" placeholder="New Staff Email"
            value={inputemail}
            onChange={e => setInputmail(e.target.value)}
            name="email"
            required
          />
          <button className='w-1/12 font-montserrat font-bold border-2 border-black rounded-md hover:bg-black hover:text-white '> add </button>
        </form>
      </div>
      {/*table header*/}
      <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />
      <div className='font-montserrat text-xl font-bold mb-5 '>
        <div className='mx-6 flex '>
          <div className='w-4/12'>First Name</div>
          <div className='w-4/12'>Last Name</div>
          <div className='w-5/12'>Email</div>
          <div className='w-1/12'></div>
        </div>
      </div>
      <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />
      {/*table content*/}
      {getFinish ? staff.length > 0 ? staff.map((item, index) => (
        <div className='font-montserrat truncate mb-5 ' key={index}>
          <div className='mx-6 flex '>
            <div className='w-4/12'>{item.firstName}</div>
            <div className='w-4/12'>{item.lastName}</div>
            <div className='w-5/12'>{item.email}</div>
            <button onClick={() => handleremovestaff(item.email)} className='w-1/12 font-bold text-gray-400 hover:text-red-500  '> remove </button>
          </div>
        </div>
      )) : <div className='font-montserrat text-xl font-medium my-8 text-gray-400 flex justify-center'>No Staff</div>
        : <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="font-montserrat">Loading...</span>
        </div>}
      {/*Footer*/}
      <div className='justify-center bg-white p-4 mt-10'>
        <h1 className='text-center text-black font-montserrat font-bold text-2xl'>EventBud</h1>
        <h1 className='text-center text-black font-montserrat'>all right reserved</h1>
      </div>
    </>
  )
}

export default ContentStaff