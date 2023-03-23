import axios from 'axios';

function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthorizationToken;
