import React,{ useState } from 'react'

const selectzonenseat = () => {
  let [quantity, setQuantity] = useState(1)
  const [isdisabled, setDisabled] = useState(false)


  function increment() {
    setQuantity(quantity + 1)
    setDisabled(false)
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }
  }

  return (
    <div>
      <div className='flex flex-row justify-evenly'>
        <h1 className='font-montserrat font-bold text-2xl'>Quantities</h1>
        <div className='flex flex-row'>
          <button className={`bg-black text-white border-2 border-black px-2.5 rounded-md py-3 disabled:bg-gray-400 disabled:border-gray-400`} disabled={isdisabled} onClick={decrement}>
            <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="1" x2="10" y2="1" stroke="#FFFFFF" stroke-width="2" className="icon" />
            </svg>
          </button>
          <p className='mx-10 text-center pt-1 font-montserrat font-bold text-xl'>{quantity}</p>
          <button className={`bg-black text-white border-2 border-black px-2.5 rounded-md`} onClick={increment}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon">
              <line x1="5" y1="4.37114e-08" x2="5" y2="10" stroke="#FFF" stroke-width="2" />
              <line y1="5" x2="10" y2="5" stroke="#FFF" stroke-width="2" />
            </svg>
          </button>
        </div>
        <h1 className='font-montserrat text-2xl '>tickets</h1>
      </div>
      <div>
        <h1>Zone</h1>
      </div>
    </div>
  )
}

export default selectzonenseat