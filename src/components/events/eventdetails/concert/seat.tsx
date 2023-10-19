import React, { useState } from 'react';
import { MdChair } from 'react-icons/md'; // Import an icon from your chosen icon library
import { BsPersonFill } from 'react-icons/bs'
import { HiCheckCircle } from 'react-icons/hi'



interface SeatProps {
  seatId: string;
  seatNumber: number;
  isSelected: boolean;
  isReserved: string;
  onSelect: (seatNumber: number) => void;
}

const Seat: React.FC<SeatProps> = ({ seatId , seatNumber, isSelected, onSelect, isReserved}) => {
  const handleClick = () => {
    if (isReserved === 'vacant')
      onSelect(seatNumber);
  };

  const checkIfReserved = () => {
    if (isSelected) {
      return(
        <HiCheckCircle size={40} className='text-green-500'/> 
      )
    }
    else if (isReserved === 'vacant') {
      return(
        <MdChair size={40} className={`text-black`}/> 
      )
    }
    else{
      return(
        <BsPersonFill size={40} className='text-red-600'/> 
      )
    }
  }
  return (
    <div >
      <div
        className={`flex justify-center items-center cursor-pointer`}
        onClick={handleClick}
      >
        {checkIfReserved()} {/* Display the seat icon */}
      </div>
      <p className='text-center font-montserrat font-medium'>{seatId}</p>
    </div>
  );
};

export default Seat;