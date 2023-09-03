import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Introevent from '../components/events/introevent'
import Recommendevent from '../components/events/recommendevent'
import Allevent from '../components/events/allevent'
import Monthlyevent from '../components/events/monthlyevent'

export const main = () => {
  return (
    <>
        <Navbar/>
        <Introevent/>
        <div className='flex flex-col mx-20 mt-20 '><Recommendevent/></div>
        <div className='flex flex-col mx-20 mt-20'><Allevent/></div>
        <div className='flex flex-col mx-20 mt-20'> <Monthlyevent/></div>
        <Footer/>
    </>
  )
}

export default main