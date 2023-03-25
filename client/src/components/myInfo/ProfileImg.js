import styled from 'styled-components';
import profile from '../../assets/profile.png';

function ProfileImg({ img }) {
  return <Img img={img} />;
}

export default ProfileImg;

const Img = styled.img`
  width: 300px;
  height: 300px;
  background-image: url(${(props) => (props.img ? props.img : profile)});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  @media (max-width: 480px) {
    width: 35vw;
    height: 35vw;
  }
`;
