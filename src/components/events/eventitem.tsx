export interface EventitemProps {
    name : string,
    place : string,
    datestart : string,
    dateend : string,
    image: string,
}

export interface TicketClass {
    className: string,
    AmountOfSeat: number,
    pricePerSeat: number,
    seatNo: number[],
}

export interface Modal {
    organizerName : string 
}