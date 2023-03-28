import profile from '../../assets/profile.png';

function ProfileImg({ img }) {
  return <img src={img || profile} alt="profile" />;
}

export default ProfileImg;
