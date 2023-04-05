import Loading from './Loading';
import Error from '../../pages/Error';
import HelmetTitle from './HelmetTitle';

function GetTemplate({ isPending, error, res, children, title }) {
  return (
    <>
      {title && <HelmetTitle title={title} />}
      {isPending ? <Loading /> : error ? <Error /> : res ? children : <Error />}
    </>
  );
}

export default GetTemplate;
