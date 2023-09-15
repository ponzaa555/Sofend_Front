import axios from 'axios';

const BASE_URL = 'https://eventbud-jujiu2awda-uc.a.run.app/'; 

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