import React, {useEffect, useState} from 'react';
import ContentCreateNewTicketTypes from './ContentCreateNewTicketTypes';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import axios from 'axios';

const ContentTicketTypes = () => {
    type Event = {
        totalRevenue: string,
        ticketSold: string,
        ticketLeft: string
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
    
    
    const [handleCreateNewTicketType, sethandleCreateNewTicketType] = useState(false)

    const [event, setEvent] = useState<Event>({ 
        totalRevenue: '', 
        ticketSold: '', 
        ticketLeft: '' 
    });

    const [ticket, setTicket] = useState<Ticket>({
        eventID: "",
        eventName: "",
        zoneRevenue: []
    })

    const [listTicket,setlistTicket] = useState<ForTicketType[]>([{
        name: "",
        price: 0,
        sold: 0,
        quota: 0,
        revenue: 0,
    }]);
    
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch('https://eventbud-jujiu2awda-uc.a.run.app/eo_get_all_ticket_sold/rajadamnern/0189a3dfcc');
          const data = await response.json();
          console.log(data);
          setEvent(data);
        }
        fetchData();
      },[])

    const handleButton = () => {
        sethandleCreateNewTicketType(true)
    }

    const router = useRouter();
    const { id } = router.query as { id: string };

    useEffect(() => {
        if (id) {
          axios.get<Ticket>('https://eventbud-jujiu2awda-uc.a.run.app/event/0189a3dfcc')
            .then((res) => {
              setTicket(res.data);
              setlistTicket(res.data.zoneRevenue.map(item => ({
                name: item.className,
                price : item.price,
                sold : item.ticketSold,
                quota : item.quota,
                revenue : item.ticketSold * item.price
              })))
            })
            .catch((err) => {
              console.error(err);
            });
        }
      }, [id]);

    const {data: session} = useSession();

    return (
        <>
            { handleCreateNewTicketType == false ?
                <>
                    <div className="divide-y-2">
                    <div className="flex justify-between my-5">
                        <div className="font-bold text-4xl">Ticket Types</div>
                        <button className="bg-black text-white border-2 border-black hover:bg-white hover:text-black font-bold text-base py-2 px-4 rounded-lg"
                            onClick={handleButton}>
                            create new ticket type
                        </button>
                    </div>
                    <div>
                        <ul className="flex flex-row justify-between my-5 mx-20 font-bold text-xl">
                        <li>Name</li>
                        <li></li>
                        <li>Price</li>
                        <li>Sold</li>
                        <li>Quota</li>
                        </ul>
                    </div>
                    <div></div>
                    {listTicket.map((item,index) => (
                        <div key={index}>
                        <div className='flex font-montserrat text-base mb-3 text-2xl'>
                            <div className='pl-5 w-4/12'>{item.name}</div>
                            <div className='w-2/12'>{item.price}</div>
                            <div className='w-2/12'>{item.sold}</div>
                            <div className='w-2/12'>{item.quota}</div>
                            <div className='w-2/12'>{item.revenue}</div>
                        </div>
                    </div>))}

                    </div>
                    <div className="flex flex-grow flex-col text-center my-5">
                        <div className="font-bold text-4xl">EventBud</div>
                        <div className="">all right reserved</div>
                    </div>
                </>
                : <ContentCreateNewTicketTypes/>
            }
        </>
    )
}

export default ContentTicketTypes;
