import SurveyPage0 from './surveyPage0';
import SurveyPage1 from './surveyPage1';
import SurveyPage2 from './surveyPage2';
import SurveyPage3 from './surveyPage3';

function SurveyArticle({ page }) {
  switch (page) {
    case '0':
      return <SurveyPage0 />;
    case '1':
      return <SurveyPage1 />;
    case '2':
      return <SurveyPage2 />;
    case '3':
      return <SurveyPage3 />;
  }
}

export default SurveyArticle;
