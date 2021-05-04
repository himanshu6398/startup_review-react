import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavBar from "./components/NavBar";
import About from "./pages/about";
import Sign_in from "./pages/sign_in.js";
import Sign_up from "./pages/sign_up.js";
import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import Add_startup from "./pages/add_startup";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import StartupDetails from "./components/startup/StartupDetails";
import UpdateStartup from "./components/startup/UpdateStartup";
import ReviewDetails from "./components/review/ReviewDetails";

import 'semantic-ui-css/semantic.min.css'


function App() {

  return (
      <div>
        <Router>
          <NavBar />
          <Container>
            <Row>
              <Col lg={12} className="margin-top">

                <Switch>
                  <Route path='/about' component={About} />
                  <Route path='/sign_in' component={Sign_in} />
                  <Route path='/sign_up' component={Sign_up} />
                  <Route path='/add_startup' component={Add_startup}/>

                  <Route path='/add_startup' component={Add_startup}/>

                  <Route path='/login' component={Login}/>
                  <Route path='/register' component={Register}/>
                  <Route path="/profile" component={Profile} />
                  <Route path="/startups/:id" component={StartupDetails} />
                  <Route path="/review/:id" component={ReviewDetails} />

                  <Route exact path="/" component={Home} />
                  <Route path ="/updateStartup" component={UpdateStartup} />

                  {/*<Route path={"/profile/add-startup"} component={AddStartup} exact/>*/}

                  {/*{localStorage.getItem("role") === "ROLE_ADMIN" ?*/}
                  {/*    <Route path='/add_startup' component={Sign_up}/> : null*/}
                  {/*}*/}
                </Switch>
              </Col>
            </Row>
          </Container>
        </Router>
      </div>
  );
}

export default App;
