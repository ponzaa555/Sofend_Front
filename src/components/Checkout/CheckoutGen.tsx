import SVG from 'react-inlinesvg';

const ComponentGenerateQR = () => {
    const generatePayload = require('promptpay-qr') 
    const qrcode = require('qrcode') 
 
    const mobileNumber = '064-556-3422' 
    const IDCardNumber = '0-0000-00000-00-0'
    const amount = 0
    const payload = generatePayload(mobileNumber, { amount }) //First parameter : mobileNumber || IDCardNumber
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
        // <SVG className='w-48 h-48' src= {getSVG}/>
        <SVG src= {getSVG}/>
    )
}

export default ComponentGenerateQR
