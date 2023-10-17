import React from 'react'
import SVG from 'react-inlinesvg';

const ticketforphone = (props:any) => {
    const eventTicket = props
    const qrcode = require('qrcode') 
    
    var getSVG = ''
    const payload = eventTicket.ticketID
    const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }
    qrcode.toString(payload, options, (err:any, svg:any) => {
        if (err) return console.log(err)
        getSVG = svg as string
        // console.log("SVG: ", svg)
    })

    const date = eventTicket.date.split(/['T']/)[0] as string;
    const day = date.split('-')[2] as string;
    const month = date.split('-')[1] as string;
    const year = date.split('-')[0] as string;
    const month_list = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const parsedate = day + " " + month_list[parseInt(month)-1] + " " + year as string;
    
    let zone = "-"
    let row = "-"
    let gate = "-"
    let seat = "-"
    const checkseat = () => {
        if (eventTicket.seat.length == 2) {
            zone = eventTicket.seat
            row = eventTicket.seat[0]
            seat = eventTicket.seat[1]
        }
        else if (eventTicket.seat.length > 6) {
            zone = eventTicket.seat.substring(0,6) + "..."
        }
        else if(eventTicket.seat != ""){
            zone = eventTicket.seat
        }
    }
    checkseat()
    // console.log(zone)
    // console.log(row)
    // console.log(seat)
    // console.log(gate)

    const button = () => {
        if(eventTicket.status=="available")
        return(
            <>
            <button className="flex flex-row justify-center" onClick={setDataToLocalStorage}>
                <p className="font-montserrat font-bold text-sm text-white w-3/4">Send this ticket to your friend</p>
                <img className="w-auto h-6 mt-3" src="../images/tickets/sendIcon.png"></img>
            </button>
            </>
        )
        else{
            return
        }
    }

    const qr = () => {
        if(eventTicket.status=="available")
        return(
            <SVG className="w-40" src= {getSVG}/>
        )
        else{
            return(
            <>
                <SVG className="w-40 opacity-20 blur-sm" src= {getSVG}/>
            </>
        )
        }
    }

    let eventName_ch = eventTicket.eventName
    const checklength = () => {
    console.log(eventTicket.eventName.length,eventTicket.eventName)
    if(eventTicket.eventName.length > 75){
        eventName_ch = eventTicket.eventName.substring(0,75) + "..."
    }
    }
    checklength()

    const data = {
        ticketID : eventTicket.ticketID,
        firstname: eventTicket.firstname,
        lastname: eventTicket.lastname,
        eventName: eventName_ch,
        location: eventTicket.location,
        poster : eventTicket.eventImage,
        date: parsedate,
        zone: zone,
        row: row,
        gate: gate,
        seat: seat,
    }
    // const dataString = encodeURIComponent(JSON.stringify(data));

    const setDataToLocalStorage = () => {
        localStorage.setItem('data', JSON.stringify(data));
    }
  return (
    <>
        <div>

        </div>
    </>
  )
}
export default ticketforphone;