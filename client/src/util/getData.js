import axios from 'axios';

async function getData(url) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export default getData;
