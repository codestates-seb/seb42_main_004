import { useLocation } from 'react-router-dom';

function checkFooter() {
  let { pathname } = useLocation();

  return (
    pathname.includes('custom') ||
    pathname.includes('cart') ||
    pathname.includes('payment')
  );
}

export default checkFooter;
