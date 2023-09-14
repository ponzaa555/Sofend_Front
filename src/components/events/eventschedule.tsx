import React,{useEffect,useState}from 'react'
import ScheduleCard from './schedulecard'
import { getAllEvent } from '../../service/api'

const eventschedule = () => {
    const [events, setEvents] = React.useState([])
    //fetch all event from api
    useEffect(() => {
        getAllEvent()
        .then(data => {
            setEvents(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);

    var showevents = events;

    return (
        <div>
            <div>eventschedule</div>
            <div className="mt-8 mr-6 ml-6">
                <div className="grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 place-content-center ">
                {showevents.map((eventcard, index) => (
                    <a key = {index} className="flex flex-col items-center">
                        <div className="flex-1">
                            <ScheduleCard image={eventcard.posterImage} datestart={eventcard.startDateTime} dateend={eventcard.endDateTime} name={eventcard.eventName} place={eventcard.location} />
                        </div>
                        <a href = {"/scan/"+eventcard.eventID} className='w-44 h-10 mb-8 '>
                            <button className="font-montserrat w-full h-full text-xl bg-black text-white font-semibold rounded-xl align-middle">SCAN</button>
                        </a>
                    </a>
                ))}
                </div>
            </div>
        </div>
    )
}

export default eventschedule