import SurveyPage0 from './SurveyPage0';
import SurveyPage1 from './SurveyPage1';
import SurveyPage2 from './SurveyPage2';
import SurveyPage3 from './SurveyPage3';

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
