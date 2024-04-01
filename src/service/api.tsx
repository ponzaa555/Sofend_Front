import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'; 

// get all events
export const getAllEvent = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/event`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; 
  }
};

//get event by id
export async function getEventDetail(id: string) {
  try {
    const response = await axios.get(`${BASE_URL}/event/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; 
  }
};

//get eventstaff by userid
export async function getEventSchedule(userid: string) {
  try {
    const response = await axios.get(`${BASE_URL}/staff_event/${userid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; 
  }
};

export async function getTicket(userid: string) {
  try {
    const response = await axios.get(`${BASE_URL}/user_ticket/${userid}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error; 
  }
}

export async function postTicket(srcUserID :string,ticketID : string, dstUserEmail : string) {
  try {
    const response = await axios.post(`${BASE_URL}/transfer_ticket/${srcUserID}/${ticketID}/${dstUserEmail}`);
    // if(!response.data.success) {
    //   console.log(response.data.detail);
    // }
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}