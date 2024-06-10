import { Nav, Navbar } from 'react-bootstrap';
import { ROUTE } from '../../../utils/constants';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100">
      <Nav className="d-flex flex-row align-items-center w-100 px-3 gap-2">
        <Link
          to={ROUTE.INDEX}
          className={`text-uppercase fw-semibold flex-shrink-0 text-decoration-none text-dark ${
            location.pathname === ROUTE.INDEX ? 'text-decoration-underline' : ''
          }`}
        >
          Posts
        </Link>
        <Link
          to={ROUTE.COMMENTS}
          className={`text-uppercase fw-semibold flex-shrink-0 text-decoration-none text-dark ${
            location.pathname === ROUTE.COMMENTS
              ? 'text-decoration-underline'
              : ''
          }`}
        >
          Comments
        </Link>
      </Nav>
    </Navbar>
  );
};
