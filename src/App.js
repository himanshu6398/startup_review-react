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
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/home" component={Home} />

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
