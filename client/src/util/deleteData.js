import axios from 'axios';

async function deleteData(url) {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}${url}`,
      {
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error.response;
  }
}

export default deleteData;
