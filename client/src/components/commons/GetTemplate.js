import Loading from './Loading';
import Error from '../../pages/Error';
import HelmetTitle from './HelmetTitle';

function GetTemplate({ isPending, error, res, children, title }) {
  return (
    <>
      {title && <HelmetTitle title={title} />}
      {res ? children : error ? <Error /> : isPending && <Loading />}
    </>
  );
}

export default GetTemplate;
