import axios from 'axios';

async function getData(url) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export default getData;
