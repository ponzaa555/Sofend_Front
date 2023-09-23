import React, { useState } from 'react';
import { MdChair } from 'react-icons/md'; // Import an icon from your chosen icon library


interface SeatProps {
  seatNumber: number;
  isSelected: boolean;
  onSelect: (seatNumber: number) => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect(seatNumber);
  };

  return (
    <div
      className={`flex justify-center items-center cursor-pointer text-black ${isSelected ? 'text-blue-500' : ''}`}
      onClick={handleClick}
    >
      <MdChair size={40} /> {/* Display the seat icon */}
    </div>
  );
};

export default Seat;