import Head from 'next/head'
import React, { useEffect } from 'react'
import MenubarEO from '~/components/MenubarEO';
import NavbarEO from '~/components/navbarEO'
import ContentDashboard from '../../components/eventEditorContent/ContentDashboard';
import ContentEventSetting from '../../components/eventEditorContent/ContentEventSetting';
import ContentTicketTypes from '../../components/eventEditorContent/ContentTicketTypes';
import ContentStaff from '../../components/eventEditorContent/ContentStaff';
import ContentPayment from '../../components/eventEditorContent/ContentPayment';

const EventEditor = () => {

  const [contentId, setContentId] = React.useState("menubar-dashboard")
  const [content, setContent] = React.useState(<ContentDashboard />)

  useEffect(() => {
    if(contentId === 'menubar-dashboard') {
      setContent(<ContentDashboard />)
    }
    else if(contentId === 'menubar-event-setting') {
      setContent(<ContentEventSetting />)
    }
    else if(contentId === 'menubar-ticket-types') {
      setContent(<ContentTicketTypes />)
    }
    else if(contentId === 'menubar-staff') {
      setContent(<ContentStaff />)
    }
    else if(contentId === 'menubar-payment') {
      setContent(<ContentPayment />)
    }
  }, [contentId])

  return (
    <div>
      <Head>
        {/* import font to page */}
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous'/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet"/>
      </Head>
      <NavbarEO />
      <MenubarEO setContentId={setContentId}/>
      <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10 font-montserrat'>
        {content}
      </div>
    </div>
  )
}

export default EventEditor