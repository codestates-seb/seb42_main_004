import { TextButton } from './ModalDiv';

function NoResult({ search, errorWord, replaceWord }) {
  return (
    <div>
      찾고 계신 <span>{errorWord}</span>은(는) 목록에 추가될 예정입니다
      <br />
      {errorWord} 대신
      <TextButton className="linkstyle" onClick={() => search(replaceWord)}>
        {replaceWord}
      </TextButton>
      는 어떠세요?
    </div>
  );
}

export default NoResult;
