import Nav from 'react-bootstrap/Nav';
import { SiYourtraveldottv } from "react-icons/si";
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function MyNavBar() {
  return (
    <>
      <Nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow sticky-top'>
        <div className='container-fluid'>
          <Link to='/'>
            <span className='hotel-color' id='safarnamalogo'>Rentpe <SiYourtraveldottv /></span>
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarScroll'
            aria-controls='navbarScroll'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarScroll'>
            <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
              <li className='nav-item'>
                <Link className='nav-link active' aria-current='page' to='/plans'>
                  Plans
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/top-plans'>
                  Popular Plans
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/admin'>
                  Admin
                </Link>
              </li>
            </ul>
            {/* right side nav elements */}
            <ul className='d-flex navbar-nav'>
              
                  <NavDropdown
                title="Hotel Login"
              >
                <NavDropdown.Item as={Link} to={'/hotel/login'}>Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/hotel/Profile'}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={'/hotel/logout'}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
         
              
              <NavDropdown
                title="User"
              >
                <NavDropdown.Item as={Link} to={'/user/login'}>Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/user/profile'}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/user/upcomming'}>
                  Upcomming Plan
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={'/user/history'}>
                  History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to={'/user/logout'}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </ul>
          </div>
        </div>
      </Nav>
    </>
  );
}

export default MyNavBar;