import React from 'react';
import {Nav, Navbar} from "reactstrap";
import {NavLink as Link} from "react-router-dom";
import styled from 'styled-components';

export const NavLink = styled(Link)`
  // align-items: center;
   padding-right: 30px;
  // height: 100%;
  cursor: pointer;
  &.active {
    color: #FFFFFF;
  }
`;

const NavBar = () => {
    return (
        <div className="text-center">
            <Navbar color="dark">
                <Nav>
                    <NavLink to='/about'>About</NavLink>
                    <NavLink to='/sign_up'>Sign Up</NavLink>
                    <NavLink to='/sign_in'>Sign In</NavLink>
                    {/*{localStorage.getItem("role") === "ROLE_ADMIN" ?*/}
                    {/*    <NavLink to='/add_startup'>Add Startup</NavLink> : null*/}
                    {/*}*/}
                </Nav>
            </Navbar>

        </div>
    );
};

export default NavBar;