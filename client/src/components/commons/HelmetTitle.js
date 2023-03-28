import { Helmet } from 'react-helmet-async';

function HelmetTitle({ title }) {
  return (
    <Helmet>
      <title>
        🥄{title}🥢 한끼밀 | 당신의 소중한 시간과 건강을 위한 밀박스
      </title>
    </Helmet>
  );
}

export default HelmetTitle;
