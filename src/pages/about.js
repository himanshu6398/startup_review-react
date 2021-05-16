import React, {Component} from 'react';
import {Card, CardBody,CardImg, CardTitle, CardText, Button} from "reactstrap";
import logo from "../assets/logo/Startup Review.png";

export default class About extends Component {

    submitHandler = (event) => {
        this.props.history.push('/add_startup');
    }

    render() {
        return (
            <form onSubmit={this.submitHandler}>
            <Card className="text-center">
                <CardBody>
                    <CardTitle><h3>About Us</h3></CardTitle>
                    <CardText>Startup Review is a platform that lets users search through the pool of various startup ideas
                        that have been done before, to let them know if any new idea for a startup that they have come up
                        with already exists or not. It also allows users to add their own startup idea in the pool and
                        other people looking up for it can give their opinions, reviews and discuss about the possible
                        success or failure of the idea if implemented.</CardText>
                </CardBody>
            </Card>
                <div className="text-center" style={{ bottom:0}}>
                    <img className="logo" src={logo}/>
                </div>
            {/*{localStorage.getItem("role") === "ROLE_ADMIN" ?*/}
            {/*    <Button variant='primary' type='submit' className='text-lg-right'>Add Startup</Button>*/}
            {/*    : null*/}
            {/*}*/}
        </form>
    )
    }
};
