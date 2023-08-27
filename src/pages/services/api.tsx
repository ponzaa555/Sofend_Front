import axios from "axios";

type EventDetail = {
    Eventid: string;
    EventName : string;
    StartDateTime : string;
    EndDateTime : string;
    OnSaleDateTime : string; 
    EndSaleDateTime : string;
    Location : string;
    Info : string;
    Featured : boolean;
    EventStatus : string;
    TagName : string;
    PosterImage : string;
    SeatImage : string;
    OrganizerName : string;
    Staff : string;
    Ticket : string;
    TicketType : string;
    TicketClass : string;
}

export async function getEventDetail(id: string) {
    const response = await axios.get(`https://eventbriteproject.herokuapp.com/api/events/${id}`);
    return response.data;
}