import React, {useEffect, useState} from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Introevent from '../components/events/introevent'
import Recommendevent from '../components/events/recommendevent'
import Allevent from '../components/events/allevent'
import Monthlyevent from '../components/events/monthlyevent'
import { getAllEvent } from '../service/api'


export const main = () => {
  const [events, setEvents] = useState([]);
  
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

  return (
    <>
        <Navbar/>
        <Introevent/>
        <div className='flex flex-col'>
            <Recommendevent/>
            <Allevent/>
            <Monthlyevent/>
        </div>
        <Footer/>
    </>
  )
}

export default main