import SurveyPage1 from './SurveyPage1';
import SurveyPage2 from './SurveyPage2';
import SurveyPage3 from './SurveyPage3';
import { useSelector } from 'react-redux';
function SurveyArticle({ page }) {
  let { name } = useSelector((state) => state.authReducer.user);
  switch (page) {
    case 1:
      return <SurveyPage1 />;
    case 2:
      return <SurveyPage2 name={name} />;
    case 3:
      return <SurveyPage3 />;
  }
}

export default SurveyArticle;
