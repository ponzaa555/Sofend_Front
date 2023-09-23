import SVG from 'react-inlinesvg';
import React from 'react'

const ComponentGenerateQR = (props:any) => {
    const eventData = props
    const generatePayload = require('promptpay-qr') 
    const qrcode = require('qrcode') 
 
    const mobileNumber = '064-556-3422' 
    const IDCardNumber = '0-0000-00000-00-0'
    const amount = eventData.price // receive amount from props
    const payload = generatePayload(mobileNumber, { amount }) // First parameter : mobileNumber or IDCardNumber
    console.log("PAYLOAD: ", payload)

    var getSVG = ''
    const options = { type: 'svg', color: { dark: '#000', light: '#fff' } }

    // Convert to SVG QR Code
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
