import React from 'react'

type MenubarEOProps = {
  setContentId: (val: string) => void
}

const MenubarEO = ({setContentId}: MenubarEOProps) => {

  const selectMenu = (e: React.ChangeEvent<HTMLInputElement>) => {
    const labelMenus = document.querySelectorAll('label')
    labelMenus.forEach(labelMenu => {
      labelMenu.classList.remove('font-bold')
      if (labelMenu.htmlFor === e.target.id) {
        labelMenu.classList.add('font-bold')
      }
      if(e.target.id === 'menubar-dashboard') {
        setContentId('menubar-dashboard')
      }
      else if(e.target.id === 'menubar-event-setting') {
        setContentId('menubar-event-setting')
      }
      else if(e.target.id === 'menubar-ticket-types') {
        setContentId('menubar-ticket-types')
      }
      else if(e.target.id === 'menubar-staff') {
        setContentId('menubar-staff')
      }
      else if(e.target.id === 'menubar-payment') {
        setContentId('menubar-payment')
      }
    })
  }

  return (
    <div className='mb-10 bg-neutral-100'>
      <ul className='flex flex-row justify-between items-center h-14 lg:max-w-7xl mx-auto md:px-8 px-4'>
        <li>
          <input type="radio" name="menubar" id="menubar-dashboard" className='appearance-none' onChange={(e) => selectMenu(e)}/>
          <label htmlFor="menubar-dashboard" className='font-montserrat'>Dashboard</label>
        </li>
        <li>
          <input type="radio" name="menubar" id="menubar-event-setting" className='appearance-none' onChange={(e) => selectMenu(e)}/>
          <label htmlFor="menubar-event-setting" className='font-montserrat font-bold'>Event Setting</label>
        </li>
        <li>
          <input type="radio" name="menubar" id="menubar-ticket-types" className='appearance-none' onChange={(e) => selectMenu(e)}/>
          <label htmlFor="menubar-ticket-types" className='font-montserrat'>Ticket Types</label>
        </li>
        <li>
          <input type="radio" name="menubar" id="menubar-staff" className='appearance-none' onChange={(e) => selectMenu(e)}/>
          <label htmlFor="menubar-staff" className='font-montserrat'>Staff</label>
        </li>
        <li>
          <input type="radio" name="menubar" id="menubar-payment" className='appearance-none' onChange={(e) => selectMenu(e)}/>
          <label htmlFor="menubar-payment" className='font-montserrat'>Payment</label>
        </li>
        <li>
          <button className='bg-black text-white font-bold py-1 px-2 rounded-lg font-montserrat'>Publish</button>
        </li>
      </ul>
      
    </div>
  )
}

export default MenubarEO