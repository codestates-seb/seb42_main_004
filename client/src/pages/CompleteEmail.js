import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ConfirmEmailDiv from '../components/signup/ConfirmEmailDiv';

function CompleteEmail() {
  const navigate = useNavigate();

  const timeout = () => {
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  useEffect(() => {
    timeout();
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ContainerDiv className="margininside">
      <ConfirmEmailDiv pathName="complete" />
    </ContainerDiv>
  );
}

export default CompleteEmail;

const ContainerDiv = styled.div`
  min-height: 100vh;
  justify-content: center;
`;
