import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavBar from "./components/NavBar";
import About from "./pages/about";
import Sign_in from "./pages/sign_in.js";
import Sign_up from "./pages/sign_up.js";
import {Col, Container, Row} from "react-bootstrap";
import React from "react";
import Add_startup from "./pages/add_startup";

console.log(localStorage.getItem("role"));

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
