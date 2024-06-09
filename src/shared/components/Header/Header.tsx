import { Container, Nav, Navbar } from 'react-bootstrap';
import { ROUTE } from '../../../utils/constants';

export const Header = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary w-100">
      <Nav className="d-flex flex-row align-items-center w-100 px-3">
        <Nav.Link href={ROUTE.INDEX} className="flex-shrink-0 me-3">
          <img
            src={require('../../assets/logo.jpg')}
            width="30"
            height="30"
            className="flex-shrink-0"
            alt="Bridge IN logo"
          />
        </Nav.Link>
        <Nav.Link
          href={ROUTE.POSTS}
          className="text-uppercase fw-semibold flex-shrink-0"
        >
          Posts
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
