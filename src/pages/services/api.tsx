import axios from 'axios';

type eventdetails = {
    EventID : string,
    EventName : string,
    StartDateTime : string,
    EndDateTime : string,
    OnSaleDateTime : string,
    EndSaleDateTime : string,
    Location : string,
    Info : string,
    Featured : boolean,
    Eventstatus : string,
    tagName : string,
    PosterImage : string,
}