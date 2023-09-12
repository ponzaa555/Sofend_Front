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
            <div className="grid grid-cols-4 md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 place-content-center ">
            {showevents.map((eventcard, index) => (
                <a key = {index} className="flex flex-col items-end">
                    <div className="flex">
                        <ScheduleCard image={eventcard.posterImage} datestart={eventcard.startDateTime} dateend={eventcard.endDateTime} name={eventcard.eventName} place={eventcard.location} />
                    </div>
                    <button className="flex w-full h-14 bg-black text-white font-bold rounded-xl px-4 py-2 ">SCAN</button>
                </a>
            ))}
            </div>
        </div>
    )
}

export default eventschedule