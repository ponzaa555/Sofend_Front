import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ContentOverview = () => {

  const router = useRouter();
  const { id } = router.query as { id: string };

  type Event = {
    totalRevenue: number,
    ticketSold: number,
    ticketTotal: number
  }

  type Ticket = {
    eventID: string;
    eventName: string;
    zoneRevenue: zoneRevenue[];
}

  type ForTicketType = {
    name: string;
    price: number;
    sold: number;
    quota: number;
    revenue: number;
  }

  const [event, setEvent] = useState<Event>({ totalRevenue: 0, ticketSold: 0, ticketTotal: 0 });
  const [getEventFinish, setgetEventFinish] = useState(false);
  const [ticket, setTicket] = useState<Ticket>({
    eventID: "",
    eventName: "",
    zoneRevenue: []
})
  const [getTicketFinish, setgetTicketFinish] = useState(false);
  const [listTicket,setlistTicket] = useState<ForTicketType[]>([{
    name: "",
    price: 0,
    sold: 0,
    quota: 0,
    revenue: 0,
}]);

  useEffect(() => {
    
  },[id])

  useEffect(() => {
    if (id) {
      axios.get<Ticket>(`http://127.0.0.1:8000/event/${id}`)
        .then((res) => {
          setTicket(res.data);
          setgetTicketFinish(true)
          setlistTicket(res.data.zoneRevenue.map(item => ({
            name: item.className,
            price : item.price,
            sold : item.ticketSold,
            quota : item.quota,
            revenue : item.ticketSold * item.price
          })))
        })
      axios.get<Event>(`http://127.0.0.1:8000/eo_get_all_ticket_sold/${id}`)
      .then((res) => {
        setEvent(res.data);
        setgetEventFinish(true)
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }, [id]);
  
  const data = {
    name : listTicket.map(item => item.name),
    price : listTicket.map(item => item.price),
    sold : listTicket.map(item => item.sold),
    quota : listTicket.map(item => item.quota),
  }
  
  const setDataToLocalStorage = () => {
    localStorage.setItem('dataOverViewToTicketType', JSON.stringify(data));
  }
  
  return (
    <>
      {/* overview */}
      <div>
        <div className='text-3xl font-bold mb-5'>Overview</div>
        <div className='flex flex-row justify-around'>
          <div className='flex flex-col items-center gap-7'>
            <div className='font-bold text-2xl'>Total Revenue (Baht)</div>
            {getEventFinish ? <div className='font-bold text-4xl items-center h-10'>{event.totalRevenue}</div> :
              <div role="status" className='flex flex-row items-center justify-center h-10'>
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>}
          </div>
          <div className='flex flex-col items-center gap-7'>
            <div className='font-bold text-2xl'>Tickets Sold</div>
            {getEventFinish ? <div className='font-bold text-4xl h-10'>{event.ticketSold}</div> :
              <div role="status" className='flex flex-row items-center justify-center h-10'>
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>}
          </div>
          <div className='flex flex-col items-center gap-7'>
            <div className='font-bold text-2xl'>Tickets Left</div>
            {getEventFinish ? <div className='font-bold text-4xl h-10'>{event.ticketTotal - event.ticketSold}</div> :
              <div role="status" className='flex flex-row items-center justify-center h-10'>
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              </div>}
          </div>
        </div>
      </div>
      <div className='h-20'></div>

      {/*Ticket Sales Table Head*/}
      <div className='text-3xl font-bold mb-5'>Ticket Sales</div>
      <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />
      <div className='flex font-montserrat text-xl font-bold mb-5 text-2xl'>
        <div className='pl-5 w-4/12'>Name</div>
        <div className='w-2/12'>Price</div>
        <div className='w-2/12'>Sold</div>
        <div className='w-2/12'>Quota</div>
        <div className='w-2/12'>Revenue</div>
      </div>
      <div className='w-full h-0.5 bg-gray-300 rounded-lg mb-5' />

      {/*Ticket Sales Table Content*/}
      {getTicketFinish ? listTicket.length > 0 ? listTicket.map((item,index) => (
        <div key={index}>
        <div className='flex font-montserrat text-base mb-3 text-2xl'>
          <div className='pl-5 w-4/12'>{item.name}</div>
          <div className='w-2/12'>{item.price}</div>
          <div className='w-2/12'>{item.sold}</div>
          <div className='w-2/12'>{item.quota}</div>
          <div className='w-2/12'>{item.revenue}</div>
        </div>
        {setDataToLocalStorage()}
        </div>)) :
        <div className='font-montserrat text-xl font-medium my-8 text-gray-400 flex justify-center'>No Ticket Type, Please Create A New Ticket Type</div> :
        <div role="status" className='flex flex-row items-center justify-center h-10'>
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

export default ContentOverview