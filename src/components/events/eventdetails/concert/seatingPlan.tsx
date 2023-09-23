import React, { useState } from 'react';
import Seat from './seat';

interface SeatingPlanProps {
  numRows: number;
  numSeatsPerRow: number;
}

const SeatingPlan: React.FC<SeatingPlanProps> = ({ numRows, numSeatsPerRow }) => {
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);

  const handleSeatSelect = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const renderSeats = () => {
    const seats = [];

    for (let row = 1; row <= numRows; row++) {
      const rowSeats = [];

      for (let seatNumber = 1; seatNumber <= numSeatsPerRow; seatNumber++) {
        const seatId = row * 100 + seatNumber; // Generate a unique ID for each seat
        const isSelected = selectedSeats.includes(seatId);

        rowSeats.push(
          <Seat
            key={seatId}
            seatNumber={seatId}
            isSelected={isSelected}
            onSelect={handleSeatSelect}
          />
        );
      }

      seats.push(
        <div key={row} className="flex space-x-4">
          {rowSeats}
        </div>
      );
    }

    return seats;
  };

  return <div className="space-y-4">{renderSeats()}</div>;
};

export default SeatingPlan;