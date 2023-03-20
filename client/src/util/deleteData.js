import axios from 'axios';

async function deleteData(url) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}${url}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
}

export default deleteData;
