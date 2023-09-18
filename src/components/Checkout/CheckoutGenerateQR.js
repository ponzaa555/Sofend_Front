const generatePayload = require('promptpay-qr') 
const qrcode = require('qrcode') 

const mobileNumber = '064-556-3422' 
const IDCardNumber = '0-0000-00000-00-0'
const amount = 0
const payload = generatePayload(mobileNumber, { amount }) //First parameter : mobileNumber || IDCardNumber
console.log(payload)

const options = { type: 'img', color: { dark: '#000', light: '#fff' } }
// Convert to SVG QR Code
qrcode.toString(payload, options, (err, img) => {
    if (err) return console.log(err)
    // fs.writeFileSync('./qr.svg', svg)
    console.log(img)
    img
})