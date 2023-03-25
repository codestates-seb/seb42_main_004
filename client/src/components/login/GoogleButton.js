import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import styled from 'styled-components';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

function GoogleButton() {
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
      );
      navigate('/signup/oauth', {
        state: {
          oauthName: userInfo.data.given_name,
          oauthEmail: userInfo.data.email,
        },
      });
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Button onClick={() => googleLogin()} className="buttonstyle shadow">
      <FcGoogle size={25} />
      <div>Sign in with Google</div>
    </Button>
  );
}

export default GoogleButton;

const Button = styled.button`
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: var(--white);

  > div {
    margin-left: 0.5rem;
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-size: 1.2rem;
    color: var(--signature);
  }
`;
