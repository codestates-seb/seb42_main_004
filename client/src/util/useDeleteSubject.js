import { useLocation, useNavigate } from 'react-router-dom';
import deleteData from './deleteData';

function useDeleteSubject(key) {
  const { search } = useLocation();
  const navigate = useNavigate();

  const aux = (name, id, reload) => {
    if (
      window.confirm(
        `${name}을(를) 삭제하시겠습니까?\n삭제되면 복구할 수 없습니다.`
      )
    ) {
      deleteData(`/admin/${key}/${id}`).then((res) => {
        if (res.status === 200) {
          alert(`${name}이(가) 삭제되었습니다.`);

          if (search.includes('?page=1&sort=')) reload();
          else navigate(`/${key}`);
        } else {
          alert('삭제 실패.\n관리자에게 문의해주세요.');
        }
      });
    }
  };

  return aux;
}

export default useDeleteSubject;
