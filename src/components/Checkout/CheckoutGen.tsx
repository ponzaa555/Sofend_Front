import SVG from 'react-inlinesvg';
import React from 'react'

const ComponentGenerateQR = (props:any) => {
    const eventData = props
    const generatePayload = require('promptpay-qr') 
    const qrcode = require('qrcode') 
 
    const mobileNumber = '064-556-3422' 
    const IDCardNumber = '0-0000-00000-00-0'
    
    // receive amount from props
    const amount = eventData.price 

    /* Generate payload
        First parameter : mobileNumber or IDCardNumber*/
    const payload = generatePayload(mobileNumber, { amount })
    console.log("PAYLOAD: ", payload)

    // Convert payload(string) to SVG(qrcode)
    var getSVG = ''
    const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }
    qrcode.toString(payload, options, (err:any, svg:any) => {
        if (err) return console.log(err)
        getSVG = svg as string
        console.log("SVG: ", svg)
    })

    return (
        <SVG src= {getSVG}/>
    )
}

export default ComponentGenerateQR