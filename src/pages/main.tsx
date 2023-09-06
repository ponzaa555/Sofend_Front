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