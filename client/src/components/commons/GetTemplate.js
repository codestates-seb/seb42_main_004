import Loading from './Loading';
import Error from '../../pages/Error';

function GetTemplate({ isPending, error, res, children }) {
  return <>{res ? children : error ? <Error /> : isPending && <Loading />}</>;
}

export default GetTemplate;
