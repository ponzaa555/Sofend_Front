import React, {useEffect, useState} from 'react';
import ContentCreateNewTicketTypes from './ContentCreateNewTicketTypes';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast'
import { useSession } from 'next-auth/react';
import axios from 'axios';

const ContentTicketTypes = () => {
    const [loading, setLoading] = useState(false)
    const [handleCreateNewTicketType, sethandleCreateNewTicketType] = useState(false)
    const [ticketData, setTicketData] = useState([])
    const router = useRouter()
    const { id } = router.query;
    const eventid = id as string
    const {data:session} = useSession()
    console.log("session: ",session)
    const eoid = session?.user?.userID as string

    useEffect(() => {
        fetchTicketType("")
    }, [])
    
    const handleButton = () => {
        sethandleCreateNewTicketType(true)
    }

    const handleremovestaff = async (className: string) => {
        toast.loading('Removing Ticket Type...')

        {/**remove from database*/ }
        const removeURL = `https://eventbud-jujiu2awda-uc.a.run.app/eo_delete_ticket_type/${eoid}/${eventid}/${className}`;
          const response = await fetch(removeURL, {
            method: 'POST',
          });
          const res = await response.json();
          console.log(res);
          if (response.ok) {
            fetchTicketType("remove")
          } else {
            toast.remove()
            toast.error(`Remove Failed`)
          }
    }

    {/**fetch TicketType*/ }
    const fetchTicketType = async (typefetch: string) => {
        const BASE_URL = `https://eventbud-jujiu2awda-uc.a.run.app/event/${eventid}`;
        
        try {
            const response = await axios.get(`${BASE_URL}`);
            const data = response.data;
            setTicketData(data)
            // console.log('######ticketData', ticketData.zoneRevenue)
            setLoading(true)
            toast.remove()
            if (typefetch === "remove") {
                toast.success(`Remove Success`)
            }
            } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    return (
        <>
            {handleCreateNewTicketType == false ?
                <>
                    <Toaster />
                    <div className="flex justify-between my-5">
                    <div className='text-3xl font-bold'>Ticket Types</div>
                    <button className="bg-black text-white border-2 border-black hover:bg-white hover:text-black font-bold text-base py-2 px-4 rounded-lg"
                        onClick={handleButton}>
                        create new ticket type
                    </button>
                    </div>
                    <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />
                    <div className='flex font-montserrat text-xl font-bold mb-5 text-2xl'>
                    <div className='pl-5 w-4/12'>Name</div>
                    <div className='w-3/12'>Price</div>
                    <div className='w-2/12'>Sold</div>
                    <div className='w-2/12'>Quota</div>
                    <div className='w-1/12'></div>
                    </div>
                    <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />
                    { loading == true ? 
                    <div>
                        {/* {ticketData} */}
                        {ticketData.zoneRevenue.map((item,index) => (
                        <div key={index}>
                        <div className='flex font-montserrat text-lg mb-5 text-2xl'>
                            <div className='pl-5 w-4/12'>{item.className}</div>
                            <div className='w-3/12'>{item.price}</div>
                            <div className='w-2/12'>{item.ticketSold}</div>
                            <div className='w-2/12'>{item.quota}</div> 
                            <button onClick={() => handleremovestaff(item.className)} className='font-bold text-gray-400 hover:text-red-500  w-1/12'>remove</button>
                        </div>
                        </div>
                        ))}
                    </div>
                    : 
                    <div role="status" className='flex flex-row items-center justify-center mb-5 mt-4 '>
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
            : <ContentCreateNewTicketTypes/> }
        </>
    )
}

export default ContentTicketTypes;
