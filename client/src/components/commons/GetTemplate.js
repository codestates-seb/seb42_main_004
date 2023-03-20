import Loading from './Loading';
import Error from '../../pages/Error';

function GetTemplate({ isPending, error, res, children }) {
  return (
    <>
      {isPending && <Loading />}
      {error && <Error />}
      {res && children}
    </>
  );
}

export default GetTemplate;
