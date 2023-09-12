export interface EventitemProps {
    name : string,
    place : string,
    date : string,
    image: string,
}

export interface TicketClass {
    className: string,
    AmountOfSeats: number,
    pricePerSeat: number,
    listCount: object,
    setlistCount:any
}

export interface Modal {
    organizerName : string 
}