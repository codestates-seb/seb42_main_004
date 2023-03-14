import { useParams } from 'react-router-dom';
import SurveyPage0 from '../components/survey/surveyPage0';
function Survey() {
  let { page } = useParams();
  console.log(page);
  switch (page) {
    case '1':
      return <SurveyPage0 />;
  }
}

export default Survey;
