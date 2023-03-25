import deleteData from './deleteData';

function deleteSubject(key, name, id, reload) {
  if (
    window.confirm(
      `${name}을(를) 삭제하시겠습니까?\n삭제되면 복구할 수 없습니다.`
    )
  ) {
    deleteData(`/admin/${key}/${id}`).then((res) => {
      if (res.status === 200) {
        alert(`${name}이(가) 삭제되었습니다.`);
        reload();
      } else {
        alert('삭제 실패.\n관리자에게 문의해주세요.');
      }
    });
  }
}

export default deleteSubject;
