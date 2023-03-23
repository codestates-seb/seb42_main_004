import axios from 'axios';

async function postData(url, data, multipart) {
  try {
    const response = await axios.post(
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
    return response;
  } catch (error) {
    return error.response;
  }
}

export default postData;
