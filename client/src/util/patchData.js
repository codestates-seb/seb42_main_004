import axios from 'axios';

async function patchData(url, data, multipart) {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_API_URL}${url}`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': `${
            multipart ? 'multipart/form-data' : 'application/json'
          }`,
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
