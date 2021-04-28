import React, {useEffect, useState} from "react";
import AuthService from "../services/auth.service";
import {Button, Row,Col, Container} from "reactstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Redirect } from 'react-router';
import AdminLeftSideMenu from "./admin/AdminLeftSideMenu";
import UserLeftSideMenu from "./UserLeftSideMenu";
import UserDetails from "./UserDetails";
import AddStartup from "./startup/AddStartup";
import ShowStartups from "./startup/ShowStartups";
import UpdateStartup from "./startup/UpdateStartup";
import DeleteStartup from "./startup/DeleteStartup";

const Profile = (props) => {
    const currentUser = AuthService.getCurrentUser();

    return (
        <div className="container">
        { currentUser ? (
        <div>
            <Router>

                <Container>
                    <Router>
                    <Row>
                        <Col md={4}>
                            {currentUser.roles.includes("ROLE_ADMIN") ? (
                                <AdminLeftSideMenu />
                            ) : (
                                <UserLeftSideMenu />
                            )}
                        </Col>
                        <Col md={8}>
                            <Switch>
                            <Route path="/" component={Profile} exact />
                            <Route path={"/profile/user-details"} component={UserDetails} />
                            <Route path={"/profile/add-startup"} component={AddStartup} />
                            <Route path="/profile/showStartups" component={ShowStartups} />
                            <Route path={"/profile/updateStartup"} component={UpdateStartup} />
                            <Route path={"/profile/deleteStartup"} component={DeleteStartup} />
                            </Switch>
                        </Col>
                    </Row>
                    </Router>
                </Container>
            </Router>
        </div>
            ) : (
                <Redirect to='/login'  />
                    )}
        </div>
    );
};

export default Profile;