import React, {useState,useEffect} from 'react';
import {NavLink as Link} from "react-router-dom";
import styled from 'styled-components';
import AuthService from "../services/auth.service";
export const NavLink = styled(Link)`
  // align-items: center;
   padding-right: 30px;
  // height: 100%;
  cursor: pointer;
  &.active {
    color: #FFFFFF;
  }
`;

const NavBar = (props) => {
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect( ()=>{
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }

    },[]);

    const logOut = () => {
        AuthService.logout();
        // return <Redirect to='/login' />
    };

    return (
        <div>

                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        Startup Review
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/about"} className="nav-link">
                                About
                            </Link>
                        </li>
                    </div>




                    {/*<NavLink to='/sign_up'>Sign Up</NavLink>*/}
                    {/*<NavLink to='/sign_in'>Sign In</NavLink>*/}
                    {/*{localStorage.getItem("role") === "ROLE_ADMIN" ?*/}
                    {/*    <NavLink to='/add_startup'>Add Startup</NavLink> : null*/}
                    {/*}*/}

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/" className="nav-link" onClick={logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={{pathname:"/login",state:window.location.pathname}} className="nav-link" >
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>


        </div>
    );
};

export default NavBar;