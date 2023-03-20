import axios from 'axios';

async function patchData(url, data) {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}${url}`,
      JSON.stringify(data),
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

export default patchData;
